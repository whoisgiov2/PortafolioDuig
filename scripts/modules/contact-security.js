(function (global) {
  'use strict';

  const DraftPortfolio = (global.DraftPortfolio = global.DraftPortfolio || {});

  function sanitizeField(value, maxLength) {
    return String(value || '')
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, maxLength);
  }

  function sanitizeMultiline(value, maxLength) {
    return String(value || '')
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
      .replace(/[<>]/g, '')
      .trim()
      .slice(0, maxLength);
  }

  async function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(helper);
    return ok;
  }

  DraftPortfolio.initSecureContact = function () {
    const email = (DraftPortfolio.DATA && DraftPortfolio.DATA.contactEmail) || 'giovanni.reyesamed@gmail.com';
    const copyButtons = Array.from(document.querySelectorAll('[data-copy-value]'));
    const copyFeedback = document.getElementById('copy-feedback');
    const form = document.getElementById('secure-contact-form');
    const copyPayloadBtn = document.getElementById('copy-payload-btn');
    const statusBox = document.getElementById('composer-status');
    const stampTimers = new Map();

    function triggerStamp(stampId, textLabel) {
      if (!stampId) return;
      const stampEl = document.getElementById(stampId);
      if (!stampEl) return;

      if (textLabel) {
        stampEl.textContent = textLabel;
      }

      stampEl.classList.remove('is-stamped');
      void stampEl.offsetWidth;
      stampEl.classList.add('is-stamped');

      if (stampTimers.has(stampId)) {
        global.clearTimeout(stampTimers.get(stampId));
      }

      const timer = global.setTimeout(() => {
        stampEl.classList.remove('is-stamped');
      }, 2400);

      stampTimers.set(stampId, timer);
    }

    function setMorphCopied(btn, copiedText, restoreFn, currentTimer) {
      const labelSpan = btn.querySelector('.btn__label-text');
      btn.classList.add('is-copied');
      if (labelSpan && copiedText) {
        labelSpan.textContent = copiedText;
      }
      if (currentTimer) {
        global.clearTimeout(currentTimer);
      }
      return global.setTimeout(() => {
        btn.classList.remove('is-copied');
        restoreFn();
      }, 1700);
    }

    function setStatus(message, type) {
      if (!statusBox) return;
      statusBox.textContent = message;
      statusBox.classList.remove('is-error', 'is-ok');
      if (type === 'error') statusBox.classList.add('is-error');
      if (type === 'ok') statusBox.classList.add('is-ok');
    }

    function readAndValidate() {
      const nameInput = document.getElementById('contact-name');
      const phoneInput = document.getElementById('contact-phone');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-message');
      const verifyInput = document.getElementById('contact-verify');

      const name = sanitizeField(nameInput && nameInput.value, 80);
      const phoneOrOrg = sanitizeField(phoneInput && phoneInput.value, 70);
      const senderEmail = sanitizeField(emailInput && emailInput.value, 100);
      const message = sanitizeMultiline(msgInput && msgInput.value, 600);
      const verified = Boolean(verifyInput && verifyInput.checked);
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name.length < 2) {
        setStatus('Ingresa tu nombre o contacto en el nivel 01 (mínimo 2 caracteres).', 'error');
        if (nameInput) nameInput.focus();
        return null;
      }

      if (phoneOrOrg.length < 3) {
        setStatus('Ingresa tu teléfono u organización en el nivel 02.', 'error');
        if (phoneInput) phoneInput.focus();
        return null;
      }

      if (!emailPattern.test(senderEmail)) {
        setStatus('Ingresa un correo electrónico válido en el nivel 03.', 'error');
        if (emailInput) emailInput.focus();
        return null;
      }

      if (message.length < 6) {
        setStatus('Describe el alcance o mensaje en el nivel 04 (mínimo 6 caracteres).', 'error');
        if (msgInput) msgInput.focus();
        return null;
      }

      if (!verified) {
        setStatus('Marca la confirmación de envío limpio antes de preparar o copiar el mensaje.', 'error');
        if (verifyInput) verifyInput.focus();
        return null;
      }

      const subject = `[Portafolio Ciberseguridad] Contacto de ${name}`;
      const body = [
        `Contacto: ${name}`,
        `Teléfono / Organización: ${phoneOrOrg}`,
        `Correo de respuesta: ${senderEmail}`,
        '',
        'Alcance / Mensaje:',
        message,
        '',
        '---',
        'Mensaje estructurado desde Contacto Seguro.'
      ].join('\n');

      return { subject, body };
    }

    copyButtons.forEach((btn) => {
      const labelSpan = btn.querySelector('.btn__label-text');
      const originalText = labelSpan ? labelSpan.textContent.trim() : btn.textContent.trim();
      let resetTimer = null;

      btn.addEventListener('click', async () => {
        const valueToCopy = btn.getAttribute('data-copy-value') || email;
        const stampId = btn.getAttribute('data-stamp-target');

        try {
          await copyText(valueToCopy);
          triggerStamp(stampId, 'Copiado');
          resetTimer = setMorphCopied(
            btn,
            'Copiado',
            () => {
              if (labelSpan) labelSpan.textContent = originalText;
              resetTimer = null;
            },
            resetTimer
          );

          if (copyFeedback) {
            copyFeedback.textContent =
              btn.id === 'copy-email-btn'
                ? 'Correo copiado al portapapeles.'
                : 'Ficha de referencia copiada al portapapeles.';
          }
        } catch (_err) {
          if (copyFeedback) {
            copyFeedback.textContent = `No se pudo copiar automáticamente. Usa: ${email}`;
          }
        }
      });
    });

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const payload = readAndValidate();
        if (!payload) return;

        const mailtoUrl =
          `mailto:${encodeURIComponent(email)}` +
          `?subject=${encodeURIComponent(payload.subject)}` +
          `&body=${encodeURIComponent(payload.body)}`;

        triggerStamp('payload-copy-stamp', 'Listo');
        setStatus('Abriendo tu cliente de correo con el mensaje sanitizado.', 'ok');
        global.location.href = mailtoUrl;
      });
    }

    if (copyPayloadBtn) {
      const payloadLabel = copyPayloadBtn.querySelector('.btn__label-text');
      const originalPayloadLabel = payloadLabel ? payloadLabel.textContent.trim() : 'Copiar texto estructurado';
      let payloadTimer = null;

      copyPayloadBtn.addEventListener('click', async () => {
        const payload = readAndValidate();
        if (!payload) return;

        const plainText = `Para: ${email}\nAsunto: ${payload.subject}\n\n${payload.body}`;
        try {
          await copyText(plainText);
          triggerStamp('payload-copy-stamp', 'Copiado');
          payloadTimer = setMorphCopied(
            copyPayloadBtn,
            'Copiado',
            () => {
              if (payloadLabel) payloadLabel.textContent = originalPayloadLabel;
              payloadTimer = null;
            },
            payloadTimer
          );
          setStatus('Mensaje estructurado copiado al portapapeles.', 'ok');
        } catch (_err) {
          setStatus('No fue posible acceder al portapapeles en este navegador.', 'error');
        }
      });
    }
  };
})(window);
