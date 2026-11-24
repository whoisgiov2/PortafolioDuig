(function (global) {
  'use strict';

  const DraftPortfolio = (global.DraftPortfolio = global.DraftPortfolio || {});
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const TAPERED_PATH_D =
    'M2.5 5.6C1.5 4.0 3.6 2.6 8.6 2.4C76 1.2 162 2.2 238 4.9C164 6.3 79 7.6 9.8 7.7C4.5 7.7 3.1 6.6 2.5 5.6Z';

  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof text === 'string') el.textContent = text;
    return el;
  }

  function getIcon(name, className) {
    if (typeof DraftPortfolio.createIcon === 'function') {
      return DraftPortfolio.createIcon(name, className);
    }
    return createEl('span', className);
  }

  function createFocalHeading(tag, className, text) {
    const heading = createEl(tag, className);
    const wrap = createEl('span', 'focal-stroke-wrap', text);

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'card-taper-stroke');
    svg.setAttribute('viewBox', '0 0 240 9');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');

    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', TAPERED_PATH_D);
    path.setAttribute('fill', 'currentColor');

    svg.appendChild(path);
    wrap.appendChild(svg);
    heading.appendChild(wrap);
    return heading;
  }

  function renderSkills(container, skills) {
    if (!container || !Array.isArray(skills)) return;
    const fragment = document.createDocumentFragment();

    skills.forEach((skill) => {
      const card = createEl('article', 'skill-panel interactive-sheet');
      card.setAttribute('tabindex', '0');
      card.setAttribute('data-draft-item', '');
      card.setAttribute('data-seq-card', '');

      const head = createEl('div', 'skill-panel__head seq-step seq-step--1');
      const iconBadge = createEl('span', 'icon-chip icon-chip--sage');
      iconBadge.appendChild(getIcon(skill.icon || 'shield-perimeter', 'draft-icon--skill'));
      head.appendChild(iconBadge);
      head.appendChild(createEl('h3', 'skill-panel__title', skill.title));

      const desc = createEl('p', 'skill-panel__desc seq-step seq-step--2', skill.description);

      const tagRow = createEl('div', 'tag-row seq-step seq-step--3');
      skill.tags.forEach((tagLabel) => {
        const toneClass = skill.tagTone === 'earth' ? 'draft-tag draft-tag--earth' : 'draft-tag';
        tagRow.appendChild(createEl('span', toneClass, tagLabel));
      });

      card.appendChild(head);
      card.appendChild(desc);
      card.appendChild(tagRow);
      fragment.appendChild(card);
    });

    container.replaceChildren(fragment);
  }

  function renderProjects(container, projects) {
    if (!container || !Array.isArray(projects)) return;
    const fragment = document.createDocumentFragment();

    projects.forEach((project) => {
      const card = createEl('article', 'project-card interactive-sheet');
      card.setAttribute('tabindex', '0');
      card.setAttribute('data-draft-item', '');
      card.setAttribute('data-seq-card', '');
      card.setAttribute('data-category', project.category);

      const topRow = createEl('div', 'project-card__top seq-step seq-step--1');
      const catWrap = createEl('div', 'project-card__cat-group');
      const iconChip = createEl('span', 'icon-chip icon-chip--sage');
      iconChip.appendChild(getIcon(project.icon || 'shield-perimeter', 'draft-icon--project'));
      catWrap.appendChild(iconChip);
      catWrap.appendChild(createEl('span', 'meta-badge meta-badge--sage', project.categoryLabel));
      topRow.appendChild(catWrap);

      if (project.repoUrl) {
        const repoLink = createEl('a', 'draft-inline-link');
        repoLink.setAttribute('href', project.repoUrl);
        repoLink.setAttribute('target', '_blank');
        repoLink.setAttribute('rel', 'noopener noreferrer');
        repoLink.setAttribute('aria-label', `Abrir repositorio en GitHub de ${project.title}`);
        repoLink.appendChild(createEl('span', '', 'Repositorio'));
        repoLink.appendChild(getIcon('arrow-up-right', 'draft-icon--arrow'));
        topRow.appendChild(repoLink);
      }

      const title = createFocalHeading('h3', 'project-card__title seq-step seq-step--2', project.title);

      // Diseño editorial limpio sin cajas anidadas: guía lateral fina para Enfoque y Arquitectura
      const specs = createEl('div', 'project-specs seq-step seq-step--3');

      const problemItem = createEl('div', 'project-spec-item');
      problemItem.appendChild(createEl('span', 'project-spec-item__label', 'Problema y enfoque'));
      problemItem.appendChild(createEl('p', 'project-spec-item__text', project.problem));

      const archItem = createEl('div', 'project-spec-item project-spec-item--arch');
      archItem.appendChild(createEl('span', 'project-spec-item__label', 'Técnica y arquitectura'));
      archItem.appendChild(createEl('p', 'project-spec-item__text', project.architecture));

      specs.appendChild(problemItem);
      specs.appendChild(archItem);

      const tagRow = createEl('div', 'tag-row project-card__tags seq-step seq-step--4');
      project.tools.forEach((tool, idx) => {
        const tagClass = idx % 2 === 0 ? 'draft-tag' : 'draft-tag draft-tag--earth';
        tagRow.appendChild(createEl('span', tagClass, tool));
      });

      card.appendChild(topRow);
      card.appendChild(title);
      card.appendChild(specs);
      card.appendChild(tagRow);

      fragment.appendChild(card);
    });

    container.replaceChildren(fragment);
  }

  function renderCertifications(container, certifications) {
    if (!container || !Array.isArray(certifications)) return;
    const fragment = document.createDocumentFragment();

    certifications.forEach((cert, idx) => {
      const card = createEl('article', 'cert-card interactive-sheet cert-card--clickable');
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-haspopup', 'dialog');
      card.setAttribute('aria-label', `Inspeccionar ticket 3D de ${cert.title} (${cert.issuer})`);
      card.setAttribute('data-draft-item', '');
      card.setAttribute('data-seq-card', '');
      card.setAttribute('data-cert-index', String(idx));

      const head = createEl('div', 'cert-card__head seq-step seq-step--1');
      const issuerWrap = createEl('div', 'cert-card__issuer-group');
      const emblem = createEl('span', 'cert-card__emblem');
      emblem.appendChild(getIcon(cert.issuerIcon || 'badge-seal', 'draft-icon--issuer'));
      issuerWrap.appendChild(emblem);
      issuerWrap.appendChild(createEl('span', 'cert-card__issuer', cert.issuer));
      head.appendChild(issuerWrap);

      if (cert.badgeImage) {
        const badgeFrame = createEl('span', 'cert-card__badge-frame');
        const badgeImg = createEl('img', 'cert-card__badge-img');
        badgeImg.setAttribute('src', cert.badgeImage);
        badgeImg.setAttribute('alt', `Insignia oficial de ${cert.title}`);
        badgeImg.setAttribute('width', '48');
        badgeImg.setAttribute('height', '48');
        badgeImg.setAttribute('loading', 'lazy');
        badgeImg.setAttribute('decoding', 'async');
        badgeImg.setAttribute('draggable', 'false');
        badgeFrame.appendChild(badgeImg);
        head.appendChild(badgeFrame);
      } else {
        const fallbackFrame = createEl('span', 'cert-card__badge-frame cert-card__badge-frame--fallback');
        fallbackFrame.setAttribute('aria-hidden', 'true');
        fallbackFrame.appendChild(getIcon('badge-seal', 'cert-card__badge-svg'));
        head.appendChild(fallbackFrame);
      }

      const title = createFocalHeading('h3', 'cert-card__title seq-step seq-step--2', cert.title);
      const focus = createEl('p', 'cert-card__focus seq-step seq-step--3', cert.focus);

      card.appendChild(head);
      card.appendChild(title);
      card.appendChild(focus);

      const footer = createEl('div', 'cert-card__footer seq-step seq-step--4');
      const inspectLabel = createEl('span', 'cert-card__verify-link');
      inspectLabel.appendChild(createEl('span', '', 'Inspeccionar ticket 3D'));
      inspectLabel.appendChild(getIcon('arrow-up-right', 'draft-icon--arrow'));
      footer.appendChild(inspectLabel);
      card.appendChild(footer);

      fragment.appendChild(card);
    });

    container.replaceChildren(fragment);
  }

  DraftPortfolio.renderAll = function () {
    const data = DraftPortfolio.DATA;
    renderSkills(document.getElementById('skills-grid'), data.skills);
    renderProjects(document.getElementById('projects-grid'), data.projects);
    renderCertifications(document.getElementById('certifications-grid'), data.certifications);

    if (Array.isArray(data.certifications)) {
      const formattedCount = String(data.certifications.length).padStart(2, '0');
      document.querySelectorAll('[data-cert-count]').forEach((node) => {
        node.textContent = formattedCount;
      });
    }
  };
})(window);
