(function (global) {
  'use strict';

  const DraftPortfolio = (global.DraftPortfolio = global.DraftPortfolio || {});

  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    function closeMenu() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    }

    toggle.addEventListener('click', () => {
      const willOpen = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
      toggle.setAttribute('aria-label', willOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (
        nav.classList.contains('is-open') &&
        !nav.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    global.addEventListener(
      'resize',
      () => {
        if (global.innerWidth > 900 && nav.classList.contains('is-open')) {
          closeMenu();
        }
      },
      { passive: true }
    );
  }

  function initProjectFilters(onFilterChange) {
    const filterButtons = Array.from(document.querySelectorAll('[data-project-filter]'));
    const projectCards = Array.from(document.querySelectorAll('#projects-grid .project-card'));
    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-project-filter');

        filterButtons.forEach((other) => {
          const isCurrent = other === btn;
          other.classList.toggle('is-active', isCurrent);
          other.setAttribute('aria-pressed', String(isCurrent));
        });

        projectCards.forEach((card) => {
          const matches = selected === 'all' || card.getAttribute('data-category') === selected;
          card.classList.toggle('is-hidden', !matches);
          if (matches) {
            card.classList.remove('is-entered', 'is-exiting');
            card.style.setProperty('--exit-scale', '1');
            card.style.setProperty('--exit-opacity', '1');
            void card.offsetWidth;
          }
        });

        if (typeof onFilterChange === 'function') {
          onFilterChange();
        }
      });
    });
  }

  function syncExternalLinks() {
    const githubUrl = DraftPortfolio.DATA && DraftPortfolio.DATA.githubUrl;
    if (!githubUrl) return;
    document.querySelectorAll('[data-github-link]').forEach((anchor) => {
      anchor.setAttribute('href', githubUrl);
    });
  }

  function initLinkedInQrToggle(onLayoutChange) {
    const card = document.getElementById('linkedin-qr-card');
    const btn = document.getElementById('toggle-qr-size-btn');
    const labelEl = document.getElementById('toggle-qr-label');
    if (!card || !btn) return;

    btn.addEventListener('click', () => {
      const expanded = card.classList.toggle('is-qr-expanded');
      btn.setAttribute('aria-expanded', String(expanded));
      if (labelEl) {
        labelEl.textContent = expanded ? 'Reducir QR' : 'Ampliar QR';
      }
      if (typeof onLayoutChange === 'function') {
        global.setTimeout(onLayoutChange, 280);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const motionReduced = global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!motionReduced) {
      document.documentElement.classList.add('js-motion-enabled');
    }

    if (typeof DraftPortfolio.renderAll === 'function') {
      DraftPortfolio.renderAll();
    }

    syncExternalLinks();
    initMobileNav();

    if (typeof DraftPortfolio.initCvDownload === 'function') {
      DraftPortfolio.initCvDownload();
    }

    let choreography = null;

    function bootChoreography() {
      if (choreography) return;
      if (typeof DraftPortfolio.initScrollChoreography === 'function') {
        choreography = DraftPortfolio.initScrollChoreography();
      }
    }

    if (typeof DraftPortfolio.initDraftLoader === 'function') {
      DraftPortfolio.initDraftLoader(bootChoreography);
    } else {
      bootChoreography();
    }

    initProjectFilters(() => {
      if (choreography && typeof choreography.refresh === 'function') {
        choreography.refresh();
      }
    });

    initLinkedInQrToggle(() => {
      if (choreography && typeof choreography.refresh === 'function') {
        choreography.refresh();
      }
    });

    if (typeof DraftPortfolio.initSecureContact === 'function') {
      DraftPortfolio.initSecureContact();
    }
  });
})(window);
