# Arquitectura del Sistema: The Cyber Vault

> **Documento Vivo de Ingeniería y Arquitectura de Software**  
> *Versión 3.1.0 — Rediseño Monocromático Absoluto & Estándares de Rendimiento GSAP*  
> **Autor:** Carlos Giovanni Reyes Medina — *Software Architect & Cybersecurity Specialist*  
> **Estado:** Estándar de Producción / Activo (Post Sprints de Optimización 1 & 2)

---

## 1. Visión General (The Cyber Vault)

El portafolio **The Cyber Vault** está concebido como un **ecosistema interactivo monocromático de alta seguridad**, enfocado en rendimiento extremo, precisión técnica y diseño editorial de alta gama (*High-End Visual & Industrial Design*).

Inspirado en la estética de terminales cibernéticas militares, gobernanza de datos y sistemas de encriptación de grado industrial, la arquitectura elimina cualquier elemento superfluo o color de acento estridente para centrarse en:

1. **Monocromatismo Absoluto:** Una paleta dominada exclusivamente por negro profundo (`#000000`), grises carbón/plata refinados y blanco puro radiante (`#ffffff`).
2. **Experiencia Cinemática a 60 FPS:** Animaciones orquestadas mediante la suite profesional de GSAP y `@gsap/react`, logrando desplazamiento con inercia física (*smooth scrolling*), micro-interacciones sutiles y profundidades tridimensionales sin jank.
3. **Persistencia Táctica y Jerarquía Editorial:** Uso riguroso de fuentes sans-serif masivas para titulares editoriales combinado con tipografía monoespaciada para insignias, metadatos, identificadores únicos y consolas CLI.

### 1.1 Objetivos Arquitectónicos Clave

| Pilar | Descripción | Indicador Clave (KPI) |
|---|---|---|
| **Seguridad Conceptual** | Interfaz temática CLI y canal de comunicación simulado de transmisión encriptada. | Cero fugas visuales de diseño genérico; cumplimiento del estándar Cyber Vault. |
| **Rendimiento GPU** | Uso estricto de aceleración por hardware (`will-change`, `force3D: true`, `transform: translateZ(0)`). | Ejecución fluida a 60 FPS sostenidos sin caídas de frames ni jank de composición durante el scroll. |
| **Composibilidad Reactiva** | Integración estricta de `useGSAP` con `scope` y `contextSafe` en la arquitectura de componentes. | Cero fugas de memoria (*memory leaks*), ScrollTriggers huérfanos o actualizaciones sobre nodos desmontados. |
| **Integridad de Layout 3D** | Prohibición de contenedores de recorte (`overflow: hidden`) en ancestros de elementos 3D. | Proyección completa de efectos abanico (*Fan-Out*), capas elevadas y sombras sin recortes visuales. |
| **Accesibilidad & UX** | Navegación accesible por teclado (`:focus-visible`), atributos WAI-ARIA y soporte `prefers-reduced-motion`. | Cumplimiento total de contraste tipográfico (WCAG AAA/AA) y navegabilidad asistida. |

---

## 2. Stack Tecnológico

La arquitectura de software se apoya en una pila moderna orientada a la máxima velocidad de renderizado, modularidad de componentes y control fino de animaciones vectoriales y 3D.

| Tecnología / Librería | Versión | Rol Arquitectónico |
|---|---|---|
| **React** | `^19.2.8` | Núcleo de la interfaz de usuario, gestión de estados reactivos y composición de componentes. |
| **Vite** | `^8.2.0` | Entorno de desarrollo, empaquetador ultrarrápido y servidor HMR de alta eficiencia. |
| **Tailwind CSS** | `^4.3.3` | Motor de estilos utilitarios de última generación para diseño atómico, layout responsivo y diseño Grid. |
| **GSAP (GreenSock)** | `^3.15.0` | Motor de animación principal para física cinemática, transformaciones 3D, timelines y manipulación vectorial. |
| **@gsap/react (`useGSAP`)** | `^2.1.2` | Hook oficial para la integración segura del ciclo de vida, scoping y limpieza automática de contextos GSAP en React. |
| **GSAP ScrollTrigger** | `^3.15.0` | Orquestación de animaciones cinemáticas enlazadas dinámicamente a la posición del scroll. |
| **GSAP ScrollSmoother** | `^3.15.0` | Sistema de inercia física global y efectos parallax (*smooth scroll*). |
| **GSAP SplitText** | `^3.15.0` | Fragmentación tipográfica atómica en palabras/caracteres para revelaciones vectoriales. |
| **React DOM (`createPortal`)** | `^19.2.8` | Teletransportación de modales holográficos al árbol raíz del DOM fuera del contenedor de ScrollSmoother. |

