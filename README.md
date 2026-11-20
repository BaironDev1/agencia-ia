# Sitio web de la agencia

Sitio oficial de la agencia de software e inteligencia artificial, hecho con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com). Es un sitio estático: se puede publicar en Vercel, Netlify, Cloudflare Pages o cualquier hosting de archivos.

## Comandos

| Comando        | Acción                                                         |
| :------------- | :------------------------------------------------------------- |
| `pnpm install` | Instala las dependencias                                       |
| `pnpm dev`     | Servidor local en `http://localhost:4321`                      |
| `pnpm build`   | Revisa tipos y genera el sitio en `./dist/`                    |
| `pnpm preview` | Sirve localmente el sitio ya generado                          |
| `pnpm images`  | Regenera `public/og.png` y `public/favicon.ico` con el nombre actual |

## Dónde editar

- **Textos, servicios, FAQ y datos de contacto:** `src/data/site.ts`. Los valores provisorios están marcados con `TODO`.
- **Dominio:** `site` en `astro.config.mjs` y `url` en `src/data/site.ts`.
- **Colores y tipografías:** tokens al inicio de `src/styles/global.css` y fuentes en `astro.config.mjs`.
- **Secciones de la página:** `src/components/sections/`.

## Formulario de contacto

Si `site.contact.formEndpoint` está vacío, el formulario abre el correo del visitante con el mensaje ya escrito. Para recibir los mensajes directamente, crea un formulario en un servicio como [Formspree](https://formspree.io) o [Web3Forms](https://web3forms.com) y pega su URL en `formEndpoint`. El campo oculto `_gotcha` sirve como trampa anti-spam.

## Estructura

```text
src/
├── components/
│   ├── sections/      Hero, Servicios, Casos de uso, Proceso, Por qué nosotros, FAQ, Contacto
│   ├── Header.astro   Navegación (menú popover en móvil)
│   ├── Footer.astro
│   ├── Icon.astro
│   └── Logo.astro
├── data/site.ts       Todo el contenido editable
├── layouts/Layout.astro  <head>, SEO, Open Graph y JSON-LD
├── pages/             index, 404 y robots.txt
└── styles/global.css  Tokens de diseño y estilos de componentes
```
