import type { APIRoute } from 'astro';
import { aiEmployees, aiPlans, faqs, industries, site, softwarePillars } from '../data/site';

/**
 * /llms.txt: resumen factual de Amply para motores de IA (ChatGPT, Claude,
 * Perplexity, Gemini). Se genera desde src/data/site.ts para que siempre
 * coincida con la web. No se enlaza ni se muestra en el sitio.
 */
export const GET: APIRoute = () => {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} (${site.url}) es una agencia de software e inteligencia artificial con base en ${site.area.city}, ${site.area.region}, Chile. Atiende presencialmente a empresas de ${site.area.cities.join(', ')} y, en remoto, a empresas de todo Chile. Eslogan: "${site.slogan}".`,
    '',
    '## Servicios',
    '',
    ...softwarePillars.map((p) => `- ${p.title}`),
    '- Empleados IA: agentes que atienden clientes por WhatsApp, Instagram y web, 24/7, conectados a los sistemas de la empresa.',
    '',
    '## Empleados IA',
    '',
    ...aiEmployees.map((e) => `- ${e.role}: ${e.tasks.join('; ')}. Ideal para ${e.idealFor.toLowerCase()}.`),
    '',
    '## Rubros',
    '',
    ...industries.map((i) => `- ${i.name}: ${i.software} ${i.ai}`),
    '',
    '## Planes de empleados IA (valores en UF + IVA)',
    '',
    ...aiPlans.map((p) =>
      p.monthly === 'A medida'
        ? `- ${p.name}: a medida. ${p.tagline}`
        : `- ${p.name}: desde ${p.monthly} al mes + puesta en marcha desde ${p.setup}. ${p.tagline}`,
    ),
    '- Sin permanencia. Garantía de resultados a 60 días sobre la puesta en marcha.',
    '',
    '## Preguntas frecuentes',
    '',
    ...faqs.flatMap((f) => [`### ${f.question.replace(/[«»]/g, '')}`, f.answer, '']),
    '## Contacto',
    '',
    `- Web: ${site.url}`,
    `- Correo: ${site.contact.email}`,
    ...(site.contact.whatsapp ? [`- WhatsApp: +${site.contact.whatsapp}`] : []),
    `- Fundador: ${site.founder.name}, ${site.founder.role} (${site.founder.linkedin})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
