/**
 * Theme: Web Dark – dark portfolio page
 * Web CV only
 */
(function () {
  const H = () => window.CVHelpers;

  CVThemes.register('web-dark', {
    meta: {
      label: 'Web Dark',
      layout: 'web-dark',
      allowed: ['web'],
      colors: ['#22d3ee', '#0f172a'],
      desc: 'Dark portfolio page with card grid',
      defaults: {
        accent: '#22d3ee', header: '#0f172a', text: '#e2e8f0',
        muted: '#94a3b8', skill: '#164e63', card: '#1e293b'
      }
    },
    css: 'themes/web-dark/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs , buildProjects } = H();
      const contact = buildContactLine(d);
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const projectsHtml = buildProjects(d);

      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `
          <article class="wd-card">
            <h3>${escapeHtml(e.title) || 'Position'}</h3>
            <div class="wd-meta">${escapeHtml(e.company)}${e.company && period ? ' · ' : ''}${period}</div>
            ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}
          </article>`;
      }).join('');

      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `
          <article class="wd-card">
            <h3>${escapeHtml(e.degree) || 'Degree'}</h3>
            <div class="wd-meta">${escapeHtml(e.school)}${e.school && period ? ' · ' : ''}${period}</div>
          </article>`;
      }).join('');

      return `
        <div class="layout-web-dark">
          <header class="wd-top">
            <div>
              <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
              <p class="wd-role">${escapeHtml(d.jobTitle)}</p>
            </div>
            <div class="wd-contact">${contact}</div>
          </header>
          <div class="wd-body">
            ${d.summary ? `<section class="wd-section"><h2>About</h2><p class="wd-about">${nl2br(d.summary)}</p></section>` : ''}
            ${projectsHtml ? `<section class="wd-section"><h2>Projects</h2><div class="wd-grid proj-grid">${projectsHtml}</div></section>` : ''}
            ${exp ? `<section class="wd-section"><h2>Experience</h2><div class="wd-grid">${exp}</div></section>` : ''}
            ${edu ? `<section class="wd-section"><h2>Education</h2><div class="wd-grid">${edu}</div></section>` : ''}
            ${skills ? `<section class="wd-section"><h2>Skills</h2><div class="skills-list">${skills}</div></section>` : ''}
            ${langs ? `<section class="wd-section"><h2>Languages</h2><div class="lang-list">${langs}</div></section>` : ''}
          </div>
        </div>`;
    }
  });
})();
