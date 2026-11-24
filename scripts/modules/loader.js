(function (global) {
  'use strict';

  const DraftPortfolio = (global.DraftPortfolio = global.DraftPortfolio || {});

  DraftPortfolio.initDraftLoader = function (onReady) {
    const preloader = document.getElementById('draft-preloader');
    const skipBtn = document.getElementById('skip-preloader-btn');
    const motionQuery = global.matchMedia('(prefers-reduced-motion: reduce)');

    let dismissed = false;

    function onBootKeyDown(event) {
      if (event.key === 'Escape' && !dismissed) {
        finishBoot();
      }
    }

    function finishBoot() {
      if (dismissed) return;
      dismissed = true;
      document.removeEventListener('keydown', onBootKeyDown);

      if (!preloader) {
        if (typeof onReady === 'function') onReady();
        return;
      }

      if (motionQuery.matches) {
        preloader.setAttribute('hidden', '');
        if (typeof onReady === 'function') onReady();
        return;
      }

      preloader.classList.add('is-leaving');

      global.setTimeout(() => {
        if (typeof onReady === 'function') onReady();
      }, 140);

      global.setTimeout(() => {
        preloader.setAttribute('hidden', '');
      }, 400);
    }

    if (preloader) {
      if (motionQuery.matches) {
        finishBoot();
      } else {
        global.setTimeout(finishBoot, 720);
      }

      if (skipBtn) {
        skipBtn.addEventListener('click', finishBoot);
      }

      document.addEventListener('keydown', onBootKeyDown);
    } else if (typeof onReady === 'function') {
      onReady();
    }
  };
})(window);
