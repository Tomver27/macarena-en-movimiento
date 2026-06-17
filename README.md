# Macarena en Movimiento

**Taller Internacional Italia en Perspectiva 2026 · Universidad Piloto de Colombia**  
**Grupo Orizzonti · Ingeniería de Sistemas**

---

## Contexto del proyecto

"Macarena en Movimiento" es un Centro de Desarrollo Comunitario (CDC) propuesto para el predio de la Calle 26 Bis #4-88 en el barrio La Macarena, Bogotá. El proyecto es desarrollado por un equipo interdisciplinar (arquitectura, ingeniería civil, ingeniería de sistemas y negocios internacionales) cuyo objetivo general es demostrar que el predio tiene las condiciones urbanas, sociales y normativas para convertirse en un equipamiento que active la vida comunitaria del sector.

El **aporte de sistemas** tiene un rol comunicativo y tecnológico dentro del proyecto: construir la presencia digital del CDC antes de su existencia física, usando la web como extensión de su alcance social.

---

## Problema que resuelve el aporte digital

El barrio La Macarena concentra equipamientos culturales de alta relevancia (Planetario, Biblioteca Nacional, Universidad Jorge Tadeo Lozano, Parque de la Independencia), pero más del **72% de los peatones que circulan por el sector son flujos de tránsito puro** — no se detienen, no interactúan, no permanecen. El predio actualmente no participa en las dinámicas sociales, culturales ni económicas del territorio.

La landing page no es una herramienta estética: es la **dimensión digital del CDC**. Traduce el diagnóstico territorial, la propuesta arquitectónica y el análisis financiero en un lenguaje accesible para inversores, instituciones distritales y la comunidad del sector — ampliando el radio de impacto del proyecto incluso antes de su construcción física (Castells, 2009).

---

## Lo que se planea realizar

### 1. Landing page — `macarena-en-movimiento/`

