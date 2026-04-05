// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { BLOG_ENABLED } from './src/config.ts';

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
      theme: 'github-dark-default',
      wrap: true,
    },
  },
});
