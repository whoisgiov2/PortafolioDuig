# Arquitectura del Sistema: The Cyber Vault

> **Documento Vivo de Ingeniería y Arquitectura de Software**  
> *Versión 3.0.0 — Rediseño Integral Cyber Vault Monocromático*  
> **Autor:** Carlos Giovanni Reyes Medina — *Software Architect & Cybersecurity Specialist*  
> **Estado:** Estándar de Producción / Activo

---

## 1. Visión General (The Cyber Vault)

El portafolio **The Cyber Vault** está concebido como un **ecosistema interactivo monocromático de alta seguridad**, enfocado en rendimiento extremo, precisión técnica y diseño editorial de alta gama (*High-End Visual & Industrial Design*).

Inspirado en la estética de terminales cibernéticas militares, gobernanza de datos y sistemas de encriptación de grado industrial, la arquitectura elimina cualquier elemento superfluo o color de acento estridente para centrarse en:

1. **Monocromatismo Absoluto:** Una paleta dominada por negro profundo (`#000000`), grises plata/carbón refinados y blanco puro radiante.
2. **Experiencia Cinemática a 60 FPS:** Animaciones orquestadas mediante la suite profesional de GSAP, logrando un desplazamiento con inercia física (*smooth scrolling*), micro-interacciones sutiles y profundidades tridimensionales.
3. **Persistencia Táctica y Jerarquía Editorial:** Uso riguroso de fuentes sans-serif masivas para titulares editoriales combinado con tipografía monoespaciada para insignias, metadatos y consolas de comandos.

### 1.1 Objetivos Arquitectónicos Clave

| Pilar | Descripción | Indicador Clave (KPI) |
|---|---|---|
| **Seguridad Conceptual** | Interfaz temática CLI y canal de comunicación simulado de transmisión encriptada. | Cero fugas visuales de diseño genérico; cumplimiento del estándar Cyber Vault. |
| **Rendimiento GPU** | Uso estricto de aceleración por hardware (`will-change`, `force3D`, `transform: translateZ(0)`). | Ejecución fluida a 60 FPS sostenidos sin jank ni caídas de frames durante el scroll. |
| **Composibilidad Reactiva** | Separación limpia de responsabilidades por componentes y desacoplamiento de animaciones con `useGSAP`. | Cero fugas de memoria (*memory leaks*) o ScrollTriggers huérfanos al desmontar. |
| **Accesibilidad & UX** | Navegación accesible por teclado (`:focus-visible`), atributos WAI-ARIA y soporte `prefers-reduced-motion`. | Cumplimiento total de contraste tipográfico y navegabilidad asistida. |

---

## 2. Stack Tecnológico

La arquitectura de software se apoya en una pila moderna de desarrollo web orientada a la máxima velocidad de renderizado, modularidad de componentes y control fino de animaciones vectoriales y 3D.

| Tecnología / Librería | Versión | Rol Arquitectónico |
|---|---|---|
| **React** | `^19.2.8` | Núcleo de la interfaz de usuario, gestión de estados reactivos y composición de componentes. |
| **Vite** | `^8.2.0` | Entorno de desarrollo, empaquetador ultrarrápido y servidor HMR de alta eficiencia. |
| **Tailwind CSS** | `^4.3.3` | Motor de estilos utilitarios de última generación para diseño atómico y responsivo. |
| **GSAP (GreenSock)** | `^3.15.0` | Motor de animación principal para física cinemática, transformaciones 3D y timelines. |
| **GSAP ScrollTrigger** | `^3.15.0` | Orquestación de animaciones cinemáticas enlazadas dinámicamente a la posición del scroll. |
| **GSAP ScrollSmoother** | `^3.15.0` | Sistema de inercia física global y efectos parallax (*smooth scroll*). |
| **@gsap/react (`useGSAP`)** | `^2.1.2` | Hook oficial para la integración segura del ciclo de vida y limpieza de contextos GSAP en React. |
| **GSAP SplitText** | `^3.15.0` | Fragmentación tipográfica atómica en palabras/caracteres para revelaciones vectoriales. |
| **React DOM (`createPortal`)** | `^19.2.8` | Teletransportación de modales holográficos al árbol raíz del DOM fuera del contenedor de ScrollSmoother. |

