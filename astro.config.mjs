// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://magnifiedsmsf.com.au',
  output: 'static',
  adapter: cloudflare(),
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});
