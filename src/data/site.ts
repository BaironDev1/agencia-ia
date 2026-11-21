/**
 * Contenido y datos de la agencia.
 *
 * Casi todo el texto del sitio vive en este archivo: cambia el nombre, los
 * datos de contacto o los servicios aquí y el sitio entero se actualiza.
 * Los valores marcados con "TODO" son provisorios y hay que reemplazarlos
 * antes de publicar.
 */

export const site = {
  name: 'Amply',
  // TODO: dominio definitivo (también se usa en astro.config.mjs).
  url: 'https://www.amply.cl',
  // Eslogan de la marca: la "m" del logo, con el segundo arco más alto, lo representa.
  slogan: 'Amplificamos tu negocio',
  tagline: 'Amplificamos tu negocio con software e IA',
  description:
    'Agencia de desarrollo de software e inteligencia artificial. Creamos agentes de IA, automatizaciones y productos digitales a medida para empresas de Latinoamérica.',
  locale: 'es_LA',
  contact: {
    // TODO: correo real de contacto.
    email: 'contacto@amply.cl',
    // TODO: número de WhatsApp en formato internacional sin "+" ni espacios (ej. 56912345678). Vacío = se oculta.
    whatsapp: '+56957816001',
    // TODO: ciudad / país. Vacío = se oculta.
    location: ' Chile · Remoto',
    /**
     * Endpoint que recibe el formulario por POST (Formspree, Web3Forms, una
     * función serverless propia, etc.). Si queda vacío, el formulario abre el
     * cliente de correo del visitante con el mensaje ya redactado.
     */
    formEndpoint: '',
  },
  // TODO: perfiles reales. Los que queden con href vacío no se muestran.
  social: [
    { label: 'LinkedIn', href: '' },
    { label: 'GitHub', href: '' },
    { label: 'Instagram', href: '' },
  ],
  /**
   * Fundador: aparece en "Por qué nosotros", en Contacto y en el pie de página.
   * Para mostrar una foto, guárdala en public/ (ej. public/fundador.jpg) y pon
   * su ruta en `photo` ('/fundador.jpg'). Sin foto se muestran tus iniciales.
   */
  /**
   * Datos legales para la política de privacidad (/privacidad).
   * TODO: completa con los datos reales de tu empresa antes de publicar.
   */
  legal: {
    company: 'TODO Razón social',
    rut: 'TODO 00.000.000-0',
    address: 'TODO Dirección, comuna, Santiago, Chile',
    privacyEmail: 'hola@amply.cl',
    updated: '19 de noviembre de 2026',
  },
  founder: {
    name: 'Bairon Ampuero',
    role: 'Fundador y CTO',
    linkedin: 'https://www.linkedin.com/in/ampuero-dev',
    photo: '/fundador.webp',
    quote:
      'Hablas conmigo desde la primera llamada. Sin vendedores, sin intermediarios. Y con un responsable claro de tu proyecto.',
  },
} as const;

export const nav = [
  { label: 'Software', href: '/#servicios' },
  { label: 'Empleados IA', href: '/#empleados' },
  { label: 'Planes', href: '/#planes' },
  { label: 'Proceso', href: '/#proceso' },
  { label: 'Preguntas', href: '/#preguntas' },
];

export type IconName =
  | 'agent'
  | 'flow'
  | 'knowledge'
  | 'code'
  | 'rocket'
  | 'compass'
  | 'shield'
  | 'key'
  | 'chart'
  | 'people'
  | 'cart'
  | 'car'
  | 'calendar'
  | 'coins'
  | 'headset';

/**
 * Empleados IA: agentes empaquetados como un "puesto de trabajo" fácil de
 * entender para el dueño de una pyme. Se contratan con los planes de abajo.
 */
export const aiEmployees: {
  icon: IconName;
  role: string;
  tasks: string[];
  idealFor: string;
}[] = [
  {
    icon: 'cart',
    role: 'Vendedor IA',
    tasks: ['Responde stock, precios y despachos', 'Envía el link de pago', 'Retoma compras que quedaron a medias'],
    idealFor: 'Tiendas online, tiendas y automotoras',
  },
  {
    icon: 'calendar',
    role: 'Recepcionista IA',
    tasks: ['Agenda en tu calendario', 'Recordatorios que bajan las inasistencias', 'Reactiva a quienes no volvieron'],
    idealFor: 'Clínicas, centros de salud y servicios',
  },
  {
    icon: 'coins',
    role: 'Asistente de cobranza IA',
    tasks: ['Avisos antes y después del vencimiento', 'Links de pago y convenios', 'Resumen diario de lo recaudado'],
    idealFor: 'Servicios, educación y arriendos',
  },
  {
    icon: 'headset',
    role: 'Atención y postventa IA',
    tasks: ['Estado de pedidos y cambios', 'Preguntas frecuentes 24/7', 'Encuestas de satisfacción'],
    idealFor: 'Cualquier negocio con muchas consultas',
  },
];

