
(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('web-programmer', {
    meta: {
      label: 'Programmer',
      layout: 'programmer-terminal',
      allowed: ['web'],
      colors: ['#22c55e', '#0a0e14'],
      desc: 'Terminal + split content',
      defaults: {
        accent: '#22c55e', header: '#0a0e14', text: '#e2e8f0',
        muted: '#94a3b8', skill: '#14532d', card: '#111827'
      }
    },
    css: 'themes/web-programmer/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs, buildProjects } = H();
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const projectsHtml = buildProjects(d);
      const handle = (d.fullName || 'user').toLowerCase().replace(/\s+/g, '');
      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `<div class="pg-item"><span class="pg-cmd">role</span>
          <h3>${escapeHtml(e.title) || 'Role'} <small>@ ${escapeHtml(e.company)}</small></h3>
          <div class="pg-meta">${period}</div>${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}</div>`;
      }).join('');
      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `<div class="pg-item"><span class="pg-cmd">edu</span>
          <h3>${escapeHtml(e.degree) || 'Degree'}</h3>
          <div class="pg-meta">${escapeHtml(e.school)} · ${period}</div></div>`;
      }).join('');
      return `
        <div class="pg-term">
          <div class="pg-bar"><i class="r"></i><i class="y"></i><i class="g"></i>
            <span>~/${escapeHtml(handle)}</span></div>
          <div class="pg-body">
            <div class="pg-top">
              <div>
                <div class="pg-prompt">$ whoami</div>
                <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
                <p class="pg-role">${escapeHtml(d.jobTitle)}</p>
              </div>
              <div class="pg-contact">${buildContactLine(d)}</div>
            </div>
            <div class="pg-cols">
              <div class="pg-col">
                ${d.summary ? `<section><h2>// about</h2><p class="pg-about">${nl2br(d.summary)}</p></section>` : ''}
                ${exp ? `<section><h2>// experience</h2>${exp}</section>` : ''}
                ${edu ? `<section><h2>// education</h2>${edu}</section>` : ''}
              </div>
              <div class="pg-col">
                ${projectsHtml ? `<section><h2>// projects</h2><div class="proj-grid">${projectsHtml}</div></section>` : ''}
                ${skills ? `<section><h2>// stack</h2><div class="skills-list">${skills}</div></section>` : ''}
                ${langs ? `<section><h2>// languages</h2><div class="lang-list">${langs}</div></section>` : ''}
                ${d.email ? `<a class="px-btn" href="mailto:${escapeHtml(d.email)}">contact --email</a>` : ''}
              </div>
            </div>
          </div>
        </div>`;
    }
  });
})();
