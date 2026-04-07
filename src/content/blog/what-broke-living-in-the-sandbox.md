---
title: "What Broke When I Started Living in the Sandbox"
description: "The permission nightmares, SSH surprises, and filesystem performance problems I hit when I started using opencode-sandbox on real work across multiple machines."
pubDate: 2026-04-07
tags: ["ai", "coding-agents", "docker", "opencode", "developer-tools", "open-source"]
draft: false
---

A few days ago I published a post about [opencode-sandbox](https://github.com/crallen/opencode-sandbox), a Dockerized AI coding environment I built around file system isolation and a team of specialized agents. The design was clean, the README was comprehensive, and I was happy with it.
 
Then I started using it on a second machine and everything fell apart.
 
This post is about what I learned the hard way: the permission nightmares, the SSH surprises, the slow creep of toolchain requirements, and the filesystem performance problem that almost made me rethink the whole approach.
 
## Docker Doesn't Know Who You Are
 
The first version of the sandbox matched the container user's UID and GID to the host at build time. This worked fine on my Windows machine, where I do development through an Arch-based WSL environment. It has the RAM and GPUs to make AI exploration practical, so that's where the project was born.
 
Then I tried it on my MacBook, which is actually my main dev machine, and hit a wall. On macOS, your user belongs to the `staff` group, which has a low GID. That GID was already taken inside the container. The result was permission errors on mounted volumes, files created with the wrong ownership, and a generally broken experience.
 
The fix wasn't simple. I ended up rewriting the entrypoint to start as root, detect the host user's UID and GID at runtime, remap the container user to match, fix ownership on writable paths, and then drop privileges using gosu. So I threw out the build-time UID/GID arguments and switched to runtime remapping.
 
That solved the immediate problem, but it created a new one. The recursive `chown` that fixed ownership on every startup got slower as session data and caches grew. A container that started instantly on day one was taking noticeably longer by day three. I added a sentinel file that tracks the current UID:GID pair so the `chown` only runs once per user mapping, not on every restart.
 
Then I discovered that sharing a single data volume across workspaces caused SQLite write contention when I had multiple containers running at the same time. Sessions from different projects were bleeding into each other. The fix was to scope the data volume per workspace, so each project gets its own isolated session data.
 
And then git refused to work because `/workspace` is a bind-mount owned by the host user, and git's ownership safety check fails when the directory owner doesn't match the running process. One more fix: register `/workspace` as a safe directory in the entrypoint.
 
Four commits, all different symptoms of the same root cause: Docker and mounted volumes don't naturally agree on who owns what. Each fix felt like the last one, and then something else would break.
 
## SSH Across the VM Boundary
 
The original design used SSH agent forwarding. Mount the agent socket into the container, and the agent can authenticate without ever seeing your private keys. Clean, secure, and correct.
 
It doesn't work on macOS.
 
Docker Desktop on Mac runs containers inside a Linux VM. The SSH agent socket lives on the macOS side, managed by the system keychain. When you bind-mount it into the container, the socket file shows up, but the agent process on the other side is unreachable. Every SSH connection fails with ECONNREFUSED.
 
I tried a few approaches before landing on the simplest thing that works: mount the key file directly. The launcher looks for `id_ed25519` first, falls back to `id_rsa`, and mounts it read-only at a known path inside the container. `GIT_SSH_COMMAND` is set to use that key and skip `~/.ssh/config` entirely, because macOS-specific directives like `UseKeychain` cause the Linux `ssh` binary inside the container to choke.
 
There was one more wrinkle. Cargo uses its own SSH implementation by default for fetching git dependencies, which doesn't respect `GIT_SSH_COMMAND`. Setting `CARGO_NET_GIT_FETCH_WITH_CLI=true` forces cargo to shell out to git for SSH operations, which picks up the key configuration correctly.
 
I also added a `-k` flag to the launcher so you can point it at a specific key file if the defaults don't match your setup.
 
The agent forwarding approach is still better in principle, and it still works on Linux and WSL. But for macOS, key mounting is the pragmatic answer. The README now documents both paths.
 
## Growing the Toolbox
 
The initial container was deliberately minimal: Debian bookworm-slim with git, curl, jq, ripgrep, and not much else. That was fine for working on shell scripts and agent definitions, but it breaks down the moment you need to actually build or run code.
 
Node.js came first, since I was working on my website. I installed nvm so users can switch versions at runtime, with the latest LTS as the default.
 
Then I added Rust, Go, and Python in a single commit. Each toolchain has its own install script under `build/scripts/`, which keeps the Dockerfile clean and means a version bump only invalidates that layer and the ones below it. Rust comes via rustup with the minimal profile. Go is a pinned version from the official tarball. Python is managed through uv, which also gives you uvx for running tools.
 
Clippy and rustfmt came in a follow-up commit after I realized the agents couldn't lint or format Rust code without them. The kind of thing that's obvious in retrospect.
 
Around the same time, I set up a GitHub Actions workflow to build multi-arch images (amd64 and arm64) and publish them to GHCR. The launcher now pulls the pre-built image by default instead of building locally. It uses a digest comparison for update checks so layers only download when the remote image has actually changed. And container names include the launcher PID so you can run multiple instances concurrently without conflicts.
 
That last point mattered more than I expected. Once you're working across multiple projects, being able to have two sandbox containers open at once goes from nice-to-have to essential.
 
## The Small Bugs That Block Everything
 
Somewhere between the big features and architecture decisions, there were a handful of bugs that were small in scope but completely blocked real usage.
 
The launcher script didn't resolve symlinks. The install instructions tell you to symlink the script into your PATH, but `SCRIPT_DIR` was computed from the symlink location, not the actual file. Nothing worked until I added `readlink -f`.
 
Container names had trailing dashes because `tr` replaces the trailing newline from `basename` with a dash. And when the workspace directory name matched the container prefix, you'd get `prefix-prefix`. Two sed expressions and a guard clause.
 
The image digest comparison for `--pull` used `docker buildx imagetools inspect` with a format string that silently falls back to pretty-printed output for multi-arch image indexes, so the digest never matched and the pull re-triggered every time.
 
The uv version check used `uv pip --version`, which isn't a valid command. It's just `uv --version`.
 
None of these are interesting on their own. But they add up, and they're why the gap between "it works in my environment" and "it works reliably" is filled with dozens of small, boring fixes.
 
## Rust Compile Times
 
Everything I've described so far has been a problem I found and fixed relatively quickly. This one took longer to figure out.
 
Rust compilation inside the container was roughly 10x slower than on the host. A build that takes a couple of minutes natively became a long wait in the sandbox. For small crates it was tolerable. For anything with a real dependency tree, it was painful enough to change how I worked.
 
Both of my environments run on virtualized Docker engines. Docker Desktop on macOS runs containers in a Linux VM, and Docker on WSL proxies to Docker for Windows, which works the same way. In neither case is Docker running natively on the host kernel. But the real culprit wasn't CPU or memory — it was the filesystem.
 
Docker Desktop's default file sharing mechanism is gRPC FUSE, and it's slow. Really slow for I/O-heavy workloads like Rust compilation, where the compiler is constantly reading and writing across the dependency tree during resolution, compilation, and linking. Every one of those operations was going through the FUSE layer on the mounted workspace, and it added up fast.
 
The fix ended up being two things working together.
 
First, switching Docker Desktop's file sharing to VirtioFS. This is a one-time setting change that benefits the entire workspace mount. It's not as fast as native I/O, but it's a big improvement over gRPC FUSE with zero configuration per project.
 
Second, I added volume presets to the launcher. The `-V` flag mounts named Docker volumes over the directories that generate the most I/O churn during builds, bypassing the workspace mount entirely for those paths. There are three presets:
 
- `node` mounts over `/workspace/node_modules`
- `rust` mounts over `/workspace/target` and shares the Cargo registry and git cache across workspaces
- `go` mounts a shared GOPATH
 
Workspace-scoped volumes like `node_modules` and `target` are isolated per project. Shared volumes like the Cargo registry and GOPATH are reused across workspaces so you don't re-download dependencies for every project.
 
I also added `--clean` to remove workspace-scoped volumes when you need a fresh start (force a clean `cargo build` or `npm install`) without touching the shared caches.
 
The difference was night and day. Rust builds went from borderline unusable to something I can actually work with. It's still not as fast as building natively, but the gap is small enough that it doesn't break my workflow anymore. I do still have a native Linux install on a Framework 13 that I haven't tested with yet, which should show how much overhead the virtualization layer still adds even with these fixes.
 
## Where It Stands
 
It's been four days since the initial commit and the project looks very different. The container went from minimal to polyglot. The launcher went from local-build-only to GHCR-first with concurrent instance support. The entrypoint got rewritten twice. SSH auth was redesigned for cross-platform compatibility. And I've fixed more small bugs than I'd like to admit.
 
The core idea hasn't changed. Hard boundaries, scoped permissions, and an environment you can actually trust with real work. That part is working.
 
The rough edges are in the infrastructure around it. Docker permissions, cross-platform SSH, filesystem performance, all the things that have nothing to do with AI and everything to do with making a containerized development environment actually work day to day. But they're solvable, and most of them are solved now.
 
I'm using it daily and still finding things to fix. That's probably a good sign.