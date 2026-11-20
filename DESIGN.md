# Reglas de diseño de amply.cl

Reglas **estrictas** para cualquier cambio en la web. Si una propuesta choca con alguna, la regla gana.

## Inspiración principal: [datawalt.cl](https://www.datawalt.cl/)

Tomamos de Datawalt su **espaciado generoso**, su **concisión** y su **tono**. No copiamos su paleta, su marca ni sus textos.

- Mucho aire entre secciones y bloques: el espacio vacío es parte del diseño, no relleno pendiente.
- Una idea por bloque. Si un bloque necesita dos párrafos para explicarse, se divide o se recorta.
- Visuales que muestran el producto (chat, panel, tabla) antes que párrafos que lo describen.

## Texto

1. **Corto.** Títulos de ~8 palabras como máximo. Intro de sección: una línea o ninguna. Descripción de cada ítem: una línea.
2. **Tono Datawalt:** frases cortas y seguras, terminadas en punto. Preguntas que incomodan ("Tu competencia ya responde en segundos. ¿Y tú?"). Negaciones en serie ("No contrates otro sueldo. No pagues un proyecto eterno."). Cierres que quitan riesgo ("Si no vemos cómo ahorrarte plata, no hay segunda reunión.").
3. **Tú, nunca usted.** Español neutro con giros chilenos suaves ("plata", "andando").
4. **Cero jerga técnica o comercial** para el cliente: nada de leads, CRM, SaaS, MVP, RAG, stack, APIs, comandos ni estética de terminal. Se dice "clientes interesados", "sistema de ventas", "plataforma propia". El cliente es dueño o gerente de pyme, no desarrollador.
5. **Cero relleno:** sin frases decorativas, sin repetir en una sección lo que ya dijo otra.
6. **Nada inventado:** ni testimonios, ni logos de clientes, ni cifras de resultados que no sean reales. Los ejemplos ilustrativos llevan la etiqueta "Ejemplo" o "Ilustrativo".

## Estructura

- Orden de la página: Hero (chat del empleado IA) → **Software a medida** → **Empleados IA** → Carrera de respuesta ("¿Cuánto tarda tu empresa en responder?") → Cómo trabajamos → Por qué nosotros → Planes → Preguntas → Contacto. El software siempre va antes que los empleados IA.
- Para comparar, preferir un visual animado (como la carrera de respuesta) antes que una tabla de texto.
- El hero mantiene el chat de WhatsApp del empleado IA: es el elemento que más llama la atención.
- Encabezado de sección: eyebrow corto + título + intro opcional de una línea, **centrado y sin numeración**.
- Secciones con `py-28 sm:py-40`, borde superior y fondos alternados (`bg-surface/30` una sí, una no).
- Ancho máximo de contenido 76rem; márgenes laterales de 16 px en móvil.
- Software se presenta **por rubro** (selector "Elige tu rubro y mira qué cambia": Hoy → Software Amply + Empleado IA), no como lista genérica de servicios. Rubros actuales: Automotora, Clínica, Retail, E-commerce y Servicios.
- Empleados IA se presentan como **cards seleccionables**, no como terminal ni consola.
- Navbar: arriba del todo es una barra de ancho completo pegada al borde; al bajar se suelta y se convierte en una píldora flotante (animación ligada al scroll). En móvil solo íconos (sol/luna y hamburguesa) y panel a todo el ancho.

## Color y temas

- **Modo día y modo noche obligatorios.** Todo cambio se revisa en ambos.
- Solo tokens del tema (`ink`, `surface`, `raised`, `fg`, `muted`, `subtle`, `line`, `accent`, `accent-fill`, `on-accent`…). **Prohibidos los colores fijos** en componentes.
- Verde lima `#c8f250` (`accent-fill`) para botones y rellenos, con texto oscuro (`on-accent`). Para textos e íconos verdes se usa `accent`, que de día es `#4a7a0c` para que se lea.

## Logo

- El logo es la "m" con el segundo arco más alto (amplificar). Vive en `src/assets/brand/logo.ts` y es la única fuente: la web, la carpeta `brand/`, el favicon y `og.png` salen de ahí con `pnpm images`.
- En la web se usa solo el wordmark ("amply" con su "m"); el símbolo solo en favicon, avatares y espacios chicos. Nunca juntos.
- Reglas de uso y colores en `brand/README.md`. Nunca redibujarlo ni recrearlo con texto.

## Tipografía

- Geist para todo el texto; Geist Mono solo para eyebrows y etiquetas pequeñas.
- Instrument Serif en cursiva solo para **una palabra de acento** por título, en verde.

## Movimiento y accesibilidad

- Animaciones solo con `prefers-reduced-motion: no-preference`; nada infinito ni parpadeante; sin contadores animados.
- Scroll: solo animaciones CSS ligadas al scroll (`animation-timeline`), que animen opacidad y transformaciones. Efectos permitidos: aparición escalonada (`.stagger`, por tiempo: 1,5 s por card y 0,15 s entre cards que entran juntas, para mayor suavidad en secciones con muchas cards), barra de progreso en la píldora, línea del proceso que se dibuja, salida suave del hero y menú que marca la sección visible.
- Prohibido: librerías de scroll suave (Lenis, GSAP ScrollTrigger), secuestrar el scroll, parallax en muchos elementos y desenfoques animados.
- Contraste suficiente en ambos temas, foco visible, áreas táctiles de al menos 44 px.
- Revisar siempre en móvil (390 px) sin scroll horizontal.

## Legal

- La política de privacidad vive en `/privacidad` y se enlaza desde el formulario y el pie de página. Si el formulario pide un dato nuevo, se agrega también a la política.

## Contenido editable

Todo el texto, precios y datos viven en `src/data/site.ts`. Los valores provisorios se marcan con `TODO` y no se publican sin confirmar.