---

## 3. Reglas de Diseño (Design System)

### 3.1 Paleta Cromática (Estricto Monocromo Absoluto)

El sistema prohíbe taxativamente el uso de colores vivos (rojos, verdes, azules, etc.), operando exclusivamente en una escala monocromática refinada de alto contraste:

| Código / Tono | Valor Hex / RGBA | Aplicación en la Interfaz |
|---|---|---|
| **Negro Absoluto** | `#000000` | Fondo base del canvas, `body`, contenedores raíz y velos de contraste. |
| **Carbón Profundo** | `#0a0a0a` / `#121212` / `#171717` | Fondos de tarjetas Frosted Slate, modales y consolas de comandos. |
| **Gris Carbón Medio** | `#262626` / `#404040` | Bordes inactivos, divisores de sección y trazados de componentes. |
| **Gris Plata Neutral** | `#525252` / `#737373` / `#a3a3a3` | Textos secundarios, descripciones técnicas y etiquetas inactivas. |
| **Gris Plata Claro** | `#d4d4d4` / `#e5e5e5` | Subtítulos monoespaciados, caracteres cipher y estados hover. |
| **Blanco Puro** | `#ffffff` | Tipografía principal, títulos masivos, reflectividad de tarjetas y halos. |
| **Spotlight / Glow** | `rgba(255, 255, 255, 0.15)` | Resplandores radiales por mouse-tracking y halos holográficos. |

### 3.2 The Monospace Scope Rule

Toda información técnica, insignias de estado, identificadores únicos (`SKL-01`, `CERT-RHSA1`, `PRJ-001`), metadatos de categoría, marcas de tiempo, prompts de consola y terminales CLI **deben renderizarse obligatoriamente** en fuente monoespaciada (`font-mono`, `Menlo`, `Roboto Mono`), utilizando:
- Tipografía en miniatura u 11px uppercase (`text-[9px]` a `text-xs`).
- Espaciado tipográfico expandido (`tracking-[0.25em]` a `tracking-[0.4em]`).
- Encapsulamiento en píldoras con borde translúcido (`border border-white/15 bg-white/[0.03]`).

### 3.3 Materiales: Frosted Slate (Glassmorphism Oscuro)

El material estructurador del portafolio es **Frosted Slate**, una superficie de cristal oscuro industrial compuesta por:
- **Fondo translúcido:** `rgba(18, 18, 18, 0.85)` o `bg-neutral-950/95`.
- **Filtro de desenfoque de fondo:** `backdrop-filter: blur(24px)` o `backdrop-blur-2xl`.
- **Bordes incandescentes sutiles:** `border border-white/10` o `border-white/20`.
- **Iluminación volumétrica:** `shadow-[0_0_50px_rgba(0,0,0,0.9)]` combinada con halos interactivos de luz blanca en hover (*Spotlight Rule*).

---

## 4. Arquitectura de Componentes Core

### 4.1 BootAnimation (`src/components/BootAnimation.jsx`)

Cinemática de arranque inmersiva que simula un proceso de autenticación y desencriptación cibernética en 4 fases orquestadas mediante una línea de tiempo GSAP (`gsap.timeline()`):

```
+-----------------------------------------------------------------------------------+
|                            SECUENCIA DE ARRANQUE GSAP                             |
+-----------------------------------------------------------------------------------+
| 1. Emerge Vectorial  -->  2. Security Cipher  -->  3. Scatter Exit  --> 4. Unmount |
|    (Blur + Scatter 3D)    (Monospace Scramble)    (Magnetic Blur)    (React Clear)|
+-----------------------------------------------------------------------------------+
```

