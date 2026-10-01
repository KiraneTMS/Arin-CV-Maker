/**
 * Theme: Minimal
 * Edit this file + style.css to fully customize this theme.
 */
(function () {
  const H = () => window.CVHelpers;

  CVThemes.register('minimal', {
    meta: {
      label: 'ATS Minimal',
      layout: 'minimal',
      allowed: ['ats'],
      colors: ['#0f172a', '#f1f5f9'],
      desc: 'Ultra clean modern typography',
      defaults: {
        accent: '#0f172a', header: '#ffffff', text: '#0f172a',
        muted: '#94a3b8', skill: '#f1f5f9', card: '#ffffff'
      }
    },
    css: 'themes/minimal/style.css',
    render(d) {
      const { escapeHtml, nl2br, buildContactLine, buildSkills, buildLangs, buildExperience, buildEducation , buildPhoto } = H();
      const contact = buildContactLine(d);
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const exp = buildExperience(d, 'minimal');
      const edu = buildEducation(d, 'minimal');
      return `
        <div class="cv-header">
          ${d.photo ? `<div class="cv-photo-wrap">${buildPhoto(d, "cv-photo")}</div>` : ''}
          <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
          <div class="title">${escapeHtml(d.jobTitle)}</div>
          <div class="contact">${contact}</div>
        </div>
        <div class="cv-body">
          ${d.summary ? `<div class="cv-section"><h2>Summary</h2><p>${nl2br(d.summary)}</p></div>` : ''}
          ${exp ? `<div class="cv-section"><h2>Experience</h2>${exp}</div>` : ''}
          ${edu ? `<div class="cv-section"><h2>Education</h2>${edu}</div>` : ''}
          ${skills ? `<div class="cv-section"><h2>Skills</h2><div class="skills-list">${skills}</div></div>` : ''}
          ${langs ? `<div class="cv-section"><h2>Languages</h2><div class="lang-list">${langs}</div></div>` : ''}
        </div>`;
    }
  });
})();
