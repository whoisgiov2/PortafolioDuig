---
name: Carlos Giovanni Reyes Medina Portfolio
description: Personal Cybersecurity & Software Engineering Portfolio - Strict Monochromatic Cyber Vault
colors:
  primary: "#ffffff"
  secondary: "#d4d4d4"
  alert: "#a3a3a3"
  neutral-bg: "#000000"
  neutral-surface: "#171717"
  neutral-text: "#e2e8f0"
  neutral-muted: "#94a3b8"
  glass-border: "rgba(255, 255, 255, 0.1)"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: "1.1"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: "1.25"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.75"
  label:
    fontFamily: "Menlo, Roboto Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 300
    letterSpacing: "0.2em"
rounded:
  sm: "4px"
  md: "16px"
  lg: "28px"
  xl: "32px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "80px"
components:
  button-nav:
    backgroundColor: "rgba(23, 23, 23, 0.4)"
    textColor: "#a3a3a3"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  button-nav-hover:
    backgroundColor: "rgba(38, 38, 38, 0.6)"
    textColor: "#ffffff"
  button-submit:
    backgroundColor: "rgba(30, 41, 59, 0.9)"
    textColor: "#f1f5f9"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 32px"
  card-section:
    backgroundColor: "rgba(23, 23, 23, 0.6)"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.xl}"
    padding: "32px"
---

# Design System: Carlos Giovanni Reyes Medina Portfolio (Cyber Vault)

## Overview

**Creative North Star: "The Cybernetic Terminal Vault"**

The design system projects a high-discipline cybersecurity environment. It combines an authentic terminal boot atmosphere with sleek dark glassmorphism, dynamic matrix text scrambling, and glowing silver/white laser borders. The interface operates in an **Absolute Monochromatic System**, eliminating chromatic accent colors to highlight technical projects, certifications, and security engineering capabilities.

Every interactive section acts as a secure enclosure mounted over an abyssal black backdrop (`#000000`). Ambient background elements—including morphing glass bubbles and a floating digital void grid—give the impression of a living system operating in real-time.

**Key Characteristics:**
- Strict dark-mode palette rooted in pure void black, charcoal slates, and radiant pure white accents.
- Monospace CLI accents for navigation, status indicators, and prompt text.
- High-blur glassmorphic containers (`backdrop-blur-2xl`, `backdrop-blur-xl`) bounded by fine white glass borders (`rgba(255, 255, 255, 0.1)`).
- Interactive white laser edge-glows and scramble text transitions on state change.

## Colors

The palette derives from tactical CLI consoles and high-contrast night-operation displays, operating strictly in a **Monochromatic Absolute (Grayscale, Pure White & Void Black)** scheme.

### Primary & Accent Spectrum
- **Radiant Pure White** (`#ffffff`): Used for primary headlines, active navigation states, high-priority vector icons, and spotlight highlights.
- **Silver Slate** (`#d4d4d4` / `#e5e5e5`): Highlights sub-navigation, monospace identifiers, cipher accents, and hover states.
- **Charcoal Slate** (`#171717` / `#262626`): Surface containers, Frosted Slate cards, and modal backdrops.

### Neutral Base
- **Void Black** (`#000000`): The primary page canvas background (`html { background: #000; }`).
- **Frosted Slate Fill** (`#0a0a0a` / `#121212`): Background fill for main glass containers and floating navigation buttons.
- **Muted Silver** (`#737373` / `#a3a3a3`): Subheadings, section metadata labels, and inactive state indicators.
- **Glass Border White** (`rgba(255, 255, 255, 0.1)` to `0.4`): Standard stroke for container outlines and hover reflections.

### Named Rules
**The Absolute Monochromatic Rule.** No chromatic colors (greens, blues, reds) are permitted. Visual hierarchy is established strictly through font weight, letter-spacing, opacity levels, and contrast between `#000000`, `#171717`, `#a3a3a3`, and `#ffffff`.
**The High Contrast Guardrail.** Body text must always maintain maximum contrast (`#ffffff` or `#e2e8f0` over `#171717`/`#000000`) without bright background flashes.

## Typography

**Display Font:** Inter (with `system-ui, -apple-system, sans-serif` fallback)
**Body Font:** Inter (with `system-ui, -apple-system, sans-serif` fallback)
**Label/Mono Font:** Menlo, Roboto Mono, monospace

**Character:** Technical, crisp, and readable. Monospace font handles tactical navigation and terminal prompts, while clean sans-serif handles primary titles and content reading.

### Hierarchy
- **Display** (Bold 700, `clamp(2rem, 5vw, 3.75rem)`, line-height 1.1): Hero title (`Carlos Giovanni Reyes Medina`) with character scrambling animation.
- **Headline** (SemiBold 600, `1.875rem` / `30px`, line-height 1.25): Main section titles (`Habilidades Técnicas`, `Proyectos Destacados`, `Contacto Seguro`).
- **Title** (SemiBold 600, `1.25rem` / `20px`, line-height 1.4): Card headings and technology item titles.
- **Body** (Regular 400, `0.875rem` / `14px`, line-height 1.75): Philosophical statements, project summaries, and tool descriptions.
- **Label** (Light 300 / Monospace, `0.75rem` / `12px`, letter-spacing `0.2em` / `0.45em` uppercase): Navigation buttons (`INICIO`, `STACK`, `PROYECTOS`), section metadata badges, and form labels.