Página web pública del CDC, construida con **Next.js 16** (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP y Lenis. Actúa como punto de convergencia entre la propuesta técnica del proyecto y sus audiencias potenciales.

**Secciones planificadas y estado:**

| Sección | Contenido | Estado |
|---|---|---|
| Hero | Nombre del CDC, subtítulo, carrusel de streams en vivo / videos | ✅ Implementado |
| Exposición | 3 cards con los ejes del proyecto (conectar, permanecer, activar) | ✅ Implementado |
| Actividades | 6 tipos de actividades del CDC con íconos SVG | ✅ Implementado |
| Planos | SVG conceptual del plano arquitectónico del CDC | ✅ Implementado (SVG provisional) |
| El Lote | Datos del predio + mapa embebido OpenStreetMap (Calle 26 Bis #4-88) | ✅ Implementado |
| Problemática | 3 columnas: caminabilidad, espacio público, tejido comercial | ✅ Implementado |
| Estadísticas | 6 contadores animados con datos territoriales reales | ✅ Implementado |
| Avances | Timeline de 3 fases del proyecto + chips del equipo | ✅ Implementado |
| Equipo | 6 cards del Grupo Orizzonti | ✅ Implementado |
| Footer | Información de contacto y créditos | ✅ Implementado |

**Elementos visuales de experiencia implementados:**

- Preloader animado (contador 0→100, cortina de salida)
- Cursor personalizado con dot + ring que reacciona a links (GSAP `quickTo`)
- Smooth scroll con inercia (Lenis)
- Animaciones de entrada por scroll (GSAP ScrollTrigger)
- Parallax en el hero
- Efecto de grano cinematográfico (film grain CSS)
- Tipografía fluida con `clamp()`
- Navbar con colapso animado a siglas "MEM" al hacer scroll

**Lo que falta completar en la landing:**

- Planos arquitectónicos reales (reemplazar el SVG conceptual por renders de AutoCAD/Revit)
- Fotografías y renders reales del predio y la propuesta
- Contenido definitivo de todas las secciones (actualmente con datos de avances.md)
- Posible integración con un CMS para gestionar la programación de eventos del CDC de forma dinámica
- Despliegue público en Vercel u otra plataforma

---

### 2. Streaming interactivo desde TouchDesigner

El parámetro `?stream=<url>` en la URL del Hero permite embeber un iframe de cualquier fuente de video o stream. Esto anticipa la integración futura con TouchDesigner.

**Estado actual:** el carrusel del Hero acepta una URL de stream vía query param y muestra el contenido en un iframe con navegación por drag y control de zoom. Por defecto muestra canales de YouTube como placeholder.

**Lo que falta implementar:**

- Conexión WebRTC real desde TouchDesigner para transmitir programación visual generativa en tiempo real desde el CDC hacia la landing page
- Esta integración representa la experiencia interactiva física-digital del CDC: lo que ocurre dentro del espacio se proyecta en la web

---

### 3. Programación visual en TouchDesigner (prueba de concepto)

Se desarrolló un fragmento de programación visual por nodos como prueba de concepto de la experiencia interactiva planteada para el interior del CDC. TouchDesigner permite generar visualizaciones y experiencias en tiempo real sin código tradicional.

**Estado:** prueba de concepto realizada (Tomás Vera, 2026). No está integrada con la landing page todavía.

---

## Ciclo de vida del software (estado general)

```
Planeación  ──────────────────────────────────────  ✅ completo
  └─ Requisitos de la landing
  └─ Casos de uso de TouchDesigner

Diseño  ──────────────────────────────────────────  ✅ completo
  └─ Mockup de la landing
  └─ Estructura de operadores TOPs en TouchDesigner

Implementación  ──────────────────────────────────  🔄 en curso
  └─ Landing page Next.js  ─────────────────────────  ✅ primera versión
  └─ Contenido real (fotos, renders, planos)  ──────  ⏳ pendiente
  └─ Streaming WebRTC desde TouchDesigner  ─────────  ⏳ pendiente
  └─ Módulo de eventos del CDC  ────────────────────  ⏳ pendiente (posible CMS)

Despliegue  ──────────────────────────────────────  ⏳ pendiente
  └─ Alojamiento web público (Vercel u otro)
  └─ TouchDesigner corriendo en el CDC físico
```

---

## Archivos de referencia en esta carpeta

| Archivo | Descripción |
|---|---|
| `avances.md` | Fuente de verdad consolidada del proyecto: fases, contexto, datos territoriales, bibliografía |
| `Estructuración Proyecto Taller Italia_2026.docx.md` | Plantilla oficial del entregable final del Taller (estructura del documento académico) |
| `tecnologias-nextjs.md` | Documentación técnica detallada de todas las tecnologías usadas en la landing page |
| `macarena-en-movimiento/` | Código fuente de la landing page (Next.js) |

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 16.2.9 | Framework web principal (App Router, SSG/SSR) |
| React | 19.2.4 | UI declarativa |
| TypeScript | ^5 | Tipado estático |
| Tailwind CSS | ^4 | Estilos utilitarios |
| GSAP | ^3.15.0 | Animaciones (timelines, ScrollTrigger, quickTo) |
| Lenis | ^1.3.23 | Smooth scroll con inercia |
| TouchDesigner | — | Programación visual interactiva (experiencia física del CDC) |

---

## Marco teórico del aporte (síntesis)

**Comunicación digital territorial** — uso estratégico de plataformas web para visibilizar proyectos de intervención urbana ante audiencias que de otro modo no tendrían acceso. La presencia digital de un proyecto determina su alcance social, su capacidad de atraer aliados y su legitimidad ante la comunidad (Castells, 2009).

**Landing page** — página de destino de propósito específico que opera como punto de convergencia entre la propuesta técnica y sus usuarios potenciales. Concentra en un único flujo visual los argumentos esenciales del proyecto, reduciendo la fricción entre la iniciativa y su audiencia (Nielsen, 2020).

---

## Referencias

- Castells, M. (2009). *Comunicación y poder*. Alianza Editorial.
- Nielsen, J. (2020). *Usability engineering*. Morgan Kaufmann.
- Anthropic. (2025). *Claude (claude-sonnet-4-6)* [Modelo de inteligencia artificial]. https://www.anthropic.com