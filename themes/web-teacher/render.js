
(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('web-teacher', {
    meta: {
      label: 'Teacher',
      layout: 'teacher-banner',
      allowed: ['web'],
      colors: ['#eab308', '#1c1408'],
      desc: 'Banner + accent-bar sections',
      defaults: {
        accent: '#eab308', header: '#1c1408', text: '#fffbeb',
        muted: '#d6c48a', skill: '#422006', card: '#2a1f0c'
      }
    },
    css: 'themes/web-teacher/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs, buildProjects } = H();
      const skills = buildSkills(d);
      const projectsHtml = buildProjects(d);
      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `<div class="te-item"><h3>${escapeHtml(e.title) || 'Role'}</h3>
          <div class="te-meta">${escapeHtml(e.company)} · ${period}</div>
          ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}</div>`;
      }).join('');
      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `<div class="te-item"><h3>${escapeHtml(e.degree) || 'Degree'}</h3>
          <div class="te-meta">${escapeHtml(e.school)} · ${period}</div></div>`;
      }).join('');
      return `
        <div class="te-page">
          <header class="te-banner">
            <div class="te-banner-text">
              <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
              <p class="te-role">${escapeHtml(d.jobTitle)}</p>
            </div>
            <div class="te-banner-contact">${buildContactLine(d)}</div>
          </header>
          <div class="te-body">
            ${d.summary ? `<section class="te-sec"><h2>About</h2><p>${nl2br(d.summary)}</p></section>` : ''}
            ${exp ? `<section class="te-sec"><h2>Teaching experience</h2>${exp}</section>` : ''}
            ${edu ? `<section class="te-sec"><h2>Education</h2>${edu}</section>` : ''}
            ${projectsHtml ? `<section class="te-sec"><h2>Programs & projects</h2><div class="proj-grid">${projectsHtml}</div></section>` : ''}
            ${skills ? `<section class="te-sec"><h2>Expertise</h2><div class="skills-list">${skills}</div></section>` : ''}
            ${buildLangs(d) ? `<section class="te-sec"><h2>Languages</h2><div class="lang-list">${buildLangs(d)}</div></section>` : ''}
            ${d.email ? `<a class="px-btn" href="mailto:${escapeHtml(d.email)}">Get in touch</a>` : ''}
          </div>
        </div>`;
    }
  });
})();
