(function (global) {
  'use strict';

  const DraftPortfolio = (global.DraftPortfolio = global.DraftPortfolio || {});

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function easeOutQuad(t) {
    return 1 - (1 - t) * (1 - t);
  }

  DraftPortfolio.initScrollChoreography = function () {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll('[data-draft-section]'));
    const navLinks = Array.from(document.querySelectorAll('[data-nav-target]'));
    const progressBar = document.getElementById('scroll-progress-bar');
    const headerEl = document.getElementById('site-header');
    const motionQuery = global.matchMedia('(prefers-reduced-motion: reduce)');

    let sectionEntries = [];
    let rafPending = false;

    function buildSectionMap() {
      sectionEntries = sections.map((section) => {
        const items = Array.from(section.querySelectorAll('[data-draft-item]'));
        items.forEach((item) => {
          if (!item.style.getPropertyValue('--enter-stagger')) {
            item.style.setProperty('--enter-stagger', '0');
          }
        });
        return { section, items };
      });
    }

    function revealAllImmediately() {
      sectionEntries.forEach(({ section, items }) => {
        section.style.setProperty('--section-exit-opacity', '1');
        items.forEach((item) => {
          item.style.setProperty('--enter-stagger', '0');
          item.classList.add('is-entered');
          item.classList.remove('is-exiting');
          item.style.setProperty('--exit-scale', '1');
          item.style.setProperty('--exit-opacity', '1');
        });
      });
    }

    function updateProgressAndNav() {
      const docHeight = document.documentElement.scrollHeight - global.innerHeight;
      const ratio = docHeight > 0 ? clamp(global.scrollY / docHeight, 0, 1) : 0;
      if (progressBar) {
        progressBar.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }

      const headerOffset = (headerEl ? headerEl.offsetHeight : 68) + 90;
      let activeId = sections[0] ? sections[0].id : '';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerOffset) {
          activeId = section.id;
        }
      });

      navLinks.forEach((link) => {
        const isMatch = link.getAttribute('data-nav-target') === activeId;
        link.classList.toggle('is-active', isMatch);
        if (isMatch) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    function updateChoreography() {
      if (motionQuery.matches) {
        root.classList.remove('js-motion-enabled');
        revealAllImmediately();
        return;
      }

      root.classList.add('js-motion-enabled');
      const vh = global.innerHeight || 800;
      const headerHeight = headerEl ? headerEl.offsetHeight : 68;
      let newlyEnteredCount = 0;

      sectionEntries.forEach(({ section, items }) => {
        const secRect = section.getBoundingClientRect();

        // Evita lecturas innecesarias de geometría en secciones muy por debajo del viewport
        if (secRect.top > vh + 160) {
          section.style.setProperty('--section-exit-opacity', '1');
          return;
        }

        // Desvanecimiento gradual a nivel de sección cuando la parte inferior abandona la zona superior
        const sectionExitZone = Math.min(vh * 0.42, 340);
        let sectionProgress = 0;
        if (secRect.bottom < sectionExitZone) {
          sectionProgress = clamp(
            (sectionExitZone - secRect.bottom) / Math.max(sectionExitZone - headerHeight * 0.5, 140),
            0,
            1
          );
        }
        const sectionOpacity = 1 - easeOutQuad(sectionProgress) * 0.85;
        section.style.setProperty('--section-exit-opacity', sectionOpacity.toFixed(3));

        items.forEach((item, idx) => {
          if (item.classList.contains('is-hidden')) return;
          const rect = item.getBoundingClientRect();

          // Entrada independiente escalonada por lote visible (evita demoras acumuladas en secciones largas)
          if (!item.classList.contains('is-entered') && rect.top < vh * 0.92 && rect.bottom > 0) {
            item.style.setProperty('--enter-stagger', String(Math.min(newlyEnteredCount, 5)));
            item.classList.add('is-entered');
            newlyEnteredCount += 1;
          }

          // Salida individual hacia su propio centro (transform-origin: center center) con escalonado ligero
          // Umbral escalado con la altura del viewport para evitar desvanecimientos tempranos en móvil
          const staggerShift = (idx % 6) * (vh < 700 ? 7 : 11);
          const exitBand = Math.min(76, vh * 0.085);
          const exitStartY = headerHeight + exitBand + staggerShift;
          const exitSpan = Math.max(rect.height * 0.85 + 70, 120);

          let rawExit = 0;
          if (rect.bottom < exitStartY) {
            rawExit = clamp((exitStartY - rect.bottom) / exitSpan, 0, 1);
          }

          const combined = Math.max(rawExit, sectionProgress * 0.72);
          const eased = easeOutQuad(clamp(combined, 0, 1));

          if (eased > 0.01) {
            item.classList.add('is-exiting');
            const scale = 1 - eased * 0.13;
            const opacity = 1 - eased * 0.92;
            item.style.setProperty('--exit-scale', scale.toFixed(4));
            item.style.setProperty('--exit-opacity', opacity.toFixed(3));
          } else {
            item.classList.remove('is-exiting');
            item.style.setProperty('--exit-scale', '1');
            item.style.setProperty('--exit-opacity', '1');
          }
        });
      });
    }

    function tick() {
      rafPending = false;
      updateProgressAndNav();
      updateChoreography();
    }

    function requestTick() {
      if (!rafPending) {
        rafPending = true;
        global.requestAnimationFrame(tick);
      }
    }

    buildSectionMap();
    tick();

    global.addEventListener('scroll', requestTick, { passive: true });
    global.addEventListener('resize', requestTick, { passive: true });

    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', requestTick);
    }

    return {
      refresh: function () {
        buildSectionMap();
        requestTick();
      }
    };
  };
})(window);
