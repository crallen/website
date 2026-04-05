---
title: "Hello, World: Why I'm Starting a Blog"
description: "After years of building software and keeping thoughts to myself, I'm finally putting words on the internet. Here's why."
pubDate: 2026-04-04
tags: ["meta", "writing"]
draft: false
---

I've been building software for over 20 years. In that time I've accumulated a lot of opinions—about system design, about how teams work, about which tradeoffs are worth making and which ones come back to haunt you at 2am. Most of those opinions have lived in Slack threads, code review comments, and architecture docs that very few people outside my current employer ever see.

That changes now.

## Why a blog, and why now?

The honest answer: I've been meaning to do this for years. The barrier wasn't inspiration—I have no shortage of things I want to write about. The barrier was the familiar perfectionist trap: if I can't write something comprehensive and definitive, why write anything at all?

The flaw in that thinking is obvious in retrospect. Some of the most useful things I've read on the internet are half-finished thoughts, working notes, and honest accounts of "here's what I tried and here's what happened." Polished, comprehensive takes are fine, but they have a tendency to smooth over the interesting parts.

So this will be a blog in the old-fashioned sense. Imperfect. Ongoing. Written for an audience of one (me, six months from now) and anyone else who finds it useful.

## What I plan to write about

A few areas I'm planning to explore:

- **System design in practice** — Not textbook architecture diagrams, but the real decisions: when to split a service, when to keep the monolith, how to handle failure modes you didn't anticipate
- **Backend engineering** — Go is my primary language these days, with plenty of Java and TypeScript mixed in. I have thoughts about all of them.
- **Platform engineering and DevOps** — CI/CD, infrastructure as code, the gap between "we have Kubernetes" and "we have a well-run platform"
- **Embedded and IoT** — I've been doing more of this than most backend engineers, and Rust is starting to earn its reputation in this space
- **The soft stuff** — How engineering teams actually function, technical debt as a management problem, writing code that other people can read

## A note on frequency

I'm not going to commit to a posting schedule. I've seen enough blogs die from unrealistic commitments to know better. I'll write when I have something worth saying.

If you want to follow along, there's an [RSS feed](/rss.xml) — the right way to read the internet.

```go
// The obligatory hello world
package main

import "fmt"

func main() {
    fmt.Println("Hello, World")
}
```

Talk soon.