- **Fase 1 (Emerge Vectorial 3D):** Los caracteres de *"Bienvenido/a a mi portafolio"* vuelan hacia su posición original desde coordenadas aleatorias del viewport (`x: ±70vw`, `y: ±70vh`, `scale: 1.8→2.5`, `rotationZ: ±90°`) con `filter: blur(16px)` y `ease: expo.out` en `1.6s`.
- **Fase 2 (Security Cipher Scramble):** Transición mediante **The Monospace Scope Rule** a `font-mono text-neutral-400`. Un intervalo de 40ms reemplaza dinámicamente cada carácter por símbolos de cifrado (`0, 1, #, %, X, @, !, *, &`) durante 1.0 segundo con resplandor `textShadow: 0 0 20px rgba(255,255,255,0.4)`.
- **Fase 3 (Magnetic Blur Scatter Exit):** Disparo magnético asimétrico hacia las esquinas externas (`x/y ±120vw/vh`, `rotationZ: ±120°`, `scale: 0.3`, `blur(16px)`) con `ease: expo.in`.
- **Fase 4 (Desmonte Limpio):** Desvanecimiento del telón de fondo (`opacity: 0`, `pointerEvents: 'none'`) en 0.5s y ejecución inmediata de `onComplete()` para desmontar el componente del estado global `isBooting`.

### 4.2 App.jsx (`src/App.jsx`)

Orquestador principal que implementa la estructura estricta requerida por GSAP `ScrollSmoother`:

```html
<div className="min-h-screen bg-black text-white">
  <CustomCursor />
  {isBooting && <BootAnimation onComplete={() => setIsBooting(false)} />}
  <Navbar /> <!-- Posicionamiento Fijo (Fuera del smooth-wrapper) -->
  
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div data-speed="0.8">
        <BackgroundCanvas />
      </div>
      <main>
        <section id="inicio"><Inicio /></section>
        <section id="habilidades-tecnicas"><HabilidadesTecnicas /></section>
        <section id="habilidades-sociales"><HabilidadesSociales /></section>
        <section id="proyectos"><Proyectos /></section>
        <section id="certificaciones"><Certificaciones /></section>
        <section id="contacto-seguro"><ContactoSeguro /></section>
      </main>
      <Footer />
    </div>
  </div>
</div>
```

- **ScrollSmoother Integration:** Configurado mediante `useGSAP` sobre `#smooth-wrapper` y `#smooth-content` con `smooth: 1.5`, `effects: true` y `normalizeScroll: true`.
- **Efectos Parallax:** Los elementos marcados con `data-speed` (ej. `BackgroundCanvas` a `0.8`, encabezados a `1.1`) calculan automáticamente desplazamientos diferenciales en relación a la inercia del scroll.

### 4.3 HabilidadesTecnicas (`src/components/HabilidadesTecnicas.jsx` & `HabilidadesTecnicas.css`)

Sección rediseñada bajo el concepto **Folder Stack** (Carpetas de Habilidades), una arquitectura jerárquica Padre-Hijo en dos niveles:

```
+------------------------------------------------------------------------------------+
|                         ARQUITECTURA DE CARPETAS (PADRE-HIJO)                      |
+------------------------------------------------------------------------------------+
| VISTA GENERAL: Grid 3D Skewed de Carpetas  -->  VISTA EXPANDIDA: Sub-box Grid     |
| (Contador + Messy Folder Peek + Abanico)         (Tarjetas + React Portal Modal)   |
+------------------------------------------------------------------------------------+
```

1. **Jerarquía Z-Index (Sandwich Technique):**
   Dentro de cada contenedor de portada `.box` (`overflow: visible`), las capas se organizan de forma estricta:
   - **Capa 0 (`z-index: 0`):** Pseudo-elementos `::before` y `::after` para degradados monocromáticos plata/carbón (`#171717` a `#d4d4d4`) y sombras con desenfoque de fondo.
   - **Capa 1 (`z-index: 1`):** `<span>` para destellos y reflexiones flotantes de cristal.
   - **Capa 2 (`z-index: 10`):** Contenedor absoluto de iconos de previsualización (`pointer-events-none`). Renderiza de forma dinámica los 3 primeros iconos (`.slice(0, 3)`) de la categoría activa.
   - **Capa 3 (`z-index: 20`):** Tarjeta frontal `.content` (`relative z-20 bg-black/80 backdrop-blur-md border border-white/10`). Actúa como cristal frontal que tapa parcialmente los iconos.

