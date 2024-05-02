import { defineConfig } from 'astro/config';
import { shield } from '@kindspells/astro-shield';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import { resolve } from 'node:path';
import db from "@astrojs/db";

const rootDir = new URL('.', import.meta.url).pathname;
const sriHashesModule = resolve(rootDir, 'src', 'generated', 'sri.mjs');

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  site: '',
  integrations: [mdx(), svelte(), shield({
    sri: {
      hashesModule: sriHashesModule,
      enableMiddleware: true
    },
    securityHeaders: {
      contentSecurityPolicy: {
        cspDirectives: {
          'default-src': "'self'",
          'font-src': "'self'",
          'img-src': "'self'",
          'form-action': "'self'",
          'connect-src': "'self'",
          'frame-ancestors': "'none'"
        }
      }
    }
  }), db()],
  markdown: {
    shikiConfig: {
      theme: 'nord'
    },
    remarkPlugins: [],
    rehypePlugins: []
  }
});