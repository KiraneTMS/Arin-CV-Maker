
(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('designed-timeline', {
    meta: {
      label: 'Designed Timeline',
      layout: 'timeline',
      allowed: ['designed'],
      colors: ['#2563eb', '#dbeafe'],
      desc: 'Vertical timeline experience layout',
      defaults: {
        accent: '#2563eb', header: '#ffffff', text: '#1e3a5f',
        muted: '#64748b', skill: '#dbeafe', card: '#ffffff'
      }
    },
    css: 'themes/designed-timeline/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs } = H();
      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `<div class="dt-item"><h3>${escapeHtml(e.title) || 'Position'}</h3>
          <div class="meta">${escapeHtml(e.company)}${e.company && period ? ' · ' : ''}${period}</div>
          ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}</div>`;
      }).join('');
      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `<div class="dt-item"><h3>${escapeHtml(e.degree) || 'Degree'}</h3>
          <div class="meta">${escapeHtml(e.school)}${e.school && period ? ' · ' : ''}${period}</div></div>`;
      }).join('');
      return `
        <div class="dt-header">
          <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
          <div class="title">${escapeHtml(d.jobTitle)}</div>
          <div class="contact">${buildContactLine(d)}</div>
        </div>
        <div class="dt-body">
          ${d.summary ? `<div class="dt-section"><h2>Summary</h2><p>${nl2br(d.summary)}</p></div>` : ''}
          ${exp ? `<div class="dt-section"><h2>Experience</h2><div class="dt-line">${exp}</div></div>` : ''}
          ${edu ? `<div class="dt-section"><h2>Education</h2><div class="dt-line">${edu}</div></div>` : ''}
          ${buildSkills(d) ? `<div class="dt-section"><h2>Skills</h2><div class="skills-list">${buildSkills(d)}</div></div>` : ''}
          ${buildLangs(d) ? `<div class="dt-section"><h2>Languages</h2><div class="lang-list">${buildLangs(d)}</div></div>` : ''}
        </div>`;
    }
  });
})();
