import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fynagency.co',
  // The old proposal page was shared on WhatsApp; send those links to the packages.
  redirects: {
    '/propuesta': '/servicios',
  },
});
