/**
 * POST /api/contacto: reenvía el formulario al Worker amply-contacto
 * (workers/contacto) por el service binding CONTACTO.
 */
export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  }
  if (!env.CONTACTO) {
    return Response.json({ ok: false, error: 'unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
  return env.CONTACTO.fetch(request);
}
