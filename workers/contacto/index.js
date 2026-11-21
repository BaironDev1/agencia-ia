/**
 * amply-contacto: recibe el formulario de contacto de amply.cl y lo envía por
 * correo a Bairon.
 *
 * El sitio llama a /api/contacto (functions/api/contacto.js), que reenvía la
 * petición a este Worker por un service binding. El Worker no tiene URL
 * pública propia.
 *
 * Bindings (se configuran en Cloudflare, nunca en el repositorio):
 *   EMAIL             send_email, restringido al correo de destino verificado
 *                     en Email Routing (enviar ahí es gratis en cualquier plan).
 *   CONTACT_TO        secreto: correo de destino (el mismo del binding).
 *   TURNSTILE_SECRET  secreto: clave secreta del widget de Turnstile.
 */

const FROM = { email: 'formulario@amply.cl', name: 'Formulario amply.cl' };

/** Orígenes desde los que se acepta el formulario: producción, staging y vistas previas de Pages. */
const PRODUCTION_HOST = 'amply.cl';
const isAllowedHost = (host) =>
  host === PRODUCTION_HOST ||
  host === 'staging.amply.cl' ||
  host === 'amply-4fd.pages.dev' ||
  host.endsWith('.amply-4fd.pages.dev');

/** Campos del formulario y su largo máximo (iguales a los del sitio). */
const FIELDS = {
  nombre: { label: 'Nombre', max: 100, required: true },
  email: { label: 'Correo', max: 150, required: true },
  empresa: { label: 'Empresa', max: 100 },
  servicio: { label: 'Servicio', max: 150 },
  plan: { label: 'Plan de interés', max: 150 },
  tamano: { label: 'Tamaño de empresa', max: 60 },
  conversaciones: { label: 'Conversaciones al día', max: 60 },
  mensaje: { label: 'Mensaje', max: 3000, required: true, multiline: true },
};

const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;
const MAX_BODY_BYTES = 32 * 1024;

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });

const singleLine = (value) => value.replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim();

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

async function verifyTurnstile(token, ip, secret) {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  if (!res.ok) return false;
  const outcome = await res.json();
  return Boolean(outcome.success) && outcome.action === 'contacto' && isAllowedHost(String(outcome.hostname || ''));
}

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405, { Allow: 'POST' });

    const origin = request.headers.get('Origin');
    let originHost = '';
    if (origin) {
      try {
        originHost = new URL(origin).hostname;
      } catch {}
      if (!isAllowedHost(originHost)) return json({ ok: false, error: 'origin' }, 403);
    }
    // Los envíos desde staging o vistas previas llegan marcados como prueba.
    const testPrefix = originHost && originHost !== PRODUCTION_HOST ? `[Prueba ${originHost}] ` : '';

    const type = request.headers.get('Content-Type') || '';
    if (!type.startsWith('multipart/form-data') && !type.startsWith('application/x-www-form-urlencoded')) {
      return json({ ok: false, error: 'type' }, 415);
    }
    if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY_BYTES) {
      return json({ ok: false, error: 'size' }, 413);
    }

    let form;
    try {
      form = await request.formData();
    } catch {
      return json({ ok: false, error: 'form' }, 400);
    }
    const read = (name) => {
      const value = form.get(name);
      return typeof value === 'string' ? value.trim() : '';
    };

    // Trampa anti-spam: los bots completan el campo oculto. Respondemos "ok" sin enviar.
    if (read('_gotcha')) return json({ ok: true });

    const data = {};
    for (const [name, field] of Object.entries(FIELDS)) {
      const raw = read(name);
      const value = field.multiline ? raw.replace(/\r\n?/g, '\n') : singleLine(raw);
      if (value.length > field.max || (field.required && !value)) return json({ ok: false, error: 'invalid', field: name }, 422);
      data[name] = value;
    }
    if (!EMAIL_RE.test(data.email)) return json({ ok: false, error: 'invalid', field: 'email' }, 422);
    if (data.mensaje.length < 20) return json({ ok: false, error: 'invalid', field: 'mensaje' }, 422);

    const token = read('cf-turnstile-response');
    if (!token || token.length > 2048) return json({ ok: false, error: 'captcha' }, 403);
    let human = false;
    try {
      human = await verifyTurnstile(token, request.headers.get('CF-Connecting-IP'), env.TURNSTILE_SECRET);
    } catch {}
    if (!human) return json({ ok: false, error: 'captcha' }, 403);

    const rows = Object.entries(FIELDS)
      .filter(([name, field]) => !field.multiline)
      .map(([name, field]) => [field.label, data[name] || '—']);

    const text = [...rows.map(([label, value]) => `${label}: ${value}`), '', data.mensaje, '', '—', 'Responde a este correo para contestarle directamente.'].join('\n');

    const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#14170f">
<table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([label, value]) => `<tr><td style="color:#5b5f55;vertical-align:top">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`)
      .join('')}</table>
<p style="white-space:pre-wrap;margin-top:16px">${escapeHtml(data.mensaje)}</p>
<p style="color:#5b5f55;font-size:13px">Responde a este correo para contestarle directamente.</p>
</body></html>`;

    const subject = singleLine(`${testPrefix}Nuevo contacto: ${data.nombre}${data.empresa ? ` · ${data.empresa}` : ''}`).slice(0, 200);
    const replyName = data.nombre.replace(/["<>\\]/g, '').slice(0, 100) || data.email;

    try {
      await env.EMAIL.send({
        to: env.CONTACT_TO,
        from: FROM,
        replyTo: { email: data.email, name: replyName },
        subject,
        text,
        html,
      });
    } catch (error) {
      console.error('send failed', error?.code, error?.message);
      return json({ ok: false, error: 'send' }, 502);
    }

    return json({ ok: true });
  },
};