---

## 3. Sistema de Diseño (UI/UX) — Monocromatismo Absoluto

Basado en las directrices de diseño **Minimalist/Linear** y la filosofía **Anti-slop (Taste Skill)**, el portafolio prohíbe taxativamente el uso de colores vivos o de acento cromático (verdes, azules, rojos, etc.), operando exclusivamente en una escala monocromática refinada de alto contraste.

### 3.1 Paleta Cromática Estricta

| Código / Tono | Valor Hex / RGBA | Aplicación en la Interfaz |
|---|---|---|
| **Negro Absoluto (Void Black)** | `#000000` | Fondo base del canvas, `body`, contenedores raíz y velos de contraste. |
| **Carbón Profundo (Frosted Slate)** | `#0a0a0a` / `#121212` / `#171717` | Fondos de tarjetas de cristal oscuro, modales holográficos y consolas CLI. |
| **Gris Carbón Medio** | `#262626` / `#404040` | Bordes inactivos, divisores de sección y trazados de componentes. |
| **Gris Plata Neutral** | `#525252` / `#737373` / `#a3a3a3` | Textos secundarios, descripciones técnicas y etiquetas inactivas. |
| **Gris Plata Claro** | `#d4d4d4` / `#e5e5e5` | Subtítulos monoespaciados, caracteres cipher y estados hover. |
| **Blanco Puro (Radiant White)** | `#ffffff` | Tipografía principal, títulos masivos, reflectividad de tarjetas, halos e íconos activos. |
| **Spotlight / Halo White** | `rgba(255, 255, 255, 0.15)` | Resplandores radiales por mouse-tracking, bordes incandescentes y halos holográficos. |

> **Regla de Oro Cromática:** Está **estrictamente prohibido** utilizar códigos de color como `#1eff8e` (verde), `#4878c0` (cyan) o `#ee411a` (rojo) en cualquier componente visual, botón, badge o cinemática. La jerarquía visual se establece mediante peso de fuente, espaciado tipográfico, niveles de opacidad y contraste relativo.

### 3.2 The Monospace Scope Rule

Toda información técnica, insignias de estado, identificadores únicos (`SKL-01`, `CERT-RH124`, `PRJ-001`), metadatos de categoría, marcas de tiempo, prompts de consola y terminales CLI **deben renderizarse obligatoriamente** en fuente monoespaciada (`font-mono`, `Menlo`, `Roboto Mono`), utilizando:
- Tipografía en miniatura u 11px uppercase (`text-[9px]` a `text-xs`).
- Espaciado tipográfico expandido (`tracking-[0.25em]` a `tracking-[0.4em]`).
- Encapsulamiento en píldoras con borde translúcido (`border border-white/15 bg-white/[0.03]`).

### 3.3 Materiales: Frosted Slate (Glassmorphism Oscuro)

El material estructurador del portafolio es **Frosted Slate**, una superficie industrial compuesta por:
- **Fondo translúcido:** `rgba(18, 18, 18, 0.88)` o `bg-neutral-950/95`.
- **Filtro de desenfoque de fondo:** `backdrop-filter: blur(24px)` o `backdrop-blur-2xl`.
- **Bordes incandescentes sutiles:** `border border-white/10` o `border border-white/20`.
- **Iluminación volumétrica:** `shadow-[0_0_50px_rgba(0,0,0,0.9)]` combinada con halos interactivos de luz blanca en hover (*Spotlight Rule*).

---

