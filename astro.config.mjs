// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { BLOG_ENABLED } from './src/config.ts';

/**
 * Rehype plugin: add shell prompt indicators to bash/sh/shell/zsh code blocks.
 *
 * After Shiki has rendered the code block to HTML (hast), this plugin:
 *  1. Finds all <pre data-language="bash|sh|shell|zsh"> elements
 *  2. For each `.line` span, wraps its children in a <span class="prompt-content">
 *     and adds `has-prompt` to the line's class list
 *
 * The `$` prompt is rendered purely via CSS `::before` on `.line.has-prompt`
 * so it is never selectable/copyable text.
 */
function rehypeShellPrompt() {
  const SHELL_LANGUAGES = new Set(['bash', 'sh', 'shell', 'zsh']);

  return function (tree) {
    // We need `visit` from unist-util-visit, but to avoid adding a new
    // dependency we walk the hast tree manually.
    function walk(node) {
      if (
        node.type === 'element' &&
        node.tagName === 'pre' &&
        SHELL_LANGUAGES.has(node.properties?.dataLanguage)
      ) {
        // Found a shell <pre>. Drill into <code> and find .line spans.
        processShellPre(node);
        return; // no need to recurse deeper
      }
      if (node.children) {
        node.children.forEach(walk);
      }
    }

    if (tree.children) {
      tree.children.forEach(walk);
    }
  };
}

/**
 * Process a single shell <pre> element's hast subtree.
 * Finds every <span class="line"> and wraps its children in
 * <span class="prompt-content">, adding "has-prompt" to the line's classes.
 */
function processShellPre(preNode) {
  function walkForLines(node) {
    // Shiki stores the line class as a raw string 'class' attribute (not the
    // parsed 'className' array) in the hast tree during this pipeline stage.
    const nodeClass = node.properties?.className ?? node.properties?.class ?? '';
    const classString = Array.isArray(nodeClass) ? nodeClass.join(' ') : String(nodeClass);
    const isLineSpan =
      node.type === 'element' &&
      node.tagName === 'span' &&
      classString.split(/\s+/).includes('line');

    if (isLineSpan) {
      // Add has-prompt to the class, preserving the original attribute form.
      if (Array.isArray(node.properties?.className)) {
        node.properties.className = [...node.properties.className, 'has-prompt'];
      } else if (typeof node.properties?.class === 'string') {
        node.properties.class = node.properties.class + ' has-prompt';
      } else {
        node.properties.class = 'line has-prompt';
      }

      // Wrap all current children in a new <span class="prompt-content">
      const promptContent = {
        type: 'element',
        tagName: 'span',
        properties: { class: 'prompt-content' },
        children: node.children,
      };
      node.children = [promptContent];
      return; // don't recurse into the wrapped children
    }
    if (node.children) {
      node.children.forEach(walkForLines);
    }
  }
  preNode.children.forEach(walkForLines);
}

// https://astro.build/config
export default defineConfig({
  site: 'https://chrisallen.dev',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        // Never index the contact success page
        if (page.includes('/contact-success')) return false;
        // Only index blog routes when the blog is enabled
        if (!BLOG_ENABLED && page.includes('/blog')) return false;
        return true;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'gruvbox-dark-soft',
      wrap: true,
    },
    rehypePlugins: [rehypeShellPrompt],
  },
});
