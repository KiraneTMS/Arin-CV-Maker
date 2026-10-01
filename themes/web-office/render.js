
(function () {
  const H = () => window.CVHelpers;
  CVThemes.register('web-office', {
    meta: {
      label: 'Office',
      layout: 'office-sidebar',
      allowed: ['web'],
      colors: ['#3b82f6', '#0f172a'],
      desc: 'Sidebar + main corporate layout',
      defaults: {
        accent: '#3b82f6', header: '#0f172a', text: '#f8fafc',
        muted: '#94a3b8', skill: '#1e293b', card: '#1e293b'
      }
    },
    css: 'themes/web-office/style.css',
    render(d) {
      const { escapeHtml, nl2br, formatMonth, buildContactLine, buildSkills, buildLangs, buildProjects } = H();
      const skills = buildSkills(d);
      const langs = buildLangs(d);
      const projectsHtml = buildProjects(d);
      const initial = (d.fullName || 'U').trim().charAt(0).toUpperCase();
      const contactBits = [];
      if (d.email) contactBits.push(`<div class="off-c">${escapeHtml(d.email)}</div>`);
      if (d.phone) contactBits.push(`<div class="off-c">${escapeHtml(d.phone)}</div>`);
      if (d.location) contactBits.push(`<div class="off-c">${escapeHtml(d.location)}</div>`);
      if (d.website) contactBits.push(`<div class="off-c"><a href="${escapeHtml(d.website)}" target="_blank">Website</a></div>`);
      if (d.linkedin) contactBits.push(`<div class="off-c"><a href="${escapeHtml(d.linkedin)}" target="_blank">LinkedIn</a></div>`);

      const exp = (d.experience || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : (e.start ? ' – Present' : '')}`;
        return `<article class="off-item"><div class="off-item-top"><h3>${escapeHtml(e.title) || 'Role'}</h3><span>${period}</span></div>
          <div class="off-co">${escapeHtml(e.company)}</div>${e.desc ? `<p>${nl2br(e.desc)}</p>` : ''}</article>`;
      }).join('');
      const edu = (d.education || []).map(e => {
        const period = `${formatMonth(e.start)}${e.end ? ' – ' + formatMonth(e.end) : ''}`;
        return `<article class="off-item"><div class="off-item-top"><h3>${escapeHtml(e.degree) || 'Degree'}</h3><span>${period}</span></div>
          <div class="off-co">${escapeHtml(e.school)}</div></article>`;
      }).join('');

      return `
        <div class="off-layout">
          <aside class="off-side">
            <div class="off-avatar">${escapeHtml(initial)}</div>
            <h1>${escapeHtml(d.fullName) || 'Your Name'}</h1>
            <p class="off-role">${escapeHtml(d.jobTitle)}</p>
            <div class="off-side-block"><h2>Contact</h2>${contactBits.join('') || '<div class="off-c">—</div>'}</div>
            ${skills ? `<div class="off-side-block"><h2>Skills</h2><div class="skills-list">${skills}</div></div>` : ''}
            ${langs ? `<div class="off-side-block"><h2>Languages</h2><div class="lang-list">${langs}</div></div>` : ''}
          </aside>
          <main class="off-main">
            ${d.summary ? `<section><h2>Profile</h2><p class="off-sum">${nl2br(d.summary)}</p></section>` : ''}
            ${projectsHtml ? `<section><h2>Projects</h2><div class="proj-grid">${projectsHtml}</div></section>` : ''}
            ${exp ? `<section><h2>Experience</h2>${exp}</section>` : ''}
            ${edu ? `<section><h2>Education</h2>${edu}</section>` : ''}
            ${d.email ? `<a class="px-btn" href="mailto:${escapeHtml(d.email)}">Contact me</a>` : ''}
          </main>
        </div>`;
    }
  });
})();
