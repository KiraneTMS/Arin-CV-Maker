/* =========================================================
   CV Builder – vanilla JS
   Types: ats | designed | web
   Themes are loaded from /themes/<id>/ (render.js + style.css)
   ========================================================= */

const state = {
  type: null,          // 'ats' | 'designed' | 'web'
  theme: 'classic',
  customColors: null,  // null = theme defaults; object = user overrides
  data: getEmptyData()
};

function getEmptyData() {
  return {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    summary: '',
    experience: [],
    education: [],
    skills: '',
    languages: '',
    projects: []
  };
}

function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function formatMonth(ym) {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

/* ---------- Theme registry accessors ---------- */
function getTheme(id) {
  return window.CVThemes && CVThemes.get(id);
}

function getThemeMeta(id) {
  const t = getTheme(id);
  return t ? t.meta : null;
}

function getAllThemes() {
  return (window.CVThemes && CVThemes.all()) || {};
}

/* ---------- View switching ---------- */
function showView(id) {
  ['home-view', 'builder-view', 'publish-view'].forEach(v => {
    $(`#${v}`).hidden = v !== id;
  });
}

/* ---------- Colors ---------- */
function getActiveColors() {
  const meta = getThemeMeta(state.theme);
  const defaults = (meta && meta.defaults) || {
    accent: '#111827', header: '#ffffff', text: '#111827',
    muted: '#6b7280', skill: '#f3f4f6', card: '#ffffff'
  };
  return { ...defaults, ...(state.customColors || {}) };
}

function syncColorInputs() {
  const c = getActiveColors();
  const map = {
    'color-accent': c.accent,
    'color-header': c.header,
    'color-text': c.text,
    'color-muted': c.muted,
    'color-skill': c.skill,
    'color-card': c.card
  };
  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  });
}

function applyCustomColors(paper) {
  if (!paper) return;
  const c = getActiveColors();
  paper.style.setProperty('--accent', c.accent);
  paper.style.setProperty('--accent-dark', c.accent);
  paper.style.setProperty('--text', c.text);
  paper.style.setProperty('--muted', c.muted);
  paper.style.setProperty('--skill-bg', c.skill);
  paper.style.setProperty('--card-bg', c.card);
  paper.style.setProperty('--card-border', c.muted + '44');
  paper.style.setProperty('--sidebar-bg', c.header);
  paper.style.setProperty('--header-bg', c.header);
  paper.style.setProperty('--bar', c.accent);
  paper.style.setProperty('--pf-hero-from', c.header);
}

/* ---------- Theme picker ---------- */
function renderThemeGrid() {
  const grid = $('#theme-grid');
  if (!grid) return;
  grid.innerHTML = '';

  Object.entries(getAllThemes()).forEach(([key, t]) => {
    const meta = t.meta;
    if (state.type && meta.allowed && !meta.allowed.includes(state.type)) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-option' + (state.theme === key ? ' selected' : '');
    btn.dataset.theme = key;
    btn.title = meta.desc || '';
    const c0 = meta.colors ? meta.colors[0] : '#333';
    const c1 = meta.colors ? meta.colors[1] : '#eee';
    btn.innerHTML = `
      <div class="theme-swatch" style="background:linear-gradient(135deg,${c0} 50%,${c1} 50%)"></div>
      ${meta.label || key}
    `;
    btn.addEventListener('click', () => {
      state.theme = key;
      state.customColors = null;
      renderThemeGrid();
      syncColorInputs();
      renderPreview();
    });
    grid.appendChild(btn);
  });

  const custom = $('#theme-customize');
  if (custom) {
    custom.hidden = !(state.type === 'designed' || state.type === 'web');
    if (!custom.hidden) syncColorInputs();
  }
}

/* ---------- Repeatable sections ---------- */
function addExperience(data = {}) {
  const tpl = $('#exp-template');
  const node = tpl.content.cloneNode(true);
  const el = node.querySelector('.repeatable');
  if (data.title) el.querySelector('[name=expTitle]').value = data.title;
  if (data.company) el.querySelector('[name=expCompany]').value = data.company;
  if (data.start) el.querySelector('[name=expStart]').value = data.start;
  if (data.end) el.querySelector('[name=expEnd]').value = data.end;
  if (data.desc) el.querySelector('[name=expDesc]').value = data.desc;
  el.querySelector('.remove-btn').addEventListener('click', () => {
    el.remove();
    collectForm();
    renderPreview();
  });
  $('#experience-list').appendChild(node);
}


