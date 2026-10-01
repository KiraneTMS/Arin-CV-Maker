(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('web-doctor', {
    meta: {
      label: 'Doctor',
      layout: 'web-doctor',
      allowed: ['web'],
      colors: ['#14b8a6', '#0c1a18'],
      desc: 'Medical / healthcare portfolio',
      defaults: {'accent': '#14b8a6', 'header': '#0c1a18', 'text': '#f0fdfa', 'muted': '#99b8b3', 'skill': '#134e4a', 'card': '#132926'}
    },
    css: 'themes/web-doctor/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs, buildProjects } = H();
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const projectsHtml = buildProjects(d);
      const contact = buildContactLine(d);
      const expCount = (d.experience || []).filter(e => e.title || e.company).length;
      const projCount = (d.projects || []).filter(p => p.name || p.desc).length;
      const skillCount = (d.skills || '').split(',').map(s => s.trim()).filter(Boolean).length;
      const brand = (d.fullName || 'CV').split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();

      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `<div class="px-item"><h3>${escapeHtml(e.title) || 'Position'}</h3>
          <div class="px-meta">${escapeHtml(e.company)}${e.company && period ? ' · ' : ''}${period}</div>
          ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}</div>`;
      }).join('');

      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `<div class="px-item"><h3>${escapeHtml(e.degree) || 'Degree'}</h3>
          <div class="px-meta">${escapeHtml(e.school)}${e.school && period ? ' · ' : ''}${period}</div></div>`;
      }).join('');

      return `
        <div class="px-page">
          <nav class="px-nav">
            <div class="px-logo"><span></span> ${escapeHtml(brand)} · Doctor</div>
            <ul class="px-links">
              ${projectsHtml ? '<li><a href="#px-proj">Research & Projects</a></li>' : ''}
              ${exp ? '<li><a href="#px-exp">Clinical Experience</a></li>' : ''}
              ${skills ? '<li><a href="#px-skills">Specialties</a></li>' : ''}
              <li><a href="#px-contact">Contact</a></li>
            </ul>
          </nav>
          <header class="px-hero">
            <div class="px-badge"><i></i> Accepting professional inquiries</div>
            <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
            <p class="px-role">${escapeHtml(d.jobTitle)}</p>
            ${d.summary ? `<p class="px-bio">${nl2br(d.summary)}</p>` : ''}
            <div class="px-contact">${contact}</div>
            ${projectsHtml || exp ? `<a class="px-btn" href="${projectsHtml ? '#px-proj' : '#px-exp'}">View profile</a>` : ''}
          </header>
          ${(expCount || projCount || skillCount) ? `
          <div class="px-stats">
            ${expCount ? `<div class="px-stat"><strong>${expCount}+</strong><span>Roles</span></div>` : ''}
            ${projCount ? `<div class="px-stat"><strong>${projCount}</strong><span>Projects</span></div>` : ''}
            ${skillCount ? `<div class="px-stat"><strong>${skillCount}</strong><span>Skills</span></div>` : ''}
            ${d.location ? `<div class="px-stat"><strong class="px-loc">${escapeHtml(d.location)}</strong><span>Location</span></div>` : ''}
          </div>` : ''}
          <div class="px-main">
            ${projectsHtml ? `<section class="px-section" id="px-proj">
              <div class="px-head"><span class="dot"></span><h2>Research & Projects</h2></div>
              <div class="px-grid proj-grid">${projectsHtml}</div>
            </section>` : ''}
            ${exp ? `<section class="px-section" id="px-exp">
              <div class="px-head"><span class="dot"></span><h2>Clinical Experience</h2></div>
              ${exp}
            </section>` : ''}
            ${edu ? `<section class="px-section" id="px-edu">
              <div class="px-head"><span class="dot"></span><h2>Education & Training</h2></div>
              ${edu}
            </section>` : ''}
            ${skills || langs ? `<section class="px-section" id="px-skills">
              <div class="px-head"><span class="dot"></span><h2>Specialties</h2></div>
              ${skills ? `<div class="skills-list">${skills}</div>` : ''}
              ${langs ? `<div class="lang-list" style="margin-top:.75rem">${langs}</div>` : ''}
            </section>` : ''}
          </div>
          <section class="px-cta" id="px-contact">
            <h2>Professional inquiry</h2>
            <p>Contact for collaborations or opportunities.</p>
            ${d.email ? `<a class="px-btn" href="mailto:${escapeHtml(d.email)}">Contact</a>` : ''}
          </section>
          <footer class="px-footer">© ${new Date().getFullYear()} ${escapeHtml(d.fullName) || 'Portfolio'}.</footer>
        </div>`;
    }
  });
})();
