
(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('designed-bold', {
    meta: {
      label: 'Designed Bold',
      layout: 'bold',
      allowed: ['designed'],
      colors: ['#dc2626', '#18181b'],
      desc: 'Strong accent bar + bold type',
      defaults: {
        accent: '#dc2626', header: '#ffffff', text: '#18181b',
        muted: '#71717a', skill: '#fee2e2', card: '#ffffff'
      }
    },
    css: 'themes/designed-bold/style.css',
    render(d) {
      const { escapeHtml, nl2br, buildContactLine, buildSkills, buildLangs, buildExperience, buildEducation } = H();
      const exp = buildExperience(d);
      const edu = buildEducation(d);
      return `
        <div class="layout-db">
          <div class="db-bar"></div>
          <div class="db-content">
            <div class="db-header">
              <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
              <div class="title">${escapeHtml(d.jobTitle)}</div>
              <div class="contact">${buildContactLine(d)}</div>
            </div>
            ${d.summary ? `<div class="db-section"><h2>Summary</h2><p>${nl2br(d.summary)}</p></div>` : ''}
            ${exp ? `<div class="db-section"><h2>Experience</h2>${exp.replace(/cv-item/g,'db-item').replace(/class="meta"/g,'class="meta"')}</div>` : ''}
            ${edu ? `<div class="db-section"><h2>Education</h2>${edu.replace(/cv-item/g,'db-item')}</div>` : ''}
            ${buildSkills(d) ? `<div class="db-section"><h2>Skills</h2><div class="skills-list">${buildSkills(d)}</div></div>` : ''}
            ${buildLangs(d) ? `<div class="db-section"><h2>Languages</h2><div class="lang-list">${buildLangs(d)}</div></div>` : ''}
          </div>
        </div>`;
    }
  });
})();
