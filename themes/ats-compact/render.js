(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('ats-compact', {
    meta: {
      label: 'ATS Compact',
      layout: 'single',
      allowed: ['ats'],
      colors: ['#111111', '#eeeeee'],
      desc: 'Dense ATS-safe single column',
      defaults: {
        accent: '#111111', header: '#ffffff', text: '#111111',
        muted: '#444444', skill: '#f3f4f6', card: '#ffffff'
      }
    },
    css: 'themes/ats-compact/style.css',
    render(d) {
      const { escapeHtml, nl2br, buildContactLine, buildSkills, buildLangs, buildExperience, buildEducation } = H();
      return `
        <div class="cv-header">
          <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
          <div class="title">${escapeHtml(d.jobTitle)}</div>
          <div class="contact">${buildContactLine(d)}</div>
        </div>
        <div class="cv-body">
          ${d.summary ? `<div class="cv-section"><h2>Summary</h2><p>${nl2br(d.summary)}</p></div>` : ''}
          ${buildExperience(d) ? `<div class="cv-section"><h2>Experience</h2>${buildExperience(d)}</div>` : ''}
          ${buildEducation(d) ? `<div class="cv-section"><h2>Education</h2>${buildEducation(d)}</div>` : ''}
          ${buildSkills(d) ? `<div class="cv-section"><h2>Skills</h2><div class="skills-list">${buildSkills(d)}</div></div>` : ''}
          ${buildLangs(d) ? `<div class="cv-section"><h2>Languages</h2><div class="lang-list">${buildLangs(d)}</div></div>` : ''}
        </div>`;
    }
  });
})();
