/**
 * Theme: Web Hero – portfolio landing page
 * Web CV only
 */
(function () {
  const H = () => window.CVHelpers;

  CVThemes.register('web-hero', {
    meta: {
      label: 'Web Hero',
      layout: 'web-hero',
      allowed: ['web'],
      colors: ['#6366f1', '#0f172a'],
      desc: 'Full portfolio landing – centered hero + timeline',
      defaults: {
        accent: '#6366f1', header: '#1e1b4b', text: '#0f172a',
        muted: '#64748b', skill: '#e0e7ff', card: '#f8fafc'
      }
    },
    css: 'themes/web-hero/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs , buildProjects } = H();
      const contact = buildContactLine(d);
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const projectsHtml = buildProjects(d);

      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `
          <div class="wh-item">
            <h3>${escapeHtml(e.title) || 'Position'}</h3>
            <div class="wh-meta">${escapeHtml(e.company)}${e.company && period ? ' · ' : ''}${period}</div>
            ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}
          </div>`;
      }).join('');

      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `
          <div class="wh-item">
            <h3>${escapeHtml(e.degree) || 'Degree'}</h3>
            <div class="wh-meta">${escapeHtml(e.school)}${e.school && period ? ' · ' : ''}${period}</div>
          </div>`;
      }).join('');

      return `
        <div class="layout-web-hero">
          <header class="wh-hero">
            <div class="wh-hero-inner">
              <span class="wh-badge">Portfolio</span>
              <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
              <p class="wh-role">${escapeHtml(d.jobTitle)}</p>
              <div class="wh-contact">${contact}</div>
            </div>
          </header>
          <div class="wh-body">
            ${d.summary ? `<section class="wh-section"><h2>About me</h2><p class="wh-about">${nl2br(d.summary)}</p></section>` : ''}
            ${exp ? `<section class="wh-section"><h2>Experience</h2><div class="wh-timeline">${exp}</div></section>` : ''}
            ${edu ? `<section class="wh-section"><h2>Education</h2><div class="wh-timeline">${edu}</div></section>` : ''}
            ${projectsHtml ? `<section class="wh-section"><h2>Projects</h2><div class="proj-grid">${projectsHtml}</div></section>` : ''}
            ${skills ? `<section class="wh-section"><h2>Skills</h2><div class="skills-list">${skills}</div></section>` : ''}
            ${langs ? `<section class="wh-section"><h2>Languages</h2><div class="lang-list">${langs}</div></section>` : ''}
          </div>
        </div>`;
    }
  });
})();
