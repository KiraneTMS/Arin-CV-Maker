/**
 * Theme: Creative
 * Edit this file + style.css to fully customize this theme.
 */
(function () {
  const H = () => window.CVHelpers;

  CVThemes.register('creative', {
    meta: {
      label: 'Creative',
      layout: 'creative',
      allowed: ['designed'],
      colors: ['#7c3aed', '#f3e8ff'],
      desc: 'Bold accent bar + asymmetric items',
      defaults: {
        accent: '#7c3aed', header: '#ffffff', text: '#1e1b4b',
        muted: '#6b7280', skill: '#f3e8ff', card: '#ffffff'
      }
    },
    css: 'themes/creative/style.css',
    render(d) {
      const { escapeHtml, nl2br, buildContactLine, buildSkills, buildLangs, buildExperience, buildEducation , buildPhoto } = H();
      const contact = buildContactLine(d);
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const exp = buildExperience(d);
      const edu = buildEducation(d);
      return `
        <div class="layout-creative">
          <div class="accent-bar"></div>
          <div class="content">
            <div class="cv-header">
          ${d.photo ? `<div class="cv-photo-wrap">${buildPhoto(d, "cv-photo")}</div>` : ''}
              <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
              <div class="title">${escapeHtml(d.jobTitle)}</div>
              <div class="contact">${contact}</div>
            </div>
            ${d.summary ? `<div class="cv-section"><h2>Summary</h2><p>${nl2br(d.summary)}</p></div>` : ''}
            ${exp ? `<div class="cv-section"><h2>Experience</h2>${exp}</div>` : ''}
            ${edu ? `<div class="cv-section"><h2>Education</h2>${edu}</div>` : ''}
            ${skills ? `<div class="cv-section"><h2>Skills</h2><div class="skills-list">${skills}</div></div>` : ''}
            ${langs ? `<div class="cv-section"><h2>Languages</h2><div class="lang-list">${langs}</div></div>` : ''}
          </div>
        </div>`;
    }
  });
})();