function addProject(data = {}) {
  const tpl = $('#proj-template');
  if (!tpl) return;
  const node = tpl.content.cloneNode(true);
  const el = node.querySelector('.repeatable');
  if (data.name) el.querySelector('[name=projName]').value = data.name;
  if (data.role) el.querySelector('[name=projRole]').value = data.role;
  if (data.url) el.querySelector('[name=projUrl]').value = data.url;
  if (data.tech) el.querySelector('[name=projTech]').value = data.tech;
  if (data.desc) el.querySelector('[name=projDesc]').value = data.desc;
  el.querySelector('.remove-btn').addEventListener('click', () => {
    el.remove();
    collectForm();
    renderPreview();
  });
  $('#projects-list').appendChild(node);
}

function addEducation(data = {}) {
  const tpl = $('#edu-template');
  const node = tpl.content.cloneNode(true);
  const el = node.querySelector('.repeatable');
  if (data.degree) el.querySelector('[name=eduDegree]').value = data.degree;
  if (data.school) el.querySelector('[name=eduSchool]').value = data.school;
  if (data.start) el.querySelector('[name=eduStart]').value = data.start;
  if (data.end) el.querySelector('[name=eduEnd]').value = data.end;
  el.querySelector('.remove-btn').addEventListener('click', () => {
    el.remove();
    collectForm();
    renderPreview();
  });
  $('#education-list').appendChild(node);
}

/* ---------- Collect form ---------- */
function collectForm() {
  const form = $('#cv-form');
  const fd = new FormData(form);
  state.data.fullName  = fd.get('fullName') || '';
  state.data.jobTitle  = fd.get('jobTitle') || '';
  state.data.email     = fd.get('email') || '';
  state.data.phone     = fd.get('phone') || '';
  state.data.location  = fd.get('location') || '';
  state.data.website   = fd.get('website') || '';
  state.data.linkedin  = fd.get('linkedin') || '';
  state.data.summary   = fd.get('summary') || '';
  state.data.skills    = fd.get('skills') || '';
  state.data.languages = fd.get('languages') || '';

  state.data.experience = $$('#experience-list .repeatable').map(el => ({
    title:   el.querySelector('[name=expTitle]').value,
    company: el.querySelector('[name=expCompany]').value,
    start:   el.querySelector('[name=expStart]').value,
    end:     el.querySelector('[name=expEnd]').value,
    desc:    el.querySelector('[name=expDesc]').value
  }));

  state.data.projects = $$('#projects-list .repeatable').map(el => ({
    name: el.querySelector('[name=projName]').value,
    role: el.querySelector('[name=projRole]').value,
    url:  el.querySelector('[name=projUrl]').value,
    tech: el.querySelector('[name=projTech]').value,
    desc: el.querySelector('[name=projDesc]').value
  }));

  state.data.education = $$('#education-list .repeatable').map(el => ({
    degree: el.querySelector('[name=eduDegree]').value,
    school: el.querySelector('[name=eduSchool]').value,
    start:  el.querySelector('[name=eduStart]').value,
    end:    el.querySelector('[name=eduEnd]').value
  }));
}

/* ---------- Main render (delegates to theme package) ---------- */
function renderPreview() {
  const d = state.data;
  const paper = $('#cv-preview');
  if (!paper) return;

  let themeKey = state.theme;
  const theme = getTheme(themeKey);
  const meta = theme && theme.meta;

  // ATS: force allowed theme only
  if (state.type === 'ats' && meta && meta.allowed && !meta.allowed.includes('ats')) {
    themeKey = 'classic';
  }

  paper.className = `cv-paper theme-${themeKey} ${state.type || ''}`;

  const t = getTheme(themeKey);
  if (t && typeof t.render === 'function') {
    paper.innerHTML = t.render(d);
  } else {
    paper.innerHTML = `<div class="cv-header"><h1>${(d.fullName || 'Your Name')}</h1></div>`;
  }
  applyCustomColors(paper);
  if (state.type === 'web' && window.CVPortfolioFx) {
    // slight delay so DOM is painted
    requestAnimationFrame(() => CVPortfolioFx.init(paper));
  }
}

