(function (global) {
  'use strict';

  const DraftPortfolio = (global.DraftPortfolio = global.DraftPortfolio || {});
  const SVG_NS = 'http://www.w3.org/2000/svg';

  // Definiciones vectoriales limpias (viewBox 0 0 24 24, stroke 1.75) diseñadas
  // para ciberseguridad defensiva, redes, IAM, sistemas y verificación.
  const ICON_DEFS = {
    'radar-soc': [
      { tag: 'circle', attrs: { cx: '12', cy: '12', r: '9' } },
      { tag: 'circle', attrs: { cx: '12', cy: '12', r: '5', class: 'svg-accent-part' } },
      { tag: 'path', attrs: { d: 'M12 12L18.2 5.8', class: 'svg-sweep-hand' } },
      { tag: 'circle', attrs: { cx: '12', cy: '12', r: '1.4', fill: 'currentColor', stroke: 'none' } }
    ],
    'shield-perimeter': [
      { tag: 'path', attrs: { d: 'M12 3L4.5 6.2V11.6C4.5 16.4 7.7 20.6 12 21.8C16.3 20.6 19.5 16.4 19.5 11.6V6.2L12 3Z' } },
      { tag: 'path', attrs: { d: 'M9 12.2L11.1 14.3L15.4 9.8', class: 'svg-draw-check' } }
    ],
    'network-nodes': [
      { tag: 'circle', attrs: { cx: '6', cy: '6.5', r: '2.3' } },
      { tag: 'circle', attrs: { cx: '18', cy: '6.5', r: '2.3' } },
      { tag: 'circle', attrs: { cx: '12', cy: '17.5', r: '2.5', class: 'svg-accent-part' } },
      { tag: 'path', attrs: { d: 'M8.1 7.6L10.6 15.3M15.9 7.6L13.4 15.3M8.3 6.5H15.7', class: 'svg-draw-link' } }
    ],
    'terminal-sys': [
      { tag: 'rect', attrs: { x: '3.5', y: '4.5', width: '17', height: '15', rx: '2.5' } },
      { tag: 'path', attrs: { d: 'M7.5 9.5L10.5 12L7.5 14.5' } },
      { tag: 'path', attrs: { d: 'M12.5 14.5H16.5', class: 'svg-cursor-blink' } }
    ],
    'governance-iam': [
      { tag: 'circle', attrs: { cx: '9', cy: '9.5', r: '3.2' } },
      { tag: 'path', attrs: { d: 'M3.8 18.5C4.5 15.7 6.5 14.3 9 14.3C11.5 14.3 13.5 15.7 14.2 18.5' } },
      { tag: 'path', attrs: { d: 'M15.2 9.5H20.2M18.2 9.5V12', class: 'svg-accent-part' } }
    ],
    'audit-key': [
      { tag: 'circle', attrs: { cx: '8.5', cy: '12', r: '4' } },
      { tag: 'path', attrs: { d: 'M12.5 12H20.5M17.5 12V15M20 12V14.5', class: 'svg-key-teeth' } }
    ],
    'rfc-layers': [
      { tag: 'path', attrs: { d: 'M12 4L3.5 8.5L12 13L20.5 8.5L12 4Z' } },
      { tag: 'path', attrs: { d: 'M3.5 12.5L12 17L20.5 12.5', class: 'svg-accent-part' } },
      { tag: 'path', attrs: { d: 'M3.5 16.2L12 20.5L20.5 16.2' } }
    ],
    'vpn-topology': [
      { tag: 'rect', attrs: { x: '3.5', y: '13.5', width: '6', height: '5.5', rx: '1.2' } },
      { tag: 'rect', attrs: { x: '14.5', y: '13.5', width: '6', height: '5.5', rx: '1.2' } },
      { tag: 'path', attrs: { d: 'M6.5 13.5V10C6.5 7 9 5 12 5C15 5 17.5 7 17.5 10V13.5', class: 'svg-draw-link' } },
      { tag: 'circle', attrs: { cx: '12', cy: '5', r: '1.6', fill: 'currentColor', stroke: 'none' } }
    ],
    'forensic-pulse': [
      { tag: 'rect', attrs: { x: '3.5', y: '4.5', width: '17', height: '15', rx: '2.5' } },
      { tag: 'path', attrs: { d: 'M6.5 12.5H9.2L10.8 8.8L13.1 15.2L14.8 11.2L16 12.5H17.5', class: 'svg-draw-check' } }
    ],
    'badge-seal': [
      { tag: 'path', attrs: { d: 'M12 3.2L14.6 4.8L17.6 4.6L18.8 7.4L21 9.5L20.1 12.4L21 15.3L18.8 17.4L17.6 20.2L14.6 20L12 21.6L9.4 20L6.4 20.2L5.2 17.4L3 15.3L3.9 12.4L3 9.5L5.2 7.4L6.4 4.6L9.4 4.8L12 3.2Z' } },
      { tag: 'path', attrs: { d: 'M8.8 12.5L11 14.7L15.4 10.1', class: 'svg-draw-check' } }
    ],
    'arrow-up-right': [
      { tag: 'path', attrs: { d: 'M7 17L17 7' } },
      { tag: 'path', attrs: { d: 'M9 7H17V15' } }
    ],
    'issuer-redhat': [
      { tag: 'path', attrs: { d: 'M4 15.2C4 17.5 7.6 19.2 12 19.2C16.4 19.2 20 17.5 20 15.2C20 13.7 18.6 12.6 16.9 12L15.4 7.3C15.1 6.3 14.1 5.9 13.1 6.3L11.5 6.9L9.8 6.2C8.9 5.8 7.9 6.3 7.6 7.3L6.4 11.9C4.9 12.6 4 13.8 4 15.2Z' } },
      { tag: 'path', attrs: { d: 'M6.8 12.3C8.5 13.4 10.7 13.8 12.9 13.6C14.7 13.4 16.1 12.8 17 12.1', class: 'svg-accent-part' } }
    ],
    'issuer-fortinet': [
      { tag: 'rect', attrs: { x: '3.5', y: '5.5', width: '4.5', height: '3.4', rx: '0.8', fill: 'currentColor', stroke: 'none' } },
      { tag: 'rect', attrs: { x: '9.75', y: '5.5', width: '4.5', height: '3.4', rx: '0.8', fill: 'currentColor', stroke: 'none' } },
      { tag: 'rect', attrs: { x: '16', y: '5.5', width: '4.5', height: '3.4', rx: '0.8', fill: 'currentColor', stroke: 'none' } },
      { tag: 'rect', attrs: { x: '3.5', y: '10.3', width: '4.5', height: '3.4', rx: '0.8', fill: 'currentColor', stroke: 'none' } },
      { tag: 'rect', attrs: { x: '16', y: '10.3', width: '4.5', height: '3.4', rx: '0.8', fill: 'currentColor', stroke: 'none' } },
      { tag: 'rect', attrs: { x: '3.5', y: '15.1', width: '4.5', height: '3.4', rx: '0.8', fill: 'currentColor', stroke: 'none' } },
      { tag: 'rect', attrs: { x: '9.75', y: '15.1', width: '4.5', height: '3.4', rx: '0.8', fill: 'currentColor', stroke: 'none' } },
      { tag: 'rect', attrs: { x: '16', y: '15.1', width: '4.5', height: '3.4', rx: '0.8', fill: 'currentColor', stroke: 'none' } }
    ],
    'issuer-google': [
      { tag: 'path', attrs: { d: 'M12 3L4.8 6.2V11.5C4.8 16.2 7.9 20.2 12 21.4C16.1 20.2 19.2 16.2 19.2 11.5V6.2L12 3Z' } },
      { tag: 'path', attrs: { d: 'M15.2 10.6C14.7 9.4 13.5 8.6 12 8.6C10.1 8.6 8.6 10.1 8.6 12C8.6 13.9 10.1 15.4 12 15.4C13.8 15.4 15.1 14.2 15.3 12.5H12.3', class: 'svg-accent-part' } }
    ],
    'rotate-3d': [
      { tag: 'path', attrs: { d: 'M4.5 12A7.5 7.5 0 0 1 17.5 6.8' } },
      { tag: 'path', attrs: { d: 'M14.5 7H18V3.5' } },
      { tag: 'path', attrs: { d: 'M19.5 12A7.5 7.5 0 0 1 6.5 17.2' } },
      { tag: 'path', attrs: { d: 'M9.5 17H6V20.5' } }
    ],
    'close-x': [
      { tag: 'path', attrs: { d: 'M6 6L18 18M18 6L6 18' } }
    ]
  };

  DraftPortfolio.createIcon = function (name, className) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', className ? `draft-icon ${className}` : 'draft-icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.75');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');

    const shapes = ICON_DEFS[name] || ICON_DEFS['shield-perimeter'];
    shapes.forEach((shape) => {
      const node = document.createElementNS(SVG_NS, shape.tag);
      Object.keys(shape.attrs).forEach((attr) => {
        node.setAttribute(attr, shape.attrs[attr]);
      });
      svg.appendChild(node);
    });

    return svg;
  };
})(window);
