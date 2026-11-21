# amply-contacto

Recibe el formulario de contacto de amply.cl y lo envía por correo.

```
Formulario (amply.cl) → /api/contacto (Pages Function) → service binding CONTACTO → este Worker → correo
```

- **Antispam:** Cloudflare Turnstile (verificación en el servidor, con `action` y dominio), campo trampa `_gotcha` y control de origen.
- **Correo:** binding `send_email` de Cloudflare Email Service. Envía desde `formulario@avisos.amply.cl` al correo de destino verificado en Email Routing. Enviar a una dirección verificada es gratis en cualquier plan. "Responder" contesta directo al visitante.
- **Por qué `avisos.amply.cl`:** el correo de `amply.cl` vive en Google Workspace (MX de Google), así que el formulario envía desde un subdominio que tiene su propio Email Routing en Cloudflare. No borres las MX/SPF de `avisos.amply.cl`.
- **Sin URL pública:** `workers.dev` y las URLs de vista previa están desactivadas. Solo se llega por la Pages Function.
- **Orígenes aceptados:** amply.cl, staging.amply.cl y las vistas previas `*.amply-4fd.pages.dev`. Lo que llega desde fuera de producción trae el asunto marcado `[Prueba …]`.

## Configuración en Cloudflare (no en el repositorio)

| Binding | Tipo | Valor |
|---|---|---|
| `EMAIL` | send_email | `destination_address` = correo de destino verificado |
| `CONTACT_TO` | secreto | el mismo correo de destino |
| `TURNSTILE_SECRET` | secreto | clave secreta del widget Turnstile "amply.cl formulario" |

En el proyecto de Pages `amply`, producción y vista previa tienen el service binding `CONTACTO` → `amply-contacto`.

La clave pública de Turnstile (sitekey) vive en `src/data/site.ts` → `contact.turnstileSiteKey`.

## Desplegar cambios

```sh
cd workers/contacto
npx wrangler deploy
```

Wrangler conserva los secretos existentes. Si se crea el Worker desde cero, agrega `destination_address` al binding `EMAIL` en el panel y carga los secretos con `npx wrangler secret put CONTACT_TO` y `npx wrangler secret put TURNSTILE_SECRET`.
