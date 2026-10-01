/**
 * Theme: Web Split – profile rail + content (portfolio site)
 * Web CV only
 */
(function () {
  const H = () => window.CVHelpers;

  CVThemes.register('web-split', {
    meta: {
      label: 'Web Split',
      layout: 'web-split',
      allowed: ['web'],
      colors: ['#14b8a6', '#0f766e'],
      desc: 'Left profile rail + right content – site style',
      defaults: {
        accent: '#14b8a6', header: '#0f766e', text: '#134e4a',
        muted: '#5b8a84', skill: '#ccfbf1', card: '#f0fdfa'
      }
    },
    css: 'themes/web-split/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildSkills, buildLangs , buildProjects } = H();
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const projectsHtml = buildProjects(d);
      const initial = (d.fullName || 'U').trim().charAt(0).toUpperCase();

      const contactItems = [];
      if (d.email) contactItems.push(`<div class="ws-contact-item">${escapeHtml(d.email)}</div>`);
      if (d.phone) contactItems.push(`<div class="ws-contact-item">${escapeHtml(d.phone)}</div>`);
      if (d.location) contactItems.push(`<div class="ws-contact-item">${escapeHtml(d.location)}</div>`);
      if (d.website) contactItems.push(`<div class="ws-contact-item"><a href="${escapeHtml(d.website)}" target="_blank">${escapeHtml(d.website.replace(/^https?:\/\//,''))}</a></div>`);
      if (d.linkedin) contactItems.push(`<div class="ws-contact-item"><a href="${escapeHtml(d.linkedin)}" target="_blank">LinkedIn</a></div>`);

      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `
          <div class="ws-item">
            <h3>${escapeHtml(e.title) || 'Position'}</h3>
            <div class="ws-meta">${escapeHtml(e.company)}${e.company && period ? ' · ' : ''}${period}</div>
            ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}
          </div>`;
      }).join('');

      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `
          <div class="ws-item">
            <h3>${escapeHtml(e.degree) || 'Degree'}</h3>
            <div class="ws-meta">${escapeHtml(e.school)}${e.school && period ? ' · ' : ''}${period}</div>
          </div>`;
      }).join('');

      return `
        <div class="layout-web-split">
          <aside class="ws-rail">
            <div class="ws-avatar">${escapeHtml(initial)}</div>
            <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
            <div class="ws-role">${escapeHtml(d.jobTitle)}</div>
            ${contactItems.length ? `<h2>Contact</h2>${contactItems.join('')}` : ''}
            ${skills ? `<h2>Skills</h2><div>${skills}</div>` : ''}
            ${langs ? `<h2>Languages</h2><div>${langs}</div>` : ''}
          </aside>
          <div class="ws-main">
            ${d.summary ? `<section class="ws-section"><h2>About</h2><p>${nl2br(d.summary)}</p></section>` : ''}
            ${projectsHtml ? `<section class="ws-section"><h2>Projects</h2><div class="proj-grid">${projectsHtml}</div></section>` : ''}
            ${exp ? `<section class="ws-section"><h2>Experience</h2>${exp}</section>` : ''}
            ${edu ? `<section class="ws-section"><h2>Education</h2>${edu}</section>` : ''}
          </div>
        </div>`;
    }
  });
})();
