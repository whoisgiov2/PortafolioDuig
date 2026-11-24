#!/usr/bin/env python3
"""
Automatización del Portafolio Draft de Ciberseguridad:
  1. Sincroniza scripts/data/cv-binary.js desde assets/CV_Carlos_Giovanni_Reyes_Medina.pdf
     para garantizar descarga directa offline (file://) siempre actualizada.
  2. Consolida y compacta CSS/JS en dist/ para despliegue en producción (1 CSS + 1 JS),
     copiando assets/, _headers y vercel.json.

Uso:
  python scripts/build.py            # Sincroniza CV + genera paquete dist/
  python scripts/build.py --sync-cv  # Solo sincroniza scripts/data/cv-binary.js
"""

import argparse
import base64
import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_PATH = os.path.join(ROOT, 'assets', 'CV_Carlos_Giovanni_Reyes_Medina.pdf')
CV_BINARY_JS = os.path.join(ROOT, 'scripts', 'data', 'cv-binary.js')
DIST_DIR = os.path.join(ROOT, 'dist')

CSS_FILES = [
    'styles/tokens.css',
    'styles/base.css',
    'styles/layout.css',
    'styles/components.css',
    'styles/loader.css',
    'styles/github-btn.css',
    'styles/iso-form.css',
    'styles/cv-download.css',
    'styles/motion.css',
]

JS_FILES = [
    'scripts/data/portfolio-data.js',
    'scripts/data/cv-binary.js',
    'scripts/modules/icons.js',
    'scripts/modules/render-sections.js',
    'scripts/modules/loader.js',
    'scripts/modules/cv-download.js',
    'scripts/modules/scroll-choreography.js',
    'scripts/modules/contact-security.js',
    'scripts/main.js',
]


def sync_cv_binary():
    if not os.path.exists(PDF_PATH):
        raise FileNotFoundError(f'No se encontró el CV en: {PDF_PATH}')

    raw = open(PDF_PATH, 'rb').read()
    if not raw.startswith(b'%PDF'):
        raise ValueError('El archivo de CV no tiene cabecera PDF válida.')

    b64 = base64.b64encode(raw).decode('ascii')
    js_content = (
        "(function (global) {\n"
        "  'use strict';\n"
        "  const DraftPortfolio = (global.DraftPortfolio = global.DraftPortfolio || {});\n"
        "  // Generado automáticamente por scripts/build.py desde assets/CV_Carlos_Giovanni_Reyes_Medina.pdf\n"
        f"  DraftPortfolio.CV_BASE64 = '{b64}';\n"
        "})(window);\n"
    )

    with open(CV_BINARY_JS, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f'[OK] CV sincronizado: {len(raw)} bytes -> scripts/data/cv-binary.js')


def minify_css(css_text):
    # Elimina comentarios CSS y colapsa espacios conservando selectores y calc()
    text = re.sub(r'/\*.*?\*/', '', css_text, flags=re.S)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\s*([{};,>~])\s*', r'\1', text)
    text = re.sub(r':\s+', ':', text)
    text = text.replace(';}', '}')
    return text.strip()


def compact_js(js_text):
    # Compactación segura línea por línea (sin alterar strings, URLs https:// ni regex)
    out_lines = []
    for line in js_text.splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith('//'):
            continue
        out_lines.append(stripped)
    return '\n'.join(out_lines)


def build_dist():
    sync_cv_binary()

    if os.path.exists(DIST_DIR):
        shutil.rmtree(DIST_DIR)

    os.makedirs(os.path.join(DIST_DIR, 'styles'), exist_ok=True)
    os.makedirs(os.path.join(DIST_DIR, 'scripts'), exist_ok=True)

    # 1. Consolidar y minificar CSS
    css_chunks = []
    raw_css_size = 0
    for rel_path in CSS_FILES:
        content = open(os.path.join(ROOT, rel_path.replace('/', os.sep)), encoding='utf-8').read()
        raw_css_size += len(content.encode('utf-8'))
        css_chunks.append(minify_css(content))
    css_bundle = '\n'.join(css_chunks)
    css_out = os.path.join(DIST_DIR, 'styles', 'bundle.min.css')
    open(css_out, 'w', encoding='utf-8').write(css_bundle)

    # 2. Consolidar y compactar JS
    js_chunks = []
    raw_js_size = 0
    for rel_path in JS_FILES:
        content = open(os.path.join(ROOT, rel_path.replace('/', os.sep)), encoding='utf-8').read()
        raw_js_size += len(content.encode('utf-8'))
        js_chunks.append(compact_js(content))
    js_bundle = '\n'.join(js_chunks) + '\n'
    js_out = os.path.join(DIST_DIR, 'scripts', 'bundle.min.js')
    open(js_out, 'w', encoding='utf-8').write(js_bundle)

    # 3. Reescribir index.html para producción
    html_text = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()

    css_pattern = re.compile(
        r'(\s*<link\s+rel="stylesheet"\s+href="styles/[^"]+"\s*/>\s*)+',
        re.M,
    )
    html_dist = css_pattern.sub(
        '\n  <link rel="stylesheet" href="styles/bundle.min.css" />\n',
        html_text,
        count=1,
    )

    js_pattern = re.compile(
        r'(\s*<script\s+src="scripts/[^"]+"\s+defer></script>\s*)+',
        re.M,
    )
    html_dist = js_pattern.sub(
        '\n  <script src="scripts/bundle.min.js" defer></script>\n',
        html_dist,
        count=1,
    )

    open(os.path.join(DIST_DIR, 'index.html'), 'w', encoding='utf-8').write(html_dist)

    # 4. Copiar activos y cabeceras HTTP de seguridad
    shutil.copytree(os.path.join(ROOT, 'assets'), os.path.join(DIST_DIR, 'assets'))
    for cfg in ('_headers', 'vercel.json'):
        src_cfg = os.path.join(ROOT, cfg)
        if os.path.exists(src_cfg):
            shutil.copy2(src_cfg, os.path.join(DIST_DIR, cfg))

    print(
        f'[OK] CSS bundle: {raw_css_size} -> {len(css_bundle.encode("utf-8"))} bytes (9 archivos -> 1)'
    )
    print(
        f'[OK] JS bundle:  {raw_js_size} -> {len(js_bundle.encode("utf-8"))} bytes (8 archivos -> 1)'
    )
    print('[OK] Paquete de producción listo en dist/')


def main():
    parser = argparse.ArgumentParser(description='Build y sincronización del Portafolio Draft.')
    parser.add_argument(
        '--sync-cv',
        action='store_true',
        help='Solo regenera scripts/data/cv-binary.js desde assets/CV_Carlos_Giovanni_Reyes_Medina.pdf',
    )
    args = parser.parse_args()
    if args.sync_cv:
        sync_cv_binary()
    else:
        build_dist()


if __name__ == '__main__':
    main()
