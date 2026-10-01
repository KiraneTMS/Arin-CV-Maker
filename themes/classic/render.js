/**
 * Theme: Classic
 * Edit this file + style.css to fully customize this theme.
 */
(function () {
  const H = () => window.CVHelpers;

  CVThemes.register('classic', {
    meta: {
      label: 'ATS Classic',
      layout: 'single',
      allowed: ['ats'],
      colors: ['#111827', '#f3f4f6'],
      desc: 'Clean single column – best for ATS',
      defaults: {
        accent: '#111827', header: '#ffffff', text: '#111827',
        muted: '#6b7280', skill: '#f3f4f6', card: '#ffffff'
      }
    },
    css: 'themes/classic/style.css',
    render(d) {
      const { escapeHtml, nl2br, buildContactLine, buildSkills, buildLangs, buildExperience, buildEducation } = H();
      const contact = buildContactLine(d);
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const exp = buildExperience(d);
      const edu = buildEducation(d);
      return `
        <div class="cv-header">
          <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
          <div class="title">${escapeHtml(d.jobTitle)}</div>
          <div class="contact">${contact}</div>
        </div>
        <div class="cv-body">
          ${d.summary ? `<div class="cv-section"><h2>Professional Summary</h2><p>${nl2br(d.summary)}</p></div>` : ''}
          ${exp ? `<div class="cv-section"><h2>Experience</h2>${exp}</div>` : ''}
          ${edu ? `<div class="cv-section"><h2>Education</h2>${edu}</div>` : ''}
          ${skills ? `<div class="cv-section"><h2>Skills</h2><div class="skills-list">${skills}</div></div>` : ''}
          ${langs ? `<div class="cv-section"><h2>Languages</h2><div class="lang-list">${langs}</div></div>` : ''}
        </div>`;
    }
  });
})();
