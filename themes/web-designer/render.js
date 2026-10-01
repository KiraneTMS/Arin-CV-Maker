
(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('web-designer', {
    meta: {
      label: 'Designer',
      layout: 'designer-work-first',
      allowed: ['web'],
      colors: ['#d946ef', '#1a1025'],
      desc: 'Work-first creative layout',
      defaults: {
        accent: '#d946ef', header: '#1a1025', text: '#faf5ff',
        muted: '#c4b5d0', skill: '#2e1065', card: '#1e1033'
      }
    },
    css: 'themes/web-designer/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs, buildProjects } = H();
      const skills = buildSkills(d);
      const projectsHtml = buildProjects(d);
      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `<div class="dg-row"><div class="dg-when">${period}</div><div class="dg-what">
          <h3>${escapeHtml(e.title) || 'Role'}</h3><div class="dg-co">${escapeHtml(e.company)}</div>
          ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}</div></div>`;
      }).join('');
      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `<div class="dg-row"><div class="dg-when">${period}</div><div class="dg-what">
          <h3>${escapeHtml(e.degree) || 'Degree'}</h3><div class="dg-co">${escapeHtml(e.school)}</div></div></div>`;
      }).join('');
      return `
        <div class="dg-page">
          <header class="dg-hero">
            <p class="dg-label">Designer</p>
            <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
            <p class="dg-role">${escapeHtml(d.jobTitle)}</p>
            <div class="dg-contact">${buildContactLine(d)}</div>
          </header>
          ${projectsHtml ? `<section class="dg-sec"><h2>Selected work</h2><div class="dg-work proj-grid">${projectsHtml}</div></section>` : ''}
          ${d.summary ? `<section class="dg-sec dg-about"><h2>About</h2><p>${nl2br(d.summary)}</p></section>` : ''}
          ${exp ? `<section class="dg-sec"><h2>Experience</h2><div class="dg-timeline">${exp}</div></section>` : ''}
          ${edu ? `<section class="dg-sec"><h2>Education</h2><div class="dg-timeline">${edu}</div></section>` : ''}
          ${skills ? `<section class="dg-sec"><h2>Toolkit</h2><div class="skills-list">${skills}</div></section>` : ''}
          ${d.email ? `<div class="dg-foot"><a class="px-btn" href="mailto:${escapeHtml(d.email)}">Start a project</a></div>` : ''}
        </div>`;
    }
  });
})();
