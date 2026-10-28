# Propuesta F&N Agency

Sitio de la propuesta comercial de F&N Agency, publicado en https://fynagency.co.

Hecho con [Astro](https://astro.build).

## Comandos

| Comando           | Qué hace                                      |
| ----------------- | --------------------------------------------- |
| `npm install`     | Instala las dependencias                      |
| `npm run dev`     | Abre el sitio en `http://localhost:4321`      |
| `npm run build`   | Genera el sitio final en `dist/`              |
| `npm run preview` | Muestra localmente lo que quedó en `dist/`    |

## Dónde cambiar cada cosa

- **Precios, paquetes, cifras, pasos, condiciones y WhatsApp:** `src/data/propuesta.ts`
- **Secciones de la página:** `src/components/`
- **Título, descripción y vista previa al compartir:** `src/pages/index.astro` y `src/layouts/Layout.astro`
- **Colores y tipografías:** `src/styles/global.css`
- **Imágenes de la página:** `src/assets/` (Astro las optimiza a WebP)
- **Favicon, íconos e imagen al compartir:** `public/`

## Publicación

Cada `git push` a `main` publica el sitio:

- **Netlify** (fynagency.co) compila con `npm run build` según `netlify.toml`.
- **GitHub Pages** (fynagency.github.io) compila con `.github/workflows/deploy.yml`.
