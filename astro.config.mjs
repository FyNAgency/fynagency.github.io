import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fynagency.co',
  integrations: [sitemap({ filter: (page) => !page.includes('/propuesta') })],
  // The old proposal page was shared on WhatsApp; send those links to the packages.
  redirects: {
    '/propuesta': '/servicios',
  },
});
