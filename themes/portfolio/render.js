/**
 * Theme: Portfolio
 * Edit this file + style.css to fully customize this theme.
 * This is the most "web portfolio" style theme.
 */
(function () {
  const H = () => window.CVHelpers;

  CVThemes.register('portfolio', {
    meta: {
      label: 'Portfolio',
      layout: 'portfolio',
      allowed: ['web'],
      colors: ['#0f172a', '#38bdf8'],
      desc: 'Modern web portfolio – hero + cards',
      defaults: {
        accent: '#0ea5e9', header: '#0f172a', text: '#0f172a',
        muted: '#64748b', skill: '#e0f2fe', card: '#f8fafc'
      }
    },
    css: 'themes/portfolio/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs , buildProjects } = H();
      const contact = buildContactLine(d);
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const projectsHtml = buildProjects(d);

      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `
          <article class="pf-card">
            <div class="pf-card-head">
              <h3>${escapeHtml(e.title) || 'Position'}</h3>
              <span class="pf-period">${period}</span>
            </div>
            ${e.company ? `<div class="pf-company">${escapeHtml(e.company)}</div>` : ''}
            ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}
          </article>`;
      }).join('');

      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `
          <article class="pf-card pf-card-sm">
            <div class="pf-card-head">
              <h3>${escapeHtml(e.degree) || 'Degree'}</h3>
              <span class="pf-period">${period}</span>
            </div>
            ${e.school ? `<div class="pf-company">${escapeHtml(e.school)}</div>` : ''}
          </article>`;
      }).join('');

      return `
        <div class="layout-portfolio">
          <header class="pf-hero">
            <div class="pf-hero-inner">
              <p class="pf-eyebrow">Portfolio</p>
              <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
              <p class="pf-role">${escapeHtml(d.jobTitle)}</p>
              <div class="pf-contact">${contact}</div>
            </div>
          </header>
          <div class="pf-body">
            ${d.summary ? `
              <section class="pf-section">
                <h2>About</h2>
                <p class="pf-about">${nl2br(d.summary)}</p>
              </section>` : ''}
            ${exp ? `
              <section class="pf-section">
                <h2>Experience</h2>
                <div class="pf-cards">${exp}</div>
              </section>` : ''}
            ${edu ? `
              <section class="pf-section">
                <h2>Education</h2>
                <div class="pf-cards">${edu}</div>
              </section>` : ''}
            ${projectsHtml ? `
              <section class="pf-section">
                <h2>Projects</h2>
                <div class="pf-cards proj-grid">${projectsHtml}</div>
              </section>` : ''}
            ${skills ? `
              <section class="pf-section">
                <h2>Skills</h2>
                <div class="skills-list">${skills}</div>
              </section>` : ''}
            ${langs ? `
              <section class="pf-section">
                <h2>Languages</h2>
                <div class="lang-list">${langs}</div>
              </section>` : ''}
          </div>
        </div>`;
    }
  });
})();