### Named Rules
**The Monospace Scope Rule.** Monospace typography is strictly reserved for header pills, status labels, code badges, and terminal text. Body text must remain clean sans-serif.

## Layout

The spatial model centers content inside a high-density viewport container (`max-w-5xl` / `max-w-7xl`).

- **Grid & Alignment:** Sections are stacked vertically with generous spacing (`gap-20` / `space-y-20`). Each section spans `min-h-screen` centered both vertically and horizontally.
- **Responsive Behavior:** 1-column mobile layouts expand to 2-column (`sm:grid-cols-2`) and 3-column (`xl:grid-cols-3`) grids on desktop viewports using CSS Grid utilities.
- **Floating Navigation:** Header nav is fixed to the top viewport (`top-6 left-1/2 -translate-x-1/2 z-[100]`) as a horizontal bar of pill buttons.

## Elevation & Depth

**Laser & Spotlights Philosophy:** Depth is established using deep backdrop blur (`backdrop-blur-2xl`), semi-transparent dark slate cards, ambient drop shadows (`shadow-[0_30px_120px_-80px_rgba(0,0,0,0.9)]`), and dynamic silver/white laser edge-glows.

### Shadow & Glow Vocabulary
- **Ambient Abyssal Shadow** (`shadow-[0_30px_120px_-80px_rgba(0,0,0,0.9)]`): Heavy diffuse drop shadow under major section containers.
- **Laser Edge Gradient** (`linear-gradient(90deg, #fff0, #fffa, #fff, #fff0)`): Animated border strokes on certification cards and spotlight cards.
- **Radial Light Spotlight** (`radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 35%)`): Subtle glow spotlight appearing over cards on hover.

### Named Rules
**The Laser Spotlight Rule.** Cards remain subtle and dark at rest. Laser border highlights and radial light beams ignite strictly upon hover or focus.

## Shapes

- **Section Containers:** Soft rounded corners (`rounded-[32px]` / `32px`).
- **Feature Cards:** Smooth rounded enclosures (`rounded-[28px]` / `28px`).
- **Form Inputs & Submit Buttons:** Medium rounded corners (`rounded-2xl` / `16px`).
- **Navigation Pills:** Full pill silhouette (`rounded-full` / `9999px`).
- **Terminal CLI Window:** Slightly rounded top and bottom corners (`border-radius: 5px`).

## Components

### Navigation Button (`.ui-btn`)
- **Shape:** Full pill (`border-radius: 9999px`)
- **Background:** Dark slate frosted glass (`rgba(23, 23, 23, 0.4)` with `backdrop-filter: blur(8px)`).
- **Text & Border:** Light monospace font (`0.75rem`, `300` weight, `letter-spacing: 0.2em`), white glass border (`1px solid rgba(255, 255, 255, 0.05)`).
- **Hover / Focus State:** Background darkens (`rgba(38, 38, 38, 0.6)`), text turns pure white (`#ffffff`), and text undergoes a scramble glitch effect (`@keyframes chitchat`).

### Section Container Card
- **Shape:** Rounded corners (`rounded-[32px]`)
- **Background:** Frosted glass slate (`bg-neutral-900/60` with `backdrop-blur-2xl`).
- **Border & Shadow:** 1px white glass border (`border border-white/10`), deep ambient shadow (`shadow-[0_30px_120px_-80px_rgba(0,0,0,0.9)]`).

### Technology & Project Feature Card
- **Shape:** Rounded corners (`rounded-[28px]`)
- **Background:** Subtle white glass tint (`bg-white/5` with `backdrop-blur-xl`).
- **Hover State:** Translates upward (`hover:-translate-y-1`), background brightens (`hover:bg-white/10`), and border outline sharpens (`hover:border-white/20`).

### Interactive Form Fields (`ContactoSeguro.jsx`)
- **Style:** Dark obsidian fill (`bg-neutral-950/80`), 1px white glass border (`border-white/10`), slate text (`text-neutral-100`), rounded (`rounded-2xl`).
- **Focus:** Sharp border shift (`focus:border-white/40`), soft focus ring (`focus:ring-2 focus:ring-white/20`).

### Terminal CLI Boot Window (`BootAnimation.jsx`)
- **Style:** Classic terminal header toolbar with control buttons (monochromatic silver/gray controls), monospace font, pure white prompt (`$`), and animated typewriter cipher scramble.

## Do's and Don'ts

### Do:
- **Do** preserve dark mode strictly across all pages (`color-scheme: dark`, `#000000` body background).
- **Do** use ultra-fine 1px white glass borders (`border-white/10` or `rgba(255, 255, 255, 0.1)`) to demarcate containers.
- **Do** reserve monospace typography for navigation pills, terminal windows, labels, and status badges.
- **Do** incorporate subtle scramble text glitches or laser spotlight glows on interactive element hover.

### Don't:
- **Don't** introduce bright white or light-colored full-page backgrounds.
- **Don't** use solid saturated neon or chromatic fills (green, cyan, red) on buttons or cards; preserve translucent dark glass and pure white/silver highlights.
- **Don't** mix non-monospace fonts inside terminal components or navigation pills.
- **Don't** remove backdrop blur (`backdrop-blur-2xl` / `backdrop-blur-xl`) from floating content cards.