## 4. Estándares Obligatorios de Animación y Rendimiento (GSAP)

Para garantizar la máxima fluidez a 60 FPS y prevenir fugas de memoria en aplicaciones React con renderizado dinámico, todos los componentes del proyecto deben cumplir los siguientes patrones de orquestación GSAP:

### 4.1 Uso Obligatorio del Hook `useGSAP` con `scope`

Queda prohibido el uso de `useEffect` convencional para instanciar animaciones GSAP (salvo excepciones documentadas con `gsap.context` y cleanup `ctx.revert()`). Toda animación debe declararse usando el hook `@gsap/react`:

```jsx
// ✅ ESTÁNDAR OBLIGATORIO — Animaciones declarativas con Scope y Dependencias
const sectionRef = useRef(null);

useGSAP(() => {
  // Selectores como '.folder-card' se confinan automáticamente a sectionRef.current
  gsap.from('.folder-card', {
    autoAlpha: 0,
    y: 80,
    duration: 1.2,
    stagger: 0.1,
    ease: 'power2.out',
  });
}, { 
  scope: sectionRef, 
  dependencies: [categoriaActiva], 
  revertOnUpdate: true // Revierte y limpia el contexto en cada actualización de estado
});
```

**Principios del Estándar:**
1. **Scoping Obligatorio:** Siempre se debe pasar `scope: sectionRef` (o el contenedor correspondiente) para evitar que los selectores CSS (`.tarjeta-herramienta`, `.categoria-inactiva`) colisionen con otros componentes en el DOM.
2. **Reversión Automática:** Pasar `dependencies: [estado]` junto con `revertOnUpdate: true` garantiza que cualquier animación anterior se destruya limpiamente antes de instanciar la nueva.

### 4.2 Control de Eventos de Usuario mediante `contextSafe`

Cualquier función manejadora de eventos (`onClick`, `onClose`, callbacks asíncronos) que ejecute animaciones GSAP **debe envolverse obligatoriamente con `contextSafe`** obtenido del hook `useGSAP`. Esto registra el tween dentro del ciclo de vida del componente y evita actualizaciones sobre nodos desmontados:

```jsx
// ✅ ESTÁNDAR OBLIGATORIO — Event Handlers protegidos con contextSafe
const { contextSafe } = useGSAP(() => {
  // Inicialización de líneas de tiempo estáticas
}, { scope: sectionRef });

const handleCloseModal = contextSafe(() => {
  if (modalBackdropRef.current && modalCardRef.current) {
    gsap.to(modalCardRef.current, {
      autoAlpha: 0,
      scale: 0.85,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
    });
    gsap.to(modalBackdropRef.current, {
      autoAlpha: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setSelectedSkill(null); // Actualización de estado segura post-animación
      },
    });
  } else {
    setSelectedSkill(null);
  }
});
```

### 4.3 Optimización GPU y Propiedades Compuestas

1. **Uso de `autoAlpha` en lugar de `opacity`:** Utilizar siempre `autoAlpha: 0 / 1`. GSAP conmuta automáticamente `visibility: hidden` cuando la opacidad llega a cero, desactivando eventos de puntero fantasma y reduciendo el costo de pintado en la GPU.
2. **Animar Únicamente Propiedades de Transformación y Opacidad:** Queda prohibido animar propiedades de layout como `width`, `height`, `top`, `left` o `margin` dentro de tweens recurrentes. Usar `transform` (`x`, `y`, `scale`, `rotationX`, `rotationY`).
3. **Control de `filter: blur()`:** El uso de desenfoques en tiempo real mediante GSAP debe limitarse estrictamente a transiciones de corta duración (`duration <= 0.5s`) debido al alto impacto de procesamiento de fragmentos en la GPU.

---

## 5. Reglas de Layout Estructural y Coexistencia 3D

### 5.1 Prohibición Estricta de Contenedores de Recorte (`overflow: hidden`) en Ancestros 3D

> **Lección de Ingeniería (Resolución BUG-04):** Un ancestro con `overflow: hidden` o `overflow-x-hidden` actúa como un *overflow clipping container* BFC, recortando cualquier elemento hijo que proyecte transformaciones 3D, sombras o elevaciones fuera de la caja física, incluso si el hijo especifica `overflow: visible !important`.

