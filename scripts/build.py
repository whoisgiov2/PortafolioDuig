#!/usr/bin/env python3
"""
Utilidad de mantenimiento del Portafolio Draft:
  - Por defecto sincroniza scripts/data/cv-binary.js a partir de
    assets/CV_Carlos_Giovanni_Reyes_Medina.pdf sin duplicar archivos en el repositorio.
  - Con --bundle genera opcionalmente un paquete estático minificado en dist/ (ignorado en Git).

Uso:
  python scripts/build.py            # Sincroniza scripts/data/cv-binary.js desde el PDF actual
  python scripts/build.py --bundle   # Genera dist/ bajo demanda sin rastrearlo en Git
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
    'styles/cert-ticket.css',
    'styles/motion.css',
]

JS_FILES = [
    'scripts/data/portfolio-data.js',
    'scripts/data/cv-binary.js',
    'scripts/modules/icons.js',
    'scripts/modules/render-sections.js',
    'scripts/modules/cert-ticket.js',
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
    text = re.sub(r'/\*.*?\*/', '', css_text, flags=re.S)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\s*([{};,>~])\s*', r'\1', text)
    text = re.sub(r':\s+', ':', text)
    text = text.replace(';}', '}')
    return text.strip()


def compact_js(js_text):
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

    css_bundle = '\n'.join(
        minify_css(open(os.path.join(ROOT, p.replace('/', os.sep)), encoding='utf-8').read())
        for p in CSS_FILES
    )
    open(os.path.join(DIST_DIR, 'styles', 'bundle.min.css'), 'w', encoding='utf-8').write(css_bundle)

    js_bundle = '\n'.join(
        compact_js(open(os.path.join(ROOT, p.replace('/', os.sep)), encoding='utf-8').read())
        for p in JS_FILES
    ) + '\n'
    open(os.path.join(DIST_DIR, 'scripts', 'bundle.min.js'), 'w', encoding='utf-8').write(js_bundle)

    html_text = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    html_dist = re.sub(
        r'(\s*<link\s+rel="stylesheet"\s+href="styles/[^"]+"\s*/>\s*)+',
        '\n  <link rel="stylesheet" href="styles/bundle.min.css" />\n',
        html_text,
        count=1,
        flags=re.M,
    )
    html_dist = re.sub(
        r'(\s*<script\s+src="scripts/[^"]+"\s+defer></script>\s*)+',
        '\n  <script src="scripts/bundle.min.js" defer></script>\n',
        html_dist,
        count=1,
        flags=re.M,
    )
    open(os.path.join(DIST_DIR, 'index.html'), 'w', encoding='utf-8').write(html_dist)

    shutil.copytree(os.path.join(ROOT, 'assets'), os.path.join(DIST_DIR, 'assets'))
    headers_src = os.path.join(ROOT, '_headers')
    if os.path.exists(headers_src):
        shutil.copy2(headers_src, os.path.join(DIST_DIR, '_headers'))

    print('[OK] Paquete opcional generado en dist/ (ignorado por Git).')


def main():
    parser = argparse.ArgumentParser(description='Mantenimiento del Portafolio Draft.')
    parser.add_argument(
        '--bundle',
        action='store_true',
        help='Genera opcionalmente el paquete minificado en dist/',
    )
    args = parser.parse_args()
    if args.bundle:
        build_dist()
    else:
        sync_cv_binary()


if __name__ == '__main__':
    main()
