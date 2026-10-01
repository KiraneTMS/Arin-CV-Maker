
(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('web-magazine', {
    meta: {
      label: 'Web Magazine',
      layout: 'magazine',
      allowed: ['web'],
      colors: ['#ea580c', '#fffaf5'],
      desc: 'Editorial magazine-style portfolio page',
      defaults: {
        accent: '#ea580c', header: '#ffffff', text: '#1c1917',
        muted: '#78716c', skill: '#ffedd5', card: '#ffffff'
      }
    },
    css: 'themes/web-magazine/style.css',
    render(d) {
      const projectsHtml = (H().buildProjects || function(){return '';})(d);
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs , buildProjects } = H();
      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `<div class="wm-item"><h3>${escapeHtml(e.title) || 'Position'}</h3>
          <div class="meta">${escapeHtml(e.company)}${e.company && period ? ' · ' : ''}${period}</div>
          ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}</div>`;
      }).join('');
      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `<div class="wm-item"><h3>${escapeHtml(e.degree) || 'Degree'}</h3>
          <div class="meta">${escapeHtml(e.school)}${e.school && period ? ' · ' : ''}${period}</div></div>`;
      }).join('');
      return `
        <div class="wm-wrap">
          <header class="wm-masthead">
            <p class="wm-kicker">Portfolio</p>
            <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
            <div class="title">${escapeHtml(d.jobTitle)}</div>
            <div class="contact">${buildContactLine(d)}</div>
          </header>
          <div class="wm-body">
            ${d.summary ? `<section class="wm-section"><h2>About</h2><p class="wm-about">${nl2br(d.summary)}</p></section>` : ''}
            ${projectsHtml ? `<section class="wm-section"><h2>Projects</h2><div class="proj-grid">${projectsHtml}</div></section>` : ''}
            ${exp ? `<section class="wm-section"><h2>Experience</h2>${exp}</section>` : ''}
            ${edu ? `<section class="wm-section"><h2>Education</h2>${edu}</section>` : ''}
            ${buildSkills(d) ? `<section class="wm-section"><h2>Skills</h2><div class="skills-list">${buildSkills(d)}</div></section>` : ''}
            ${buildLangs(d) ? `<section class="wm-section"><h2>Languages</h2><div class="lang-list">${buildLangs(d)}</div></section>` : ''}
          </div>
        </div>`;
    }
  });
})();