/**
 * Software por rubro: "Elige tu rubro y mira qué cambia". Cada rubro muestra
 * cómo funciona hoy, qué software construimos y qué hace el empleado IA.
 */
export const industries: {
  id: string;
  name: string;
  icon: IconName;
  today: string;
  software: string;
  ai: string;
}[] = [
  {
    id: 'automotora',
    name: 'Automotora',
    icon: 'car',
    today: 'Cotizaciones en Excel y clientes interesados que se pierden en WhatsApp personales.',
    software: 'Cotizador con stock y crédito, y cada cliente con su vendedor asignado.',
    ai: 'Responde, cotiza y agenda la prueba de manejo 24/7.',
  },
  {
    id: 'clinica',
    name: 'Clínica',
    icon: 'calendar',
    today: 'Agenda en planilla y pacientes que no llegan.',
    software: 'Agenda en línea conectada a fichas y pagos, con la agenda de cada profesional.',
    ai: 'Agenda, confirma y reagenda por WhatsApp. Bajan las inasistencias.',
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: 'chart',
    today: 'Inventario distinto en cada tienda y cierres de caja a mano.',
    software: 'Inventario al día en todas tus tiendas y ventas del día en tu celular.',
    ai: 'Responde stock y horarios por tienda, y avisa cuando llega un producto.',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: 'cart',
    today: 'Pedidos copiados a mano entre la tienda, la bodega y el despacho.',
    software: 'Pedidos que pasan solos de la tienda a bodega, factura y despacho.',
    ai: 'Responde dónde va cada pedido, retoma compras a medias y vende en el chat.',
  },
  {
    id: 'servicios',
    name: 'Servicios',
    icon: 'people',
    today: 'Propuestas por correo y seguimiento de clientes en planillas.',
    software: 'Portal de clientes con propuestas, contratos y el estado de cada trabajo.',
    ai: 'Filtra las consultas serias, agenda reuniones y sigue cada propuesta.',
  },
];

/** Los tres pilares del software, para quien busca el servicio por nombre. */
export const softwarePillars: { icon: IconName; title: string; href?: string }[] = [
  { icon: 'code', title: 'Sistemas a medida' },
  { icon: 'flow', title: 'Automatizaciones' },
  { icon: 'people', title: 'Equipo de desarrollo mensual', href: '#planes' },
];

export const steps = [
  {
    title: 'Diagnóstico',
    duration: '1 semana',
    description:
      'Detectamos dónde la IA te ahorra más.',
  },
  {
    title: 'Primera versión',
    duration: '2–3 semanas',
    description:
      'Funcionando con tus datos reales.',
  },
  {
    title: 'Desarrollo',
    duration: 'Ciclos de 2 semanas',
    description:
      'Entregas cada dos semanas, siempre visibles.',
  },
  {
    title: 'Lanzamiento y evolución',
    duration: 'Continuo',
    description:
      'Medimos resultados y mejoramos cada mes.',
  },
];

export const principles: { icon: IconName; title: string; description: string }[] = [
  {
    icon: 'chart',
    title: 'Resultados antes que promesas',
    description: 'Partimos con un número: ventas, horas ahorradas o tiempo de respuesta.',
  },
  {
    icon: 'key',
    title: 'El código es tuyo',
    description: 'El sistema, los servidores y los datos a tu nombre. Si te vas, te lo llevas.',
  },
  {
    icon: 'shield',
    title: 'Seguridad desde el día uno',
    description: 'Tus datos no se usan para entrenar otras IA. Punto.',
  },
];

