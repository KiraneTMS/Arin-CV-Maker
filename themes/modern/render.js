/**
 * Theme: Modern Sidebar
 * Edit this file + style.css to fully customize this theme.
 */
(function () {
  const H = () => window.CVHelpers;

  CVThemes.register('modern', {
    meta: {
      label: 'Modern Sidebar',
      layout: 'sidebar',
      allowed: ['designed'],
      colors: ['#1e3a5f', '#e2e8f0'],
      desc: 'Two-column with strong accent sidebar',
      defaults: {
        accent: '#1e3a5f', header: '#1e3a5f', text: '#1e293b',
        muted: '#64748b', skill: '#334155', card: '#ffffff'
      }
    },
    css: 'themes/modern/style.css',
    render(d) {
      const { escapeHtml, nl2br, buildSkills, buildLangs, buildExperience, buildEducation, buildPhoto } = H();
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const exp = buildExperience(d);
      const edu = buildEducation(d);
      const contactItems = [];
      if (d.email) contactItems.push(`<div class="contact-item">${escapeHtml(d.email)}</div>`);
      if (d.phone) contactItems.push(`<div class="contact-item">${escapeHtml(d.phone)}</div>`);
      if (d.location) contactItems.push(`<div class="contact-item">${escapeHtml(d.location)}</div>`);
      if (d.website) contactItems.push(`<div class="contact-item"><a href="${escapeHtml(d.website)}" target="_blank">${escapeHtml(d.website.replace(/^https?:\/\//,''))}</a></div>`);
      if (d.linkedin) contactItems.push(`<div class="contact-item"><a href="${escapeHtml(d.linkedin)}" target="_blank">LinkedIn</a></div>`);

      return `
        <div class="layout-modern">
          <aside class="sidebar">
            ${buildPhoto(d, "cv-photo sidebar")}
            <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
            <div class="title">${escapeHtml(d.jobTitle)}</div>
            ${contactItems.length ? `<h2>Contact</h2>${contactItems.join('')}` : ''}
            ${skills ? `<h2>Skills</h2><div>${skills}</div>` : ''}
            ${langs ? `<h2>Languages</h2><div>${langs}</div>` : ''}
          </aside>
          <div class="main">
            ${d.summary ? `<div class="cv-section"><h2>Summary</h2><p>${nl2br(d.summary)}</p></div>` : ''}
            ${exp ? `<div class="cv-section"><h2>Experience</h2>${exp}</div>` : ''}
            ${edu ? `<div class="cv-section"><h2>Education</h2>${edu}</div>` : ''}
          </div>
        </div>`;
    }
  });
})();
