# Portafolio Técnico de Ciberseguridad — Carlos Giovanni Reyes Medina

Portafolio web modular de una sola página enfocado en **Seguridad Defensiva, Gobierno de Accesos (IAM), Gestión de Cambios (RFC), Redes Perimetrales y Automatización**, diseñado bajo una estética editorial *Draft* limpia, responsiva y de alto contraste.

Desarrollado en **HTML5, CSS3 modular y JavaScript clásico sin dependencias externas** (`window.DraftPortfolio`), compatible tanto con apertura directa local (`file://`) como mediante servidor web (`http://` / `https://`).

---

## Secciones del Portafolio

1. **01 · Perfil & Enfoque Defensivo (`#perfil`)**
   - **Resumen operativo:** Estudiante de 3er año de la **Licenciatura en Seguridad en TI (UANL)** en Escobedo, Nuevo León, México, con comunicación en **Español (Nativo)** e **Inglés (Nivel B2+)**.
   - **Experiencia relevante:**
     - *Casas Javer S.A. de C.V.* — Seguridad de Accesos IAM (conciliación y detección de cuentas inactivas post-*offboarding* en Python), normalización de inventario de activos de TI y evaluación de solicitudes de cambio (**RFC**) con mínimo privilegio en la migración a Microsoft Planner.
     - *Preparatoria #25 — UANL* — Asesor Académico Especializado enfocado en razonamiento lógico, rigor técnico y documentación de procedimientos.
   - **Capacidades técnicas:** 5 bloques funcionales (`SOC / SIEM / EDR`, `Seguridad Perimetral`, `Redes & Segmentación`, `Sistemas & Scripting`, `Gobierno de TI & Idiomas`).
   - **Widget de CV:** Animación completa de descarga directa en PDF (`Blob` desde binario codificado en `scripts/data/cv-binary.js`) sin interrumpir la transición visual y con apertura posterior en una pestaña nueva.

2. **02 · Proyectos & Laboratorios Técnicos (`#proyectos`)**
   - 4 proyectos filtrables por categoría (`Todos`, `IAM & Gobierno`, `Redes & Perímetro`, `Seguridad Defensiva`):
     - *Auditoría IAM y Conciliación de Accesos con Python*
     - *Gobierno de Activos, RFC y Migración Segura*
     - *Infraestructura y Seguridad Perimetral (Cisco Packet Tracer — UANL)*
     - *Herramienta Forense y de Auditoría de Procesos*
   - Enlace directo al perfil y repositorios en GitHub (`@whoisgiov2`).

3. **03 · Certificaciones & Ticket 3D Credly (`#certificaciones`)**
   - Catálogo de **8 certificaciones** con insignias oficiales en PNG (y respaldo vectorial SVG para Google Cybersecurity Professional).
   - **Ticket 3D manipulable 360°:** Al seleccionar cualquier tarjeta se despliega una credencial tridimensional interactiva que rota libremente sobre los ejes X/Y mediante arrastre con mouse, pantalla táctil (`Pointer Events`) o flechas del teclado:
     - **Cara frontal:** Insignia oficial, emisor, dominio técnico, habilidades clave y código de barras.
     - **Cara trasera:** Criterios de emisión, competencias acreditadas, copiado rápido de UUID/Badge ID y enlace directo de verificación oficial en Credly/Coursera.

4. **04 · Contacto Seguro (`#contacto`)**
   - Copiado en un clic de correo electrónico y ficha profesional resumida.
   - Tarjeta de **LinkedIn mediante Código QR** (`assets/QR_CGRM_LK.jpeg`) con botón para ampliar el lector.
   - Compositor isométrico de 5 niveles con validación, sanitización local y envío transparente vía `mailto:` o copiado estructurado, sin analítica externa ni envíos silenciosos.

---

## Certificaciones Incluidas