2. **Física Messy Folder Peek (Estado Base y Hover Fan-out):**
   - **Estado Base (Desorden Orgánico):** Los 3 iconos vectoriales de previsualización se muestran **visibles en todo momento**, asomándose de manera desalineada y desfasada por encima de la tarjeta frontal:
     - *Icono 0 (Izq):* `-translate-x-4 -translate-y-10 -rotate-12 opacity-60`
     - *Icono 1 (Centro):* `-translate-y-14 rotate-6 opacity-80 z-[11]`
     - *Icono 2 (Der):* `translate-x-6 -translate-y-8 rotate-12 opacity-60`
   - **Estado Hover (Fan-out Expandido):** Al pasar el cursor (`group-hover`), se proyectan hacia arriba en un abanico completo con opacidad al 100%:
     - *Icono 0 (Izq):* `-translate-x-14 -translate-y-24 -rotate-12 scale-110`
     - *Icono 1 (Centro):* `-translate-y-28 rotate-0 scale-110`
     - *Icono 2 (Der):* `translate-x-14 -translate-y-24 rotate-12 scale-110`

3. **Bóveda de Íconos Vectoriales Purificados:**
   Cada componente SVG utiliza `fill="currentColor"` o `fillOpacity` multinivel, garantizando adaptación estricta al tema monocromático:
   - `CiberseguridadIcon`: Escudo cibernético multicapa con profundidades `fillOpacity="0.4"`, `0.3`, `0.1` y `0.8`.
   - `WildcardIcon`: Hexágono geométrico simétrico (utilizado como fallback).
   - `FortinetIcon`: Logotipo oficial purificado de Fortinet.
   - `CiscoIcon`: Puente y marca denominativa oficial de Cisco con fondo circular de cristal (`fillOpacity="0.05"`).
   - `PythonIcon`: Logotipo oficial purificado de Python.
   - `LinuxIcon`: Silueta detallada del pingüino Tux oficial purificada.
   - `BashIcon`: Terminal hexagonal multicapa con prompt `$` en opacidad total.
   - `ReactIcon`: Estructura orbital atómica oficial de React.
   - `NodeIcon`: Estructura hexagonal N de Node.js purificada.
   - `TypstIcon`: Logotipo oficial de Typst en 5 trazados de alta resolución.

4. **Expansión y Modal Holográfico:**
   - Al seleccionar una carpeta, actualiza `categoriaActiva`, desplegando la cuadrícula secundaria de tarjetas `.sub-box` con animación en cascada orquestada mediante GSAP `useGSAP` (`y: 40 → 0`, `stagger: 0.08s`).
   - Al hacer clic en cualquier `.sub-box`, abre el modal holográfico detallado renderizado vía React Portal (`createPortal`) al `document.body`, mostrando la insignia del skill, el ícono vectorial específico y la cinemática de progreso (`width: 0% → progress%`).

### 4.4 Certificaciones (`src/components/Certificaciones.jsx` & `Certificaciones.css`)

- **Carrusel Orbital Cilíndrico 3D:** Basado en la geometría tridimensional de 8 tarjetas exactas distribuidas uniformemente en un anillo 3D:
  $$\text{Ángulo entre tarjetas } \Delta\theta = \frac{360^\circ}{8} = 45^\circ$$
  $$\text{Transformación CSS 3D: } \text{rotateY}(i \times 45^\circ) \cdot \text{translateZ}(330\text{px})$$
  Esto garantiza $39\text{px}$ de espacio libre entre tarjetas adyacentes, previniendo solapamientos o distorsiones visuales.

- **Estados de Escena HUD:**
  
  | Estado | Nombre | Animación CSS | Comportamiento del Usuario |
  |---|---|---|---|
  | `state-0` | **ORBITAL VIEW** | `ringFlat` (28s loop) | Rotación continua en plano horizontal. Clic en fondo inclina la vista. |
  | `state-1` | **ISOMETRIC VIEW** | `ringTilted` (20s loop) | Inclinación de $-14^\circ$ en el eje X con rotación 3D acelerada. |
  | `state-2` | **LECTURA ESTÁTICA** | `animation-play-state: paused` | Pausa total del carrusel; despliega descripciones en texto para lectura detenida. |

