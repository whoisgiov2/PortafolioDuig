(function (global) {
  'use strict';

  const DraftPortfolio = (global.DraftPortfolio = global.DraftPortfolio || {});

  function base64ToBytes(base64) {
    const binaryString = global.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  function saveBlobToDevice(blob, filename) {
    const blobUrl = global.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', filename);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    global.setTimeout(() => {
      global.URL.revokeObjectURL(blobUrl);
    }, 8000);
  }

  async function downloadCvDirectly(cvUrl, filename) {
    const isHttp = global.location.protocol === 'http:' || global.location.protocol === 'https:';

    // 1. En servidor HTTP/HTTPS obtenemos los bytes actuales del archivo y forzamos octet-stream
    if (isHttp && typeof global.fetch === 'function') {
      try {
        const response = await global.fetch(cvUrl, { cache: 'no-cache' });
        if (response.ok) {
          const buffer = await response.arrayBuffer();
          const forceDownloadBlob = new Blob([buffer], { type: 'application/octet-stream' });
          saveBlobToDevice(forceDownloadBlob, filename);
          return;
        }
      } catch (_err) {
        // Continúa al respaldo binario local si fetch falla
      }
    }

    // 2. Respaldo binario directo (funciona incluso abriendo index.html vía file:// sin servidor)
    if (DraftPortfolio.CV_BASE64) {
      const bytes = base64ToBytes(DraftPortfolio.CV_BASE64);
      const forceDownloadBlob = new Blob([bytes], { type: 'application/octet-stream' });
      saveBlobToDevice(forceDownloadBlob, filename);
      return;
    }

    // 3. Último recurso seguro: nunca reemplaza la pestaña actual
    const fallback = document.createElement('a');
    fallback.href = cvUrl;
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.setAttribute('download', filename);
    document.body.appendChild(fallback);
    fallback.click();
    document.body.removeChild(fallback);
  }

  DraftPortfolio.initCvDownload = function () {
    const data = DraftPortfolio.DATA || {};
    const cvUrl = data.cvUrl || 'assets/CV_Carlos_Giovanni_Reyes_Medina.pdf';
    const cvDownloadName = data.cvDownloadName || 'CV_Carlos_Giovanni_Reyes_Medina.pdf';
    const motionQuery = global.matchMedia('(prefers-reduced-motion: reduce)');

    const widgets = Array.from(document.querySelectorAll('[data-cv-widget]'));
    if (!widgets.length) return;

    widgets.forEach((widget) => {
      const checkbox = widget.querySelector('.cv-download__input');
      const label = widget.querySelector('.cv-download__label');
      const openAnchor = widget.querySelector('.cv-download__open-anchor');
      if (!checkbox || !label) return;

      if (openAnchor) {
        openAnchor.setAttribute('href', cvUrl);
      }

      let state = 'idle'; // 'idle' -> 'downloading' -> 'ready-open'

      label.addEventListener('click', (event) => {
        if (state !== 'idle') {
          event.preventDefault();
        }
      });

      checkbox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && state === 'idle') {
          event.preventDefault();
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event('change'));
        }
      });

      checkbox.addEventListener('change', () => {
        if (!checkbox.checked || state !== 'idle') return;

        state = 'downloading';
        label.setAttribute('aria-label', 'Descargando CV directamente en tu dispositivo');

        // Duración completa de la animación en el portafolio (3.5s + 0.4s de expansión final)
        const downloadMoment = motionQuery.matches ? 0 : 3200;
        const finishAnimationMoment = motionQuery.matches ? 80 : 3900;

        // Guarda el archivo PDF directo en el dispositivo mediante Blob sin salir de la pestaña
        global.setTimeout(() => {
          downloadCvDirectly(cvUrl, cvDownloadName);
        }, downloadMoment);

        // Una vez terminada toda la animación, habilita el enlace "Abrir CV" en pestaña/ventana nueva
        global.setTimeout(() => {
          state = 'ready-open';
          const shouldTransferFocus =
            document.activeElement === checkbox || widget.contains(document.activeElement);
          widget.classList.add('is-ready-open');
          checkbox.setAttribute('tabindex', '-1');
          if (openAnchor) {
            openAnchor.setAttribute('tabindex', '0');
            openAnchor.removeAttribute('aria-hidden');
            if (shouldTransferFocus) {
              openAnchor.focus({ preventScroll: true });
            }
          }
        }, finishAnimationMoment);
      });
    });
  };
})(window);