| Folio | Certificación | Emisor | Verificación oficial |
| :---: | :--- | :--- | :--- |
| `01` | Red Hat System Administration I (RH124 - RHA) - Ver. 9.3 | Red Hat | [Credly](https://www.credly.com/badges/3fc123bb-1f03-4f52-be7e-37236039fb44/public_url) |
| `02` | Fortinet Certified Fundamentals Cybersecurity | Fortinet | [Credly](https://www.credly.com/badges/a74b8068-587b-4bf0-b551-a88bd64a80be/public_url) |
| `03` | Google Cybersecurity Professional | Google | [Coursera](https://www.coursera.org/verify/) |
| `04` | Fortinet NSE 1 Certified in Cybersecurity | Fortinet | [Credly](https://www.credly.com/badges/237cb830-a29d-4f9e-bf54-239e6d8a5afe/public_url) |
| `05` | Fortinet NSE 2 Certified in Cybersecurity | Fortinet | [Credly](https://www.credly.com/badges/c2987319-0a45-4cc8-8f7c-002b768c699c/public_url) |
| `06` | Getting Started in Cybersecurity 3.0 | Fortinet | [Credly](https://www.credly.com/badges/e1a73752-3840-4d73-b278-a6eac8b7cbc3/public_url) |
| `07` | Introduction to the Threat Landscape 3.0 | Fortinet | [Credly](https://www.credly.com/badges/9ecd5d53-b75f-41d7-aa81-3355bc49a64b/public_url) |
| `08` | Technical Introduction to Cybersecurity 2.0 | Fortinet | [Credly](https://www.credly.com/badges/1697c3a4-ca5d-481d-b079-ff4ff5031960/public_url) |

---

## Estética *Draft*, Accesibilidad y Seguridad

- **Paleta cromática controlada:**
  - Superficies tierra: `#EBE2CC`, `#DED6C1`, `#CFC6B1`, `#B7B09E`
  - Acentos salvia: `#E6F2DD`, `#B1D3B9`, `#88BDA4`, `#659287`
  - Tintas de alto contraste: `#24211A`, `#3A352B`, `#50493C`, `#1B2E29`, `#29463E`, `#375B51`
- **Coreografía y accesibilidad:** Animaciones independientes por bloque (`[data-draft-item]`), soporte de teclado completo en modales y tarjetas, y respeto estricto a `prefers-reduced-motion`.
- **Endurecimiento HTTP (`_headers`):**
  - `Content-Security-Policy` restrictiva (`default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none'`)
  - `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, `Permissions-Policy`, `Cross-Origin-Opener-Policy` y `Cross-Origin-Resource-Policy`.

---

## Estructura del Proyecto

```text
.
├── .gitignore
├── _headers
├── index.html
├── README.md
├── assets/
│   ├── CV_Carlos_Giovanni_Reyes_Medina.pdf
│   ├── QR_CGRM_LK.jpeg
│   ├── blob.png
│   ├── funcyb.png
│   ├── NSE1.png
│   ├── NSE2.png
│   ├── STR3.png
│   ├── TECINCY2.png
│   └── THL3.png
├── scripts/
│   ├── build.py
│   ├── main.js
│   ├── data/
│   │   ├── cv-binary.js
│   │   └── portfolio-data.js
│   └── modules/
│       ├── cert-ticket.js
│       ├── contact-security.js
│       ├── cv-download.js
│       ├── icons.js
│       ├── loader.js
│       ├── render-sections.js
│       └── scroll-choreography.js
└── styles/
    ├── base.css
    ├── cert-ticket.css
    ├── components.css
    ├── cv-download.css
    ├── github-btn.css
    ├── iso-form.css
    ├── layout.css
    ├── loader.css
    ├── motion.css
    └── tokens.css
```

---

## Ejecución Local y Mantenimiento

1. **Previsualización rápida:** Abre `index.html` directamente en el navegador o levanta un servidor estático local:
   ```bash
   python -m http.server 8000
   ```
2. **Actualizar el CV embebido (`scripts/data/cv-binary.js`)** después de reemplazar `assets/CV_Carlos_Giovanni_Reyes_Medina.pdf`:
   ```bash
   python scripts/build.py
   ```
3. **Generar paquete estático minificado opcional en `dist/`** (ignorado en Git por `.gitignore`):
   ```bash
   python scripts/build.py --bundle
   ```

---

## Contacto

- **GitHub:** [https://github.com/whoisgiov2](https://github.com/whoisgiov2)
- **Correo directo:** `giovanni.reyesamed@gmail.com`