**Reglas de Layout:**
1. **Prohibición de `overflow-x-hidden` en Secciones Padre:** Ninguna etiqueta `<section>` o contenedor directo de componentes 3D (como `#stack`, `#certificaciones`, `#proyectos`) debe incluir `overflow-x-hidden` en su lista de clases Tailwind.
2. **Control Global de Desbordamiento con `overflow-x: clip`:** Para evitar barras de desplazamiento horizontal no deseadas a nivel de viewport, se debe aplicar exclusivamente en el CSS global ([src/index.css](file:///c:/Users/reyes/Desktop/mi-portafolio/src/index.css)):

```css
/* ✅ ESTÁNDAR GLOBAL DE OVERFLOW (src/index.css) */
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  max-width: 100vw;
  overflow-x: clip; /* Controla desbordamiento horizontal sin destruir el stacking context 3D */
  background-color: #000;
  color: #fff;
}
```

3. **Uso de `overflow-x-clip` y `overflow-y-visible` en Wrappers Internos:** Los contenedores intermedios deben declarar explícitamente `overflow-x-clip overflow-y-visible` para permitir que elementos asomados (*Messy Folder Peek*) o animaciones en abanico (*Fan-Out*) se proyecten libremente hacia arriba en el eje Y.

### 5.2 Estándar de Alineación Grid sin Números Mágicos (Resolución BUG-05)

Queda prohibido el uso de desfases fijos en píxeles (`left: 50px`, `left: -20px`) en pseudo-elementos o estados hover que desalineen visualmente las tarjetas dentro de las celdas de la cuadrícula en pantallas medianas (`md: 768px`).

- **Posicionamiento Porcentual Simétrico:** Los pseudo-elementos tridimensionales de fondo (`.box::before`, `.box::after`) deben utilizar centrado porcentual `left: 25%` sobre anchos del `50%`.
- **Alineación Nativa con Tailwind CSS Grid:** El centrado de tarjetas dentro de las celdas del grid debe delegarse completamente a utilidades nativas:

```jsx
// ✅ Alineación simétrica responsiva en la cuadrícula
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 justify-items-center items-start">
  <div className="folder-card justify-self-center mx-auto w-full flex flex-col items-center">
    {/* Contenido de la tarjeta */}
  </div>
</div>
```

---

## 6. Arquitectura de Componentes Core

### 6.1 BootAnimation (`src/components/BootAnimation.jsx`)

Cinemática de arranque inmersiva que simula autenticación y desencriptación cibernética en 4 fases orquestadas mediante `gsap.timeline()`:

```
+-----------------------------------------------------------------------------------+
|                            SECUENCIA DE ARRANQUE GSAP                             |
+-----------------------------------------------------------------------------------+
| 1. Emerge Vectorial  -->  2. Security Cipher  -->  3. Scatter Exit  --> 4. Unmount |
|    (Blur + Scatter 3D)    (Monospace Scramble)    (Magnetic Blur)    (React Clear)|
+-----------------------------------------------------------------------------------+
```

- **Fase 1 (Emerge Vectorial 3D):** Los caracteres vuelan hacia su posición original desde coordenadas aleatorias (`x/y ±70vw/vh`, `scale: 1.8→2.5`, `rotationZ: ±90°`) con `filter: blur(16px)` y `ease: expo.out`.
- **Fase 2 (Security Cipher Scramble):** Transición mediante **The Monospace Scope Rule** a `font-mono`. Reemplazo dinámico por símbolos de cifrado (`0, 1, #, %, X, @, !, *, &`) cada 40ms con resplandor `textShadow: 0 0 20px rgba(255,255,255,0.4)`.
- **Fase 3 (Magnetic Blur Scatter Exit):** Disparo magnético asimétrico hacia las esquinas externas (`x/y ±120vw/vh`, `scale: 0.3`, `blur(16px)`) con `ease: expo.in`.
- **Fase 4 (Desmonte Limpio):** Desvanecimiento (`autoAlpha: 0`) en 0.5s y ejecución de `onComplete()` para desmontar el componente del estado global `isBooting`.

### 6.2 App.jsx (`src/App.jsx`)

Orquestador principal que implementa la estructura estricta requerida por GSAP `ScrollSmoother`:

```html
<div className="min-h-screen bg-black text-white font-sans">
  <CustomCursor />
  {isBooting && <BootAnimation onComplete={() => setIsBooting(false)} />}
  <Navbar /> <!-- Posicionamiento Fijo (Fuera del smooth-wrapper) -->
  
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div data-speed="0.8" className="pointer-events-none">
        <BackgroundCanvas />
      </div>
      <main className="relative z-10 flex-1 w-full">
        <section id="inicio" className="min-h-screen flex flex-col justify-center p-8 pt-24"><Inicio /></section>
        <section id="stack" className="min-h-screen flex flex-col justify-center p-8 pt-24"><HabilidadesTecnicas /></section>
        <section id="soft-skills" className="min-h-screen flex flex-col justify-center p-8 pt-24"><HabilidadesSociales /></section>
        <section id="proyectos" className="min-h-screen flex flex-col justify-center p-8 pt-24"><Proyectos /></section>
        <section id="certificaciones" className="min-h-screen flex flex-col justify-center p-8 pt-24"><Certificaciones /></section>
        <section id="contacto-seguro" className="min-h-screen flex flex-col justify-center p-8 pt-24"><ContactoSeguro /></section>
      </main>
      <Footer />
    </div>
  </div>
</div>
```

### 6.3 HabilidadesTecnicas (`src/components/HabilidadesTecnicas.jsx` & `HabilidadesTecnicas.css`)

Sección estructurada bajo el concepto **Folder Stack** (Carpetas de Habilidades), una arquitectura jerárquica Padre-Hijo en dos niveles:

```
+------------------------------------------------------------------------------------+
|                         ARQUITECTURA DE CARPETAS (PADRE-HIJO)                      |
+------------------------------------------------------------------------------------+
| VISTA GENERAL: Grid 3D Skewed de Carpetas  -->  VISTA EXPANDIDA: Sub-box Grid     |
| (Contador + Messy Folder Peek + Abanico)         (Tarjetas + React Portal Modal)   |
+------------------------------------------------------------------------------------+
```

1. **Jerarquía Z-Index (Sandwich Technique):**
   - **Capa 0 (`z-index: 0`):** Pseudo-elementos `::before` y `::after` para degradados monocromáticos plata/carbón (`#171717` a `#d4d4d4`) con posicionamiento porcentual `left: 25%`.
   - **Capa 1 (`z-index: 1`):** `<span>` para destellos y reflexiones flotantes de cristal.
   - **Capa 2 (`z-index: 10`):** Contenedor absoluto de iconos de previsualización (`pointer-events-none`). Renderiza los 3 primeros iconos (`.slice(0, 3)`) de la categoría activa.
   - **Capa 3 (`z-index: 20`):** Tarjeta frontal `.content` (`relative z-20 bg-neutral-950/88 backdrop-blur-md border border-white/10`).
2. **Física Messy Folder Peek & Hover Fan-out:**
   - *Estado Base:* Iconos asomados de forma desfasada (`-rotate-12`, `rotate-6`, `rotate-12`).
   - *Estado Hover:* Despliegue en abanico proyectado hacia arriba (`-translate-y-24`, `-translate-y-28`) con escala 1.1x y opacidad al 100%.
3. **Bóveda de Íconos Vectoriales Purificados:** SVG monocromáticos con `fill="currentColor"` e intensidades de `fillOpacity` multinivel (`0.1` a `0.8`).
4. **Expansión y Modal Holográfico vía Portal:**
   - La selección de carpeta despliega la cuadrícula `.sub-box` con animación en cascada (`stagger: 0.08s`).
   - El clic en cualquier sub-tarjeta abre el modal detallado renderizado mediante `createPortal(<Modal />, document.body)`, aislándolo completamente del árbol transformado de `ScrollSmoother`.

### 6.4 Certificaciones (`src/components/Certificaciones.jsx` & `Certificaciones.css`)

- **Carrusel Orbital Cilíndrico 3D:** Geometría tridimensional de 8 tarjetas distribuidas uniformemente en un anillo 3D:
  $$\text{Ángulo entre tarjetas } \Delta\theta = \frac{360^\circ}{8} = 45^\circ$$
  $$\text{Transformación CSS 3D: } \text{rotateY}(i \times 45^\circ) \cdot \text{translateZ}(330\text{px})$$
- **Estados HUD:** `state-0` (Orbital View 28s), `state-1` (Isometric View tilted $-14^\circ$), `state-2` (Pausa estática para lectura).

### 6.5 Contacto (`src/components/ContactoSeguro.jsx`)

- **Interfaz CLI Cyber Terminal (`secure_channel.exe`):** Consola estilo cristal Frosted Slate con prompts de terminal inmutables (`guest@vault:~/name$`).
- **Pipeline Async de Procesamiento:** Secuencia simulada de envío `./send_payload.sh` con salida de logs en tiempo real (TLS 1.3 handshake, encriptación AES-256-GCM, confirmación de hash CGRM-TX).

### 6.6 Footer (`src/components/Footer.jsx`)

- **Firma del Sistema:** Identificador `SYSTEM: SECURE // GIOVANNI REYES © 2026` en fuente monoespaciada con pulso luminoso en blanco puro.
- **Enlaces Profesionales Verificados:** Conexiones directas a GitHub y perfil público oficial de Credly (`https://www.credly.com/users/giovanni-reyes-medina`).
- **Cinemática GSAP:** Revelación con `autoAlpha: 0, y: 30 → autoAlpha: 1, y: 0`, `force3D: true` y `fastScrollEnd: true`.

---

## 7. Matriz de Auditoría y Resoluciones Técnicas (Sprints 1 & 2)

| ID | Pilar Auditado | Descripción del Problema | Solución Técnica Implementada | Estado |
|:---:|---|---|---|:---:|
| **BUG-04** | Layout / 3D | Clipping de SVGs Fan-Out por `overflow-x-hidden` en `section#stack`. | Removido `overflow-x-hidden` de `section#stack` en `App.jsx`; configurado `overflow-x: clip` global en `index.css`. | ✅ Resuelto |
| **BUG-01** | GSAP / React | Fuga de memoria en `useGSAP` por ausencias de `scope` y `dependencies`. | Inyectado `{ scope: sectionRef, dependencies: [categoriaActiva] }` en `HabilidadesTecnicas.jsx`. | ✅ Resuelto |
| **GSAP-04** | GSAP / React | Tweens en `handleCloseModal` fuera del contexto de ciclo de vida GSAP. | Envuelto handler con `contextSafe` obtenido de `useGSAP`. | ✅ Resuelto |
| **BUG-05** | UI / Grid | Grid offset asimétrico por `left: 50px` e inverso en hover (`left: -20px`). | Sustituido por `left: 25%` simétrico, removido shift en hover y agregadas utilidades `justify-self-center mx-auto w-full`. | ✅ Resuelto |
| **TASTE-03** | Sistema Diseño | Inconsistencias cromáticas entre `DESIGN.md` y `ARCHITECTURE.md`. | Reescritos `DESIGN.md` y `design.json` forzando el Sistema Monocromático Absoluto. | ✅ Resuelto |
| **CONTENT-02**| Copywriting | Descripción imprecisa en Ciberseguridad (`SKL-01`). | Contextualizado a: *"Aplicación de teoría de autómatas para análisis de protocolos de red y fundamentos de criptografía."* | ✅ Resuelto |
| **CONTENT-07**| Integridad Datos| URL de Credly con sufijo atípico `/badges/credly`. | Corregida a URL oficial canónica: `https://www.credly.com/users/giovanni-reyes-medina`. | ✅ Resuelto |

---

*Fin del documento de Arquitectura del Sistema. Este estándar es de obligado cumplimiento para todo desarrollo o refactorización futura dentro del portafolio The Cyber Vault.*
