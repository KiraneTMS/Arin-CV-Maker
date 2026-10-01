/**
 * Theme: Web Cards – bento card portfolio page
 * Web CV only
 */
(function () {
  const H = () => window.CVHelpers;

  CVThemes.register('web-cards', {
    meta: {
      label: 'Web Cards',
      layout: 'web-cards',
      allowed: ['web'],
      colors: ['#f43f5e', '#1c1917'],
      desc: 'Bento-style card portfolio page',
      defaults: {
        accent: '#f43f5e', header: '#1c1917', text: '#1c1917',
        muted: '#78716c', skill: '#ffe4e6', card: '#ffffff'
      }
    },
    css: 'themes/web-cards/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs , buildProjects } = H();
      const contact = buildContactLine(d);
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const projectsHtml = buildProjects(d);

      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `
          <div class="wc-item">
            <h3>${escapeHtml(e.title) || 'Position'}</h3>
            <div class="wc-meta">${escapeHtml(e.company)}${e.company && period ? ' · ' : ''}${period}</div>
            ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}
          </div>`;
      }).join('');

      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `
          <div class="wc-item">
            <h3>${escapeHtml(e.degree) || 'Degree'}</h3>
            <div class="wc-meta">${escapeHtml(e.school)}${e.school && period ? ' · ' : ''}${period}</div>
          </div>`;
      }).join('');

      return `
        <div class="layout-web-cards">
          <div class="wc-bento">
            <header class="wc-card wc-hero">
              <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
              <p class="wc-role">${escapeHtml(d.jobTitle)}</p>
              <div class="wc-contact">${contact}</div>
            </header>
            ${d.summary ? `
              <section class="wc-card">
                <h2>About</h2>
                <p class="wc-about">${nl2br(d.summary)}</p>
              </section>` : ''}
            ${skills || langs ? `
              <section class="wc-card">
                ${skills ? `<h2>Skills</h2><div class="skills-list" style="margin-bottom:${langs ? '1rem' : '0'}">${skills}</div>` : ''}
                ${langs ? `<h2>Languages</h2><div class="lang-list">${langs}</div>` : ''}
              </section>` : ''}
            ${projectsHtml ? `
              <section class="wc-card">
                <h2>Projects</h2>
                <div class="proj-grid">${projectsHtml}</div>
              </section>` : ''}
            ${exp ? `
              <section class="wc-card">
                <h2>Experience</h2>
                ${exp}
              </section>` : ''}
            ${edu ? `
              <section class="wc-card">
                <h2>Education</h2>
                ${edu}
              </section>` : ''}
          </div>
        </div>`;
    }
  });
})();
