/**
 * Theme: Elegant
 * Edit this file + style.css to fully customize this theme.
 */
(function () {
  const H = () => window.CVHelpers;

  CVThemes.register('elegant', {
    meta: {
      label: 'Elegant',
      layout: 'elegant',
      allowed: ['designed'],
      colors: ['#4a3728', '#f5f0eb'],
      desc: 'Centered serif, lots of whitespace',
      defaults: {
        accent: '#4a3728', header: '#ffffff', text: '#2c241b',
        muted: '#8b7355', skill: '#f5f0eb', card: '#ffffff'
      }
    },
    css: 'themes/elegant/style.css',
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
          <div class="divider"></div>
        </div>
        <div class="cv-body">
          ${d.summary ? `<div class="cv-section"><h2>About</h2><p>${nl2br(d.summary)}</p></div>` : ''}
          ${exp ? `<div class="cv-section"><h2>Experience</h2>${exp}</div>` : ''}
          ${edu ? `<div class="cv-section"><h2>Education</h2>${edu}</div>` : ''}
          ${skills ? `<div class="cv-section"><h2>Skills</h2><div class="skills-list">${skills}</div></div>` : ''}
          ${langs ? `<div class="cv-section"><h2>Languages</h2><div class="lang-list">${langs}</div></div>` : ''}
        </div>`;
    }
  });
})();
