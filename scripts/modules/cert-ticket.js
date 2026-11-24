(function (global) {
  'use strict';

  const DraftPortfolio = (global.DraftPortfolio = global.DraftPortfolio || {});

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  async function copyToClipboard(text) {
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

  DraftPortfolio.initCertTicketModal = function () {
    const grid = document.getElementById('certifications-grid');
    const modal = document.getElementById('cert-ticket-modal');
    const dialog = modal && modal.querySelector('.cert-ticket-modal__dialog');
    const stage = document.getElementById('ticket-stage');
    const ticket3d = document.getElementById('cert-ticket-3d');
    const closeBtn = document.getElementById('ticket-close-btn');
    const flipBtn = document.getElementById('ticket-flip-btn');
    const flipLabel = document.getElementById('ticket-flip-label');
    const resetBtn = document.getElementById('ticket-reset-btn');
    const copyIdBtn = document.getElementById('ticket-copy-id-btn');
    const verifyLink = document.getElementById('ticket-verify-link');
    const verifyLabel = document.getElementById('ticket-verify-label');

    // Campos dinámicos del ticket (frente y reverso)
    const issuerLogoFront = document.getElementById('ticket-issuer-logo');
    const issuerNameFront = document.getElementById('ticket-issuer-name');
    const badgeTypeEl = document.getElementById('ticket-badge-type');
    const badgeStageFront = document.getElementById('ticket-badge-stage');
    const badgeImgFront = document.getElementById('ticket-badge-img');
    const badgeFallbackFront = document.getElementById('ticket-badge-fallback');
    const badgeThumbBack = document.getElementById('ticket-badge-thumb-back');
    const titleFront = document.getElementById('ticket-title-front');
    const subtitleFront = document.getElementById('ticket-subtitle-front');
    const platformEl = document.getElementById('ticket-platform');
    const domainEl = document.getElementById('ticket-domain');
    const skillsFront = document.getElementById('ticket-skills-front');
    const barcodeIdEl = document.getElementById('ticket-barcode-id');
    const folioNumEl = document.getElementById('ticket-folio-num');

    const titleBack = document.getElementById('ticket-title-back');
    const criteriaBack = document.getElementById('ticket-criteria-back');
    const skillsBack = document.getElementById('ticket-skills-back');
    const uuidFullEl = document.getElementById('ticket-uuid-full');

    if (!grid || !modal || !stage || !ticket3d) return;

    const motionQuery = global.matchMedia('(prefers-reduced-motion: reduce)');

    let isOpen = false;
    let lastTriggerEl = null;
    let currentBadgeId = '';
    let closeTimer = null;

    // Estado de física 3D libre sobre ejes X e Y
    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let hoverOffsetX = 0;
    let hoverOffsetY = 0;
    let velX = 0;
    let velY = 0;
    let isDragging = false;
    let lastPtrX = 0;
    let lastPtrY = 0;
    let activePointerId = null;
    let rafId = null;
    let copyTimer = null;

    if (badgeImgFront) {
      badgeImgFront.addEventListener('error', () => {
        badgeImgFront.setAttribute('hidden', '');
        badgeImgFront.removeAttribute('src');
        if (badgeFallbackFront) badgeFallbackFront.removeAttribute('hidden');
        if (badgeStageFront) badgeStageFront.classList.add('is-fallback');
      });
    }

    if (badgeThumbBack) {
      badgeThumbBack.addEventListener('error', () => {
        badgeThumbBack.setAttribute('hidden', '');
        badgeThumbBack.removeAttribute('src');
      });
    }

    function showBadgeFallback(cert) {
      if (badgeImgFront) {
        badgeImgFront.setAttribute('hidden', '');
        badgeImgFront.removeAttribute('src');
      }
      if (badgeFallbackFront) {
        if (typeof DraftPortfolio.createIcon === 'function') {
          badgeFallbackFront.replaceChildren(DraftPortfolio.createIcon((cert && cert.issuerIcon) || 'badge-seal'));
        }
        badgeFallbackFront.removeAttribute('hidden');
      }
      if (badgeStageFront) badgeStageFront.classList.add('is-fallback');
      if (badgeThumbBack) {
        badgeThumbBack.setAttribute('hidden', '');
        badgeThumbBack.removeAttribute('src');
      }
    }

    function buildSkillPills(container, skills) {
      if (!container) return;
      const frag = document.createDocumentFragment();
      (skills || []).forEach((label) => {
        const pill = document.createElement('span');
        pill.className = 't-skill-pill';
        pill.textContent = label;
        frag.appendChild(pill);
      });
      container.replaceChildren(frag);
    }

    function populateTicket(cert) {
      if (!cert) return;

      currentBadgeId = cert.badgeId || '';
      const shortCode = currentBadgeId
        ? `ID · ${currentBadgeId.slice(0, 8).toUpperCase()}`
        : `ID · ${cert.folio || '01'}`;

      if (issuerLogoFront) {
        if (typeof DraftPortfolio.createIcon === 'function') {
          issuerLogoFront.replaceChildren(DraftPortfolio.createIcon(cert.issuerIcon || 'badge-seal'));
        }
      }
      if (issuerNameFront) issuerNameFront.textContent = cert.issuer || '';
      if (badgeTypeEl) badgeTypeEl.textContent = cert.badgeType || 'Credencial';

      if (badgeFallbackFront && typeof DraftPortfolio.createIcon === 'function') {
        badgeFallbackFront.replaceChildren(DraftPortfolio.createIcon(cert.issuerIcon || 'badge-seal'));
      }

      if (cert.badgeImage && badgeImgFront) {
        badgeImgFront.setAttribute('src', cert.badgeImage);
        badgeImgFront.setAttribute('alt', `Insignia oficial de ${cert.title || 'certificación'}`);
        badgeImgFront.removeAttribute('hidden');
        if (badgeFallbackFront) badgeFallbackFront.setAttribute('hidden', '');
        if (badgeStageFront) badgeStageFront.classList.remove('is-fallback');

        if (badgeThumbBack) {
          badgeThumbBack.setAttribute('src', cert.badgeImage);
          badgeThumbBack.removeAttribute('hidden');
        }
      } else {
        showBadgeFallback(cert);
      }

      if (titleFront) titleFront.textContent = cert.title || '';
      if (subtitleFront) subtitleFront.textContent = cert.focus || '';
      if (platformEl) platformEl.textContent = cert.platform || 'Credly';
      if (domainEl) domainEl.textContent = cert.domain || 'Ciberseguridad';
      if (barcodeIdEl) barcodeIdEl.textContent = shortCode;
      if (folioNumEl) folioNumEl.textContent = cert.folio || '01';

      buildSkillPills(skillsFront, cert.skills);

      if (titleBack) titleBack.textContent = cert.title || '';
      if (criteriaBack) criteriaBack.textContent = cert.criteria || cert.focus || '';
      if (uuidFullEl) uuidFullEl.textContent = currentBadgeId || cert.credentialUrl || '';
      buildSkillPills(skillsBack, cert.skills);

      if (verifyLink) {
        const url = cert.credentialUrl || 'https://www.credly.com/';
        verifyLink.setAttribute('href', url);
        verifyLink.setAttribute('aria-label', `Abrir verificación oficial de ${cert.title}`);
        if (verifyLabel) {
          verifyLabel.textContent = url.indexOf('credly.com') !== -1 ? 'Verificar en Credly' : 'Verificar credencial';
        }
      }
    }

    function updateFlipButtonText() {
      if (!flipLabel) return;
      const normalized = ((rotY % 360) + 360) % 360;
      const showingBack = normalized > 90 && normalized < 270;
      flipLabel.textContent = showingBack ? 'Ver frente' : 'Voltear reverso';
    }

    function applyTransform() {
      const effectiveX = rotX + (isDragging ? 0 : hoverOffsetX);
      const effectiveY = rotY + (isDragging ? 0 : hoverOffsetY);
      ticket3d.style.transform = `rotateX(${effectiveX.toFixed(2)}deg) rotateY(${effectiveY.toFixed(2)}deg)`;

      const glintX = clamp(50 + Math.sin((effectiveY * Math.PI) / 180) * 32, 14, 86);
      const glintY = clamp(38 - Math.sin((effectiveX * Math.PI) / 180) * 28, 12, 88);
      stage.style.setProperty('--glint-x', `${glintX.toFixed(1)}%`);
      stage.style.setProperty('--glint-y', `${glintY.toFixed(1)}%`);
    }

    function stepPhysics() {
      if (!isOpen) {
        rafId = null;
        return;
      }

      if (motionQuery.matches) {
        rotX = targetRotX;
        rotY = targetRotY;
        hoverOffsetX = 0;
        hoverOffsetY = 0;
        applyTransform();
        updateFlipButtonText();
        rafId = null;
        return;
      }

      if (!isDragging) {
        targetRotY += velY;
        targetRotX = clamp(targetRotX + velX, -75, 75);
        velX *= 0.9;
        velY *= 0.9;
        if (Math.abs(velX) < 0.02) velX = 0;
        if (Math.abs(velY) < 0.02) velY = 0;
      }

      rotX += (targetRotX - rotX) * 0.18;
      rotY += (targetRotY - rotY) * 0.18;

      applyTransform();
      updateFlipButtonText();

      const settled =
        !isDragging &&
        Math.abs(targetRotX - rotX) < 0.04 &&
        Math.abs(targetRotY - rotY) < 0.04 &&
        velX === 0 &&
        velY === 0 &&
        Math.abs(hoverOffsetX) < 0.05 &&
        Math.abs(hoverOffsetY) < 0.05;

      if (settled) {
        rotX = targetRotX;
        rotY = targetRotY;
        applyTransform();
        rafId = null;
      } else {
        rafId = global.requestAnimationFrame(stepPhysics);
      }
    }

    function ensurePhysicsLoop() {
      if (!rafId && isOpen) {
        rafId = global.requestAnimationFrame(stepPhysics);
      }
    }

    function resetOrientation() {
      velX = 0;
      velY = 0;
      hoverOffsetX = 0;
      hoverOffsetY = 0;
      targetRotX = 0;
      targetRotY = 0;
      ensurePhysicsLoop();
    }

    function openModal(certIndex, triggerEl) {
      const certs = (DraftPortfolio.DATA && DraftPortfolio.DATA.certifications) || [];
      const cert = certs[certIndex];
      if (!cert) return;

      if (closeTimer) {
        global.clearTimeout(closeTimer);
        closeTimer = null;
      }

      lastTriggerEl = triggerEl || document.activeElement;
      populateTicket(cert);

      rotX = 0;
      rotY = motionQuery.matches ? 0 : -14;
      targetRotX = 0;
      targetRotY = 0;
      velX = 0;
      velY = 0;
      hoverOffsetX = 0;
      hoverOffsetY = 0;

      modal.removeAttribute('hidden');
      document.body.classList.add('is-modal-open');
      void modal.offsetWidth;
      modal.classList.add('is-open');
      isOpen = true;

      applyTransform();
      updateFlipButtonText();
      ensurePhysicsLoop();

      if (closeBtn) {
        closeBtn.focus({ preventScroll: true });
      }
    }

    function closeModal() {
      if (!isOpen) return;
      isOpen = false;
      isDragging = false;
      stage.classList.remove('is-dragging');
      modal.classList.remove('is-open');
      document.body.classList.remove('is-modal-open');

      if (rafId) {
        global.cancelAnimationFrame(rafId);
        rafId = null;
      }

      const finishHide = () => {
        modal.setAttribute('hidden', '');
        if (lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
          lastTriggerEl.focus({ preventScroll: true });
        }
      };

      if (motionQuery.matches) {
        finishHide();
      } else {
        closeTimer = global.setTimeout(finishHide, 230);
      }
    }

    // Delegación sobre las tarjetas de certificación
    grid.addEventListener('click', (event) => {
      const card = event.target.closest('[data-cert-index]');
      if (!card) return;
      const idx = Number(card.getAttribute('data-cert-index'));
      openModal(idx, card);
    });

    grid.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = event.target.closest('[data-cert-index]');
      if (!card) return;
      event.preventDefault();
      const idx = Number(card.getAttribute('data-cert-index'));
      openModal(idx, card);
    });

    // Arrastre libre 3D con Pointer Events (mouse + touch)
    stage.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button, a')) return;
      isDragging = true;
      activePointerId = event.pointerId;
      lastPtrX = event.clientX;
      lastPtrY = event.clientY;
      velX = 0;
      velY = 0;
      stage.classList.add('is-dragging');
      if (typeof stage.setPointerCapture === 'function') {
        try {
          stage.setPointerCapture(event.pointerId);
        } catch (_err) {
          // Ignora si el puntero ya fue liberado
        }
      }
      ensurePhysicsLoop();
    });

    stage.addEventListener('pointermove', (event) => {
      if (isDragging && event.pointerId === activePointerId) {
        const dx = event.clientX - lastPtrX;
        const dy = event.clientY - lastPtrY;
        lastPtrX = event.clientX;
        lastPtrY = event.clientY;

        const deltaY = dx * 0.55;
        const deltaX = -dy * 0.45;
        targetRotY += deltaY;
        targetRotX = clamp(targetRotX + deltaX, -75, 75);
        velY = clamp(deltaY * 0.45, -8, 8);
        velX = clamp(deltaX * 0.45, -6, 6);
        ensurePhysicsLoop();
        return;
      }

      if (!motionQuery.matches && event.pointerType === 'mouse' && isOpen) {
        const rect = stage.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const normX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
          const normY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
          hoverOffsetY = clamp(normX * 12, -12, 12);
          hoverOffsetX = clamp(-normY * 10, -10, 10);
          ensurePhysicsLoop();
        }
      }
    });

    function stopDrag(event) {
      if (!isDragging) return;
      if (activePointerId !== null && event.pointerId !== activePointerId) return;
      isDragging = false;
      activePointerId = null;
      stage.classList.remove('is-dragging');
      ensurePhysicsLoop();
    }

    stage.addEventListener('pointerup', stopDrag);
    stage.addEventListener('pointercancel', stopDrag);
    stage.addEventListener('pointerleave', () => {
      hoverOffsetX = 0;
      hoverOffsetY = 0;
      ensurePhysicsLoop();
    });

    // Botón para copiar UUID completo sin activar arrastre 3D
    if (copyIdBtn) {
      const labelSpan = copyIdBtn.querySelector('.btn__label-text');
      const defaultCopyLabel = labelSpan ? labelSpan.textContent.trim() : 'Copiar ID';

      copyIdBtn.addEventListener('pointerdown', (event) => {
        event.stopPropagation();
      });

      copyIdBtn.addEventListener('click', async () => {
        if (!currentBadgeId) return;
        try {
          await copyToClipboard(currentBadgeId);
          copyIdBtn.classList.add('is-copied');
          if (labelSpan) labelSpan.textContent = 'Copiado';
          if (copyTimer) global.clearTimeout(copyTimer);
          copyTimer = global.setTimeout(() => {
            copyIdBtn.classList.remove('is-copied');
            if (labelSpan) labelSpan.textContent = defaultCopyLabel;
          }, 1600);
        } catch (_err) {
          if (labelSpan) labelSpan.textContent = 'Copia manual';
        }
      });
    }

    if (flipBtn) {
      flipBtn.addEventListener('click', () => {
        velX = 0;
        velY = 0;
        targetRotY += 180;
        ensurePhysicsLoop();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', resetOrientation);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (event) => {
      if (dialog && !dialog.contains(event.target)) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (!isOpen) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        targetRotY -= 18;
        ensurePhysicsLoop();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        targetRotY += 18;
        ensurePhysicsLoop();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        targetRotX = clamp(targetRotX + 14, -75, 75);
        ensurePhysicsLoop();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        targetRotX = clamp(targetRotX - 14, -75, 75);
        ensurePhysicsLoop();
      }
    });
  };
})(window);