- **Modal de Enfoque 2D:** Al seleccionar una tarjeta 3D, la escena espacial se atenúa y desenfoca (`opacity: 0.12`, `filter: blur(8px)`) mientras emerge un modal 2D monocromático con datos verificados y enlace a Credly.

### 4.5 Contacto (`src/components/ContactoSeguro.jsx`)

- **Interfaz CLI Cyber Terminal (`secure_channel.exe`):** Ventana estilo sistema operativo de cristal Frosted Slate (`bg-neutral-950/95 backdrop-blur-2xl border border-white/15`) con botones de control plata y cabecera de consola.
- **Prompts CLI Inmutables:** Los campos tradicionales se sustituyen por prompts de terminal (`guest@vault:~/name$`, `guest@vault:~/email$`, `guest@vault:~/subject$`, `guest@vault:~/message$`).
- **Pipeline de Procesamiento y Logs en Tiempo Real:** Al hacer submit de `./send_payload.sh`, se dispara una secuencia asíncrona que imprime logs progresivos en la consola:
  1. `$ ./send_payload.sh --target=CGRM_VAULT`
  2. `> [0.001s] Initiating TLS 1.3 handshake with host node...`
  3. `> [0.042s] Encrypting payload buffer (AES-256-GCM)...`
  4. `> [0.118s] Establishing encrypted zero-trust tunnel...`
  5. `> [0.245s] Transmission verified. Data block written.`
  6. `> [0.312s] Confirmation Hash: CGRM-TX-[HASH]`
  7. `> [0.420s] Payload delivered successfully.`

### 4.6 Footer (`src/components/Footer.jsx`)

- **Firma del Sistema Minimalista:** Renderizado de `SYSTEM: SECURE // GIOVANNI REYES © 2026` en fuente monoespaciada con indicador de pulso luminoso en blanco puro.
- **Enlaces Profesionales:** Conexiones a GitHub y Credly en blanco puro con subrayado animado de izquierda a derecha (`scale-x: 0 → scale-x: 1`).
- **Cinemática GSAP ScrollTrigger:** Revelación con `opacity: 0, y: 30 → opacity: 1, y: 0`, `force3D: true` y `fastScrollEnd: true` activada al llegar al 95% del fondo del sitio.

---

## 5. Directrices de Rendimiento y Buenas Prácticas de Ingeniería

| Directriz de Ingeniería | Implementación Técnica | Razón y Beneficio de Rendimiento |
|---|---|---|
| **Aceleración por Hardware GPU** | `force3D: true`, `will-change: transform, opacity`, `transform: translateZ(0)` | Promueve los elementos a capas de composición independientes en la GPU, manteniendo 60 FPS estables sin jank de pintado. |
| **Uso de `autoAlpha` en GSAP** | `gsap.from(el, { autoAlpha: 0 })` en lugar de `opacity: 0` | `autoAlpha` conmuta automáticamente `visibility: hidden` cuando `opacity` es 0, previniendo eventos pointer fantasma y reduciendo costos de renderizado. |
| **Limpieza de Recursos (Memory Cleanup)** | `useGSAP(() => { ... })` o `gsap.context()` con `ctx.revert()` / `tl.kill()` | Limpia eventos, observers y ScrollTriggers al desmontar componentes React, eliminando fugas de memoria (*memory leaks*). |
| **Aislamiento DOM con React Portals** | `createPortal(<Modal />, document.body)` | Aísla modales y overlays del contenedor transformado `#smooth-content`, evitando distorsiones de posicionamiento `fixed` o recortes por `overflow`. |
| **Scroll Nativo vs Inercia Controlada** | Delegación de scroll a `html, body` con `ScrollSmoother.create()` | Preserva la accesibilidad y el comportamiento predictivo del scroll nativo mientras se aplica inercia mediante GSAP. |
| **Accesibilidad al Movimiento** | `@media (prefers-reduced-motion: reduce)` | Cancela animaciones extensas y transiciones para usuarios con preferencias de movimiento reducido en el sistema operativo. |
