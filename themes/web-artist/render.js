
(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('web-artist', {
    meta: {
      label: 'Artist',
      layout: 'artist-stack',
      allowed: ['web'],
      colors: ['#f97316', '#1c1410'],
      desc: 'Centered gallery stack',
      defaults: {
        accent: '#f97316', header: '#1c1410', text: '#fff7ed',
        muted: '#d6c4b0', skill: '#292018', card: '#292018'
      }
    },
    css: 'themes/web-artist/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildProjects } = H();
      const skills = buildSkills(d);
      const projectsHtml = buildProjects(d);
      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `<li><strong>${escapeHtml(e.title) || 'Role'}</strong> — ${escapeHtml(e.company)} <em>${period}</em>
          ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}</li>`;
      }).join('');
      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `<li><strong>${escapeHtml(e.degree) || 'Study'}</strong> — ${escapeHtml(e.school)} <em>${period}</em></li>`;
      }).join('');
      return `
        <div class="ar-page">
          <header class="ar-head">
            <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
            <p class="ar-role">${escapeHtml(d.jobTitle)}</p>
            <div class="ar-line"></div>
            <div class="ar-contact">${buildContactLine(d)}</div>
          </header>
          ${d.summary ? `<section class="ar-block"><h2>Statement</h2><p class="ar-statement">${nl2br(d.summary)}</p></section>` : ''}
          ${projectsHtml ? `<section class="ar-block"><h2>Works</h2><div class="ar-works proj-grid">${projectsHtml}</div></section>` : ''}
          ${exp ? `<section class="ar-block"><h2>Experience</h2><ul class="ar-list">${exp}</ul></section>` : ''}
          ${edu ? `<section class="ar-block"><h2>Education</h2><ul class="ar-list">${edu}</ul></section>` : ''}
          ${skills ? `<section class="ar-block"><h2>Mediums</h2><div class="skills-list">${skills}</div></section>` : ''}
          ${d.email ? `<div class="ar-cta"><a class="px-btn" href="mailto:${escapeHtml(d.email)}">Commission inquiry</a></div>` : ''}
        </div>`;
    }
  });
})();
