
(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('ats-serif', {
    meta: {
      label: 'ATS Serif',
      layout: 'single',
      allowed: ['ats'],
      colors: ['#1a1a1a', '#f5f5f5'],
      desc: 'Centered serif header – still ATS-safe',
      defaults: {
        accent: '#1a1a1a', header: '#ffffff', text: '#1a1a1a',
        muted: '#555555', skill: '#f0f0f0', card: '#ffffff'
      }
    },
    css: 'themes/ats-serif/style.css',
    render(d) {
      const { escapeHtml, nl2br, buildContactLine, buildSkills, buildLangs, buildExperience, buildEducation } = H();
      return `
        <div class="cv-header">
          <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
          <div class="title">${escapeHtml(d.jobTitle)}</div>
          <div class="contact">${buildContactLine(d)}</div>
        </div>
        <div class="cv-body">
          ${d.summary ? `<div class="cv-section"><h2>Professional Summary</h2><p>${nl2br(d.summary)}</p></div>` : ''}
          ${buildExperience(d) ? `<div class="cv-section"><h2>Experience</h2>${buildExperience(d)}</div>` : ''}
          ${buildEducation(d) ? `<div class="cv-section"><h2>Education</h2>${buildEducation(d)}</div>` : ''}
          ${buildSkills(d) ? `<div class="cv-section"><h2>Skills</h2><div class="skills-list">${buildSkills(d)}</div></div>` : ''}
          ${buildLangs(d) ? `<div class="cv-section"><h2>Languages</h2><div class="lang-list">${buildLangs(d)}</div></div>` : ''}
        </div>`;
    }
  });
})();
