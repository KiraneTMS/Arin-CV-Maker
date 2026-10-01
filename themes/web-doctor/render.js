
(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('web-doctor', {
    meta: {
      label: 'Doctor',
      layout: 'doctor-formal',
      allowed: ['web'],
      colors: ['#14b8a6', '#0c1a18'],
      desc: 'Formal experience-first layout',
      defaults: {
        accent: '#14b8a6', header: '#0c1a18', text: '#f0fdfa',
        muted: '#99b8b3', skill: '#134e4a', card: '#132926'
      }
    },
    css: 'themes/web-doctor/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs, buildProjects } = H();
      const skills = buildSkills(d);
      const projectsHtml = buildProjects(d);
      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `<article class="md-card"><h3>${escapeHtml(e.title) || 'Position'}</h3>
          <div class="md-meta">${escapeHtml(e.company)} · ${period}</div>
          ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}</article>`;
      }).join('');
      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `<article class="md-card"><h3>${escapeHtml(e.degree) || 'Qualification'}</h3>
          <div class="md-meta">${escapeHtml(e.school)} · ${period}</div></article>`;
      }).join('');
      return `
        <div class="md-page">
          <header class="md-header">
            <div class="md-header-inner">
              <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
              <p class="md-role">${escapeHtml(d.jobTitle)}</p>
              <div class="md-contact">${buildContactLine(d)}</div>
            </div>
          </header>
          <div class="md-body">
            ${d.summary ? `<section class="md-sec"><h2>Professional summary</h2><p>${nl2br(d.summary)}</p></section>` : ''}
            ${exp ? `<section class="md-sec"><h2>Clinical experience</h2><div class="md-stack">${exp}</div></section>` : ''}
            ${edu ? `<section class="md-sec"><h2>Education & training</h2><div class="md-stack">${edu}</div></section>` : ''}
            ${projectsHtml ? `<section class="md-sec"><h2>Research & projects</h2><div class="proj-grid">${projectsHtml}</div></section>` : ''}
            <div class="md-two">
              ${skills ? `<section class="md-sec"><h2>Specialties</h2><div class="skills-list">${skills}</div></section>` : ''}
              ${buildLangs(d) ? `<section class="md-sec"><h2>Languages</h2><div class="lang-list">${buildLangs(d)}</div></section>` : ''}
            </div>
            ${d.email ? `<a class="px-btn" href="mailto:${escapeHtml(d.email)}">Professional inquiry</a>` : ''}
          </div>
        </div>`;
    }
  });
})();
