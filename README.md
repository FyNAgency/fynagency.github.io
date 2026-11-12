# F&N Agency

Sitio web de F&N Agency, agencia de redes sociales en Cali. Publicado en https://fynagency.co.

Hecho con [Astro](https://astro.build), con animaciones de GSAP y scroll suave de Lenis.

## Comandos

| Comando           | Qué hace                                      |
| ----------------- | --------------------------------------------- |
| `npm install`     | Instala las dependencias                      |
| `npm run dev`     | Abre el sitio en `http://localhost:4321`      |
| `npm run build`   | Genera el sitio final en `dist/`              |
| `npm run preview` | Muestra localmente lo que quedó en `dist/`    |

## Páginas

| Ruta          | Contenido                                                                    |
| ------------- | ---------------------------------------------------------------------------- |
| `/`           | Inicio: cifras, servicios, clientes, reels, perfiles, testimonios, paquetes y formulario |
| `/servicios`  | Slider de servicios, paquetes, proceso, video con Fabio Parra y condiciones de pago |
| `/portafolio` | Casos de éxito y capturas de perfiles                                        |
| `/contacto`   | Canales de contacto y formulario                                             |
| `/privacidad` | Política de datos                                                            |

La antigua `/propuesta` redirige a `/servicios`.

## Dónde cambiar cada cosa

- **Servicios, casos, cifras, testimonios, paquetes, precios, condiciones, WhatsApp y menú:** `src/data/agencia.ts`
- **Enlace a las reseñas de Google:** `googleResenas` y el `enlace` de cada testimonio en `src/data/agencia.ts`. Mientras estén vacíos, el botón no abre nada.
- **Slider de la página Servicios:** `src/components/home/ServicesHero.astro`, con sus imágenes en `src/assets/servicios/`
- **Secciones:** `src/components/home/`
- **Páginas:** `src/pages/`
- **Formulario de contacto:** `src/components/ContactForm.astro` (usa Netlify Forms)
- **Animaciones al hacer scroll:** `src/scripts/home-motion.ts`
- **Título, descripción, vista previa al compartir y Google Tag Manager:** `src/layouts/Layout.astro` y cada página
- **Colores y estilos generales:** `src/styles/home.css`
- **Imágenes:** `src/assets/` (Astro las optimiza)
- **Favicon, íconos e imagen al compartir:** `public/`

No publicar el valor por video de los paquetes.

## Publicación

Cada `git push` a `main` publica el sitio:

- **Netlify** (fynagency.co) compila con `npm run build` según `netlify.toml`.
- **GitHub Pages** (fynagency.github.io) compila con `.github/workflows/deploy.yml`.

El dominio está en Namecheap: el registro A de `@` y el CNAME de `www` apuntan a Netlify.

## Correo info@fynagency.co

Configuración en curso:

- [x] Reenvío de `info@` al Gmail de la agencia desde Namecheap (Redirect Email)
- [x] Filtro de Gmail con la etiqueta `info-fyn`
- [ ] Autenticar el dominio en Brevo (brevo-code, DKIM y DMARC)
- [ ] Responder como `info@` desde Gmail con el SMTP de Brevo (Enviar como)
- [ ] Aviso por WhatsApp con Google Apps Script y CallMeBot

En Namecheap, **Mail Settings debe seguir en Email Forwarding**. Cambiarlo a Custom MX apaga el reenvío.
