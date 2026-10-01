/**
 * Web Pro – professional portfolio page
 * Inspired by clean industrial/pro single-page portfolios
 */
(function () {
  const H = () => window.CVHelpers;

  CVThemes.register('web-pro', {
    meta: {
      label: 'Pro Portfolio',
      layout: 'pro',
      allowed: ['web'],
      colors: ['#38bdf8', '#0b0f19'],
      desc: 'Clean professional portfolio page',
      defaults: {
        accent: '#38bdf8', header: '#0b0f19', text: '#f8fafc',
        muted: '#94a3b8', skill: '#151c2c', card: '#151c2c'
      }
    },
    css: 'themes/web-pro/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs, buildProjects } = H();
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const projectsHtml = buildProjects(d);
      const contact = buildContactLine(d);

      const expCount = (d.experience || []).filter(e => e.title || e.company).length;
      const projCount = (d.projects || []).filter(p => p.name || p.desc).length;
      const skillCount = (d.skills || '').split(',').map(s => s.trim()).filter(Boolean).length;

      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `
          <div class="wp-exp-item">
            <h3>${escapeHtml(e.title) || 'Position'}</h3>
            <div class="wp-meta">${escapeHtml(e.company)}${e.company && period ? ' · ' : ''}${period}</div>
            ${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}
          </div>`;
      }).join('');

      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `
          <div class="wp-exp-item">
            <h3>${escapeHtml(e.degree) || 'Degree'}</h3>
            <div class="wp-meta">${escapeHtml(e.school)}${e.school && period ? ' · ' : ''}${period}</div>
          </div>`;
      }).join('');

      const brand = (d.fullName || 'Portfolio').split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();

      return `
        <div class="wp-page">
          <nav class="wp-nav">
            <div class="wp-logo"><span></span> ${escapeHtml(brand)} PORTFOLIO</div>
            <ul class="wp-nav-links">
              ${projectsHtml ? '<li><a href="#wp-projects">Projects</a></li>' : ''}
              ${exp ? '<li><a href="#wp-exp">Experience</a></li>' : ''}
              ${skills ? '<li><a href="#wp-skills">Skills</a></li>' : ''}
              <li><a href="#wp-contact">Contact</a></li>
            </ul>
          </nav>

          <header class="wp-hero">
            <div class="wp-badge"><i></i> Open to opportunities</div>
            <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
            <p class="wp-subtitle">${escapeHtml(d.jobTitle)}</p>
            ${d.summary ? `<p class="wp-bio">${nl2br(d.summary)}</p>` : ''}
            <div class="wp-hero-contact">${contact}</div>
            ${projectsHtml || exp ? `<a class="wp-btn" href="${projectsHtml ? '#wp-projects' : '#wp-exp'}">View work</a>` : ''}
          </header>

          ${(expCount || projCount || skillCount) ? `
          <div class="wp-stats">
            ${expCount ? `<div class="wp-stat"><strong>${expCount}+</strong><span>Roles</span></div>` : ''}
            ${projCount ? `<div class="wp-stat"><strong>${projCount}</strong><span>Projects</span></div>` : ''}
            ${skillCount ? `<div class="wp-stat"><strong>${skillCount}</strong><span>Skills</span></div>` : ''}
            ${d.location ? `<div class="wp-stat"><strong style="font-size:1rem">${escapeHtml(d.location)}</strong><span>Based in</span></div>` : ''}
          </div>` : ''}

          <div class="wp-main">
            ${projectsHtml ? `
            <section class="wp-section" id="wp-projects">
              <div class="wp-section-head"><span class="dot"></span><h2>Projects</h2></div>
              <div class="wp-grid proj-grid">${projectsHtml}</div>
            </section>` : ''}

            ${exp ? `
            <section class="wp-section" id="wp-exp">
              <div class="wp-section-head"><span class="dot"></span><h2>Experience</h2></div>
              ${exp}
            </section>` : ''}

            ${edu ? `
            <section class="wp-section" id="wp-edu">
              <div class="wp-section-head"><span class="dot"></span><h2>Education</h2></div>
              ${edu}
            </section>` : ''}

            ${skills || langs ? `
            <section class="wp-section" id="wp-skills">
              <div class="wp-section-head"><span class="dot"></span><h2>Skills</h2></div>
              ${skills ? `<div class="skills-list">${skills}</div>` : ''}
              ${langs ? `<div class="lang-list" style="margin-top:0.75rem">${langs}</div>` : ''}
            </section>` : ''}
          </div>

          <section class="wp-cta" id="wp-contact">
            <h2>Let’s work together</h2>
            <p>${d.email ? 'Reach out for collaborations, projects, or opportunities.' : 'Add your email to enable contact.'}</p>
            ${d.email ? `<a class="wp-btn" href="mailto:${escapeHtml(d.email)}">Contact</a>` : ''}
          </section>

          <footer class="wp-footer">
            © ${new Date().getFullYear()} ${escapeHtml(d.fullName) || 'Portfolio'}. All rights reserved.
          </footer>
        </div>`;
    }
  });
})();
