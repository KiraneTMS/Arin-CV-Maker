
(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('ats-banded', {
    meta: {
      label: 'ATS Banded',
      layout: 'single',
      allowed: ['ats'],
      colors: ['#1e3a5f', '#e2e8f0'],
      desc: 'Header band – still single column ATS',
      defaults: {
        accent: '#1e3a5f', header: '#1e3a5f', text: '#1e293b',
        muted: '#64748b', skill: '#e2e8f0', card: '#ffffff'
      }
    },
    css: 'themes/ats-banded/style.css',
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
