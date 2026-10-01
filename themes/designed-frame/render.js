
(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('designed-frame', {
    meta: {
      label: 'Designed Frame',
      layout: 'frame',
      allowed: ['designed'],
      colors: ['#7c3aed', '#f5f3ff'],
      desc: 'Framed centered elegant layout',
      defaults: {
        accent: '#7c3aed', header: '#ffffff', text: '#1e1b4b',
        muted: '#6b7280', skill: '#f5f3ff', card: '#ffffff'
      }
    },
    css: 'themes/designed-frame/style.css',
    render(d) {
      const { escapeHtml, nl2br, buildContactLine, buildSkills, buildLangs, buildExperience, buildEducation } = H();
      const exp = buildExperience(d).replace(/cv-item/g, 'df-item');
      const edu = buildEducation(d).replace(/cv-item/g, 'df-item');
      return `
        <div class="df-frame">
          <div class="df-header">
            <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
            <div class="title">${escapeHtml(d.jobTitle)}</div>
            <div class="contact">${buildContactLine(d)}</div>
          </div>
          ${d.summary ? `<div class="df-section"><h2>About</h2><p style="text-align:center">${nl2br(d.summary)}</p></div>` : ''}
          ${exp ? `<div class="df-section"><h2>Experience</h2>${exp}</div>` : ''}
          ${edu ? `<div class="df-section"><h2>Education</h2>${edu}</div>` : ''}
          ${buildSkills(d) ? `<div class="df-section"><h2>Skills</h2><div class="skills-list">${buildSkills(d)}</div></div>` : ''}
          ${buildLangs(d) ? `<div class="df-section"><h2>Languages</h2><div class="lang-list">${buildLangs(d)}</div></div>` : ''}
        </div>`;
    }
  });
})();
