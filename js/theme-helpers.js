/**
 * Shared helpers for all theme renderers.
 * Themes call window.CVHelpers.*
 */
(function () {
  function formatMonth(ym) {
    if (!ym) return '';
    const [y, m] = ym.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(m, 10) - 1]} ${y}`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function nl2br(str) {
    return escapeHtml(str).replace(/\n/g, '<br>');
  }

  function buildContactLine(d) {
    const parts = [];
    if (d.email) parts.push(escapeHtml(d.email));
    if (d.phone) parts.push(escapeHtml(d.phone));
    if (d.location) parts.push(escapeHtml(d.location));
    if (d.website) {
      const label = d.website.replace(/^https?:\/\//, '');
      parts.push(`<a href="${escapeHtml(d.website)}" target="_blank">${escapeHtml(label)}</a>`);
    }
    if (d.linkedin) {
      parts.push(`<a href="${escapeHtml(d.linkedin)}" target="_blank">LinkedIn</a>`);
    }
    return parts.join(' · ');
  }

  function buildSkills(d) {
    if (!d.skills) return '';
    return d.skills.split(',').map(s => s.trim()).filter(Boolean)
      .map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('');
  }

  function buildLangs(d) {
    if (!d.languages) return '';
    return d.languages.split(',').map(s => s.trim()).filter(Boolean)
      .map(s => `<span class="lang-tag">${escapeHtml(s)}</span>`).join('');
  }

  function buildExperience(d, variant) {
    return (d.experience || []).map(e => {
      const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
      if (variant === 'minimal') {
        return `
          <div class="cv-item">
            <h3>${escapeHtml(e.title) || 'Position'}</h3>
            <div class="meta">${period}</div>
            ${e.company ? `<div class="company">${escapeHtml(e.company)}</div>` : ''}
            ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}
          </div>`;
      }
      return `
        <div class="cv-item">
          <h3>${escapeHtml(e.title) || 'Position'}</h3>
          <div class="meta">${escapeHtml(e.company)}${e.company && period ? ' · ' : ''}${period}</div>
          ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}
        </div>`;
    }).join('');
  }

  function buildEducation(d, variant) {
    return (d.education || []).map(e => {
      const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
      if (variant === 'minimal') {
        return `
          <div class="cv-item">
            <h3>${escapeHtml(e.degree) || 'Degree'}</h3>
            <div class="meta">${period}</div>
            ${e.school ? `<div class="company">${escapeHtml(e.school)}</div>` : ''}
          </div>`;
      }
      return `
        <div class="cv-item">
          <h3>${escapeHtml(e.degree) || 'Degree'}</h3>
          <div class="meta">${escapeHtml(e.school)}${e.school && period ? ' · ' : ''}${period}</div>
        </div>`;
    }).join('');
  }

  
  function buildProjects(d) {
    return (d.projects || []).filter(p => p.name || p.desc || p.image).map(p => {
      const tech = (p.tech || '').split(',').map(s => s.trim()).filter(Boolean)
        .map(t => `<span>${escapeHtml(t)}</span>`).join('');
      const link = p.url
        ? `<a class="proj-link" href="${escapeHtml(p.url)}" target="_blank" rel="noopener">View project</a>`
        : '';
      const img = p.image
        ? `<div class="proj-img"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name) || 'Project'}" loading="lazy" /></div>`
        : '';
      return `
        <article class="proj-card">
          ${img}
          <div class="proj-body">
            <h3>${escapeHtml(p.name) || 'Project'}</h3>
            ${p.role ? `<div class="proj-role">${escapeHtml(p.role)}</div>` : ''}
            ${p.desc ? `<p>${nl2br(p.desc)}</p>` : ''}
            ${tech ? `<div class="proj-tech">${tech}</div>` : ''}
            ${link}
          </div>
        </article>`;
    }).join('');
  }

  function buildPhoto(d, cls) {
    if (!d.photo) return '';
    const c = cls || 'cv-photo';
    return `<img class="${c}" src="${escapeHtml(d.photo)}" alt="${escapeHtml(d.fullName) || 'Photo'}" />`;
  }

  window.CVHelpers = {
    formatMonth, escapeHtml, nl2br,
    buildContactLine, buildSkills, buildLangs,
    buildExperience, buildEducation, buildProjects, buildPhoto
  };

  /** Theme registry: each theme file calls CVThemes.register(id, def) */
  window.CVThemes = {
    _map: {},
    register(id, def) {
      this._map[id] = def;
    },
    get(id) {
      return this._map[id] || null;
    },
    all() {
      return { ...this._map };
    },
    ids() {
      return Object.keys(this._map);
    }
  };
})();