export const faqs = [
  {
    question: '¿Cuánto cuesta?',
    answer:
      'Los empleados IA parten desde 4 UF al mes más un pago único de puesta en marcha; el detalle está en Planes. El software a medida se cotiza con precio cerrado por etapa, después del diagnóstico gratis.',
  },
  {
    question: '¿Hay permanencia?',
    answer: 'No. Pausas, bajas de plan o cancelas con 30 días de aviso. Si pagas anual, tienes descuento.',
  },
  {
    question: '«¿De verdad funciona en semanas?»',
    answer:
      'Sí. La primera versión queda andando en 2 a 4 semanas, con tus datos reales. Lo demás se mejora sobre algo que ya funciona.',
  },
  {
    question: '¿Mis datos están seguros?',
    answer:
      'Sí. Usamos proveedores que no entrenan con tus datos, controlamos quién entra y, si lo necesitas, todo queda en tus propios servidores.',
  },
  {
    question: '¿También hacen apps, plataformas o asistentes con documentos?',
    answer:
      'Sí. Apps web y móviles, plataformas propias desde cero y asistentes que responden con tus manuales y contratos. Lo vemos en el diagnóstico.',
  },
  {
    question: '¿Necesito un equipo técnico?',
    answer: 'No. Nos hacemos cargo de todo. Si ya tienes equipo, trabajamos juntos y les dejamos todo explicado por escrito.',
  },
];

export const contactTopics = [
  'Empleado IA (ventas, agenda, cobranza o atención)',
  'Automatización de procesos',
  'Asistente con mis documentos',
  'Desarrollo web o móvil',
  'Equipo de desarrollo mensual',
  'Lanzar una app o plataforma propia',
  'Consultoría en IA',
  'Aún no lo tengo claro',
];

export const companySizes = ['1 a 4 personas', '5 a 19', '20 a 150', 'Más de 150'];
export const dailyConversations = ['Menos de 10', '10 a 100', 'Más de 100', 'No lo sé'];

/* ───────────────────────── Planes ─────────────────────────
 * TODO: TODOS los valores de esta sección son provisorios. Ajusta precios,
 * topes y condiciones a tu realidad antes de publicar. Valores en UF + IVA.
 */

export const guarantee = {
  title: 'Si no cumple, no pagas la puesta en marcha.',
  text: 'Acordamos una meta medible antes de partir. Si a los 60 días tu empleado IA no la alcanza, te devolvemos el 100%. No es una forma de decir.',
};

export const aiPlans: {
  name: string;
  tagline: string;
  setup: string;
  monthly: string;
  featured?: boolean;
  features: string[];
  cta: string;
}[] = [
  {
    name: 'Inicial',
    tagline: 'Para responder rápido sin sumar personal.',
    setup: '15 UF',
    monthly: '4 UF',
    features: [
      '1 empleado IA',
      'WhatsApp o chat web',
      'Hasta 1.000 conversaciones al mes',
      'Ajustes mensuales y reporte de resultados',
      'Ayuda por WhatsApp',
    ],
    cta: 'Empezar con Inicial',
  },
  {
    name: 'Crecimiento',
    tagline: 'Para vender por chat, no solo responder.',
    setup: '25 UF',
    monthly: '8 UF',
    featured: true,
    features: [
      'Hasta 2 empleados IA',
      'WhatsApp, Instagram y chat web',
      'Hasta 5.000 conversaciones al mes',
      'Conexión con tu sistema de ventas, agenda o tienda',
      'Reunión mensual de mejora',
    ],
    cta: 'Elegir Crecimiento',
  },
  {
    name: 'Escala',
    tagline: 'Para muchas conversaciones o necesidades propias.',
    setup: 'A medida',
    monthly: 'A medida',
    features: [
      'Todos los empleados IA que necesites',
      'Todos los canales, incluidas llamadas',
      'Conversaciones a medida',
      'Conexión con todos tus sistemas',
      'Una persona a cargo y tiempos de respuesta garantizados',
    ],
    cta: 'Conversemos',
  },
];

/** Escalera del equipo de desarrollo por suscripción: se baja de plan en vez de irse. */
export const devPlans = [
  { name: 'Construcción', price: '60 UF', detail: 'Pide lo que necesites; lo hacemos uno a la vez. Entregas cada semana.' },
  { name: 'Mejoras', price: '25 UF', detail: 'Ajustes y mejoras pequeñas sobre lo construido.' },
  { name: 'Mantención', price: '6 UF', detail: 'Servidor, vigilancia 24/7, respaldos y actualizaciones de seguridad.' },
];

export const pricingNotes = [
  'Valores en UF + IVA. Pagando anual tienes 15% de descuento.',
  'Sin permanencia: pausa, baja de plan o cancela con aviso de 30 días.',
  'El consumo de IA y los mensajes de WhatsApp están incluidos hasta el tope del plan; sobre eso se cobran al costo.',
];