/* ---------- PDF ---------- */
async function downloadPDF() {
  collectForm();
  renderPreview();
  const element = $('#cv-preview');
  const opt = {
    margin: 0,
    filename: `${(state.data.fullName || 'CV').replace(/\s+/g, '_')}_${state.type}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  try {
    await html2pdf().set(opt).from(element).save();
  } catch (err) {
    alert('PDF generation failed. Please try again.');
    console.error(err);
  }
}

/* ---------- Publish Web CV ---------- */
async function publishWebCV() {
  collectForm();
  if (!state.data.fullName || !state.data.email) {
    alert('Please fill at least Full Name and Email.');
    return;
  }

  const payload = {
    type: 'web',
    theme: state.theme,
    customColors: state.customColors,
    data: state.data,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };

  const id = Math.random().toString(36).slice(2, 10);

  if (typeof db !== 'undefined' && db) {
    try {
      await db.collection('webcvs').doc(id).set(payload);
    } catch (err) {
      console.error(err);
      alert('Failed to save to Firebase. Check your config / rules.');
      return;
    }
  } else {
    localStorage.setItem('webcv_' + id, JSON.stringify(payload));
    console.info('Firebase not configured – saved to localStorage for demo.');
  }

  const publicUrl = `${location.origin}${location.pathname.replace(/index\.html$/, '')}view.html?id=${id}`;
  $('#public-link').href = publicUrl;
  $('#public-link').textContent = publicUrl;
  showView('publish-view');
}

/* ---------- Start builder ---------- */
function startBuilder(type) {
  state.type = type;
  if (type === 'ats') state.theme = 'classic';
  else if (type === 'designed') state.theme = 'modern';
  else state.theme = 'web-pro';

  state.data = getEmptyData();
  state.customColors = null;

  $('#builder-title').textContent =
    type === 'ats' ? 'ATS CV' :
    type === 'designed' ? 'Designed CV' : 'Web CV';

  $('#btn-download').hidden = type === 'web';
  $('#btn-publish').hidden  = type !== 'web';

  $('#theme-section').hidden = false;
  const projSec = $('#projects-section');
  if (projSec) projSec.hidden = type !== 'web';
  renderThemeGrid();

  $('#experience-list').innerHTML = '';
  $('#education-list').innerHTML = '';
  const pl = $('#projects-list');
  if (pl) pl.innerHTML = '';
  addExperience();
  addEducation();
  if (type === 'web') addProject();

  // Reset personal fields only (keep theme color inputs intact)
  $$('#cv-form input:not([type=color]), #cv-form textarea').forEach(el => {
    if (el.type === 'month' || el.type === 'text' || el.type === 'email' || el.type === 'tel' || el.type === 'url' || el.tagName === 'TEXTAREA') {
      el.value = '';
    }
  });

  renderPreview();
  showView('builder-view');
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Live form updates (event delegation – survives DOM changes)
  const form = $('#cv-form');
  if (form) {
    form.addEventListener('input', (e) => {
      // Color pickers
      if (e.target && e.target.type === 'color') {
        state.customColors = {
          accent: ($('#color-accent') || {}).value,
          header: ($('#color-header') || {}).value,
          text:   ($('#color-text') || {}).value,
          muted:  ($('#color-muted') || {}).value,
          skill:  ($('#color-skill') || {}).value,
          card:   ($('#color-card') || {}).value
        };
        renderPreview();
        return;
      }
      collectForm();
      renderPreview();
    });
  }

  const resetBtn = $('#btn-reset-colors');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.customColors = null;
      syncColorInputs();
      renderPreview();
    });
  }

  // Add buttons (once)
  const addExp = $('#add-experience');
  if (addExp) addExp.addEventListener('click', () => addExperience());
  const addEdu = $('#add-education');
  if (addEdu) addEdu.addEventListener('click', () => addEducation());
  const addProj = $('#add-project');
  if (addProj) addProj.addEventListener('click', () => addProject());

  $$('.type-card button, .type-card').forEach(el => {
    el.addEventListener('click', e => {
      const type = e.currentTarget.dataset.type || e.target.closest('[data-type]')?.dataset.type;
      if (type) startBuilder(type);
    });
  });

  $('#btn-back').addEventListener('click', () => showView('home-view'));
  $('#btn-preview').addEventListener('click', () => {
    collectForm();
    renderPreview();
    $('#cv-preview').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('#btn-download').addEventListener('click', downloadPDF);
  $('#btn-publish').addEventListener('click', publishWebCV);

  $('#btn-copy-link').addEventListener('click', () => {
    const link = $('#public-link').href;
    navigator.clipboard.writeText(link).then(() => {
      $('#btn-copy-link').textContent = 'Copied!';
      setTimeout(() => { $('#btn-copy-link').textContent = 'Copy Link'; }, 1500);
    });
  });

  $('#btn-new-cv').addEventListener('click', () => showView('home-view'));

  $('#nav-home').addEventListener('click', e => {
    e.preventDefault();
    showView('home-view');
  });
  $('#nav-builder').addEventListener('click', e => {
    e.preventDefault();
    if (state.type) showView('builder-view');
    else showView('home-view');
  });
});
