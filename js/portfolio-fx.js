/**
 * Theme-aware portfolio FX
 * Only applies effects that fit each Web theme's personality.
 */
(function () {
  const reduceMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Per-theme effect kits */
  const KITS = {
    'web-pro': {
      mesh: false, progress: true, reveal: true,
      tilt: null, heroParallax: null, scrollParallax: false,
      magnetic: '.px-btn, .wp-btn, .proj-link', shimmer: null
    },
    'web-office': {
      mesh: false, progress: true, reveal: true,
      tilt: null, heroParallax: null, scrollParallax: false,
      magnetic: '.px-btn, .proj-link', shimmer: null
    },
    'web-designer': {
      mesh: false, progress: true, reveal: true,
      tilt: null, heroParallax: null, scrollParallax: false,
      magnetic: '.px-btn, .proj-link', shimmer: null, skillGlow: true
    },
    'web-artist': {
      mesh: false, progress: false, reveal: true,
      tilt: null, heroParallax: null, scrollParallax: false,
      magnetic: '.px-btn, .proj-link', shimmer: null
    },
    'web-programmer': {
      mesh: false, progress: true, reveal: true,
      tilt: null, heroParallax: null, scrollParallax: false,
      magnetic: '.px-btn, .proj-link', shimmer: null
    },
    'web-doctor': {
      mesh: false, progress: false, reveal: true,
      tilt: null, heroParallax: null, scrollParallax: false,
      magnetic: '.px-btn, .proj-link', shimmer: null
    },
    'web-teacher': {
      mesh: false, progress: false, reveal: true,
      tilt: null, heroParallax: null, scrollParallax: false,
      magnetic: '.px-btn, .proj-link', shimmer: null
    }
  };

  function themeId(root) {
    const m = (root.className || '').match(/theme-([a-z0-9-]+)/);
    return m ? m[1] : null;
  }

  function kitFor(root) {
    return KITS[themeId(root)] || null;
  }

  function addProgress(root) {
    if (root.querySelector('.fx-progress')) return;
    const bar = document.createElement('div');
    bar.className = 'fx-progress';
    root.prepend(bar);
  }

  function addMesh(root) {
    if (root.querySelector('.fx-mesh')) return;
    const mesh = document.createElement('div');
    mesh.className = 'fx-mesh';
    mesh.innerHTML = '<span></span><span></span><span></span>';
    root.style.position = root.style.position || 'relative';
    root.prepend(mesh);
  }

  function setupReveal(root, extraSel) {
    const sel =
      extraSel ||
      '.proj-card, .pf-card, .wh-item, .ws-item, .wd-card, .wc-card, .wm-item, .wh-section, .pf-section, .ws-section, .wd-section, .wm-section';
    const targets = root.querySelectorAll(sel);
    targets.forEach((el, i) => {
      el.classList.add('fx-reveal');
      el.style.setProperty('--fx-i', String(i % 8));
    });
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('fx-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('fx-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );
    targets.forEach((el) => io.observe(el));
  }

  function setupTilt(root, selector) {
    if (!selector) return;
    root.querySelectorAll(selector).forEach((card) => {
      card.classList.add('fx-tilt');
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(900px) rotateX(${(py - 0.5) * -12}deg) rotateY(${(px - 0.5) * 16}deg) scale3d(1.025,1.025,1.025)`;
        card.style.setProperty('--mx', `${px * 100}%`);
        card.style.setProperty('--my', `${py * 100}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  function setupHeroParallax(root, selector) {
    if (!selector) return;
    root.querySelectorAll(selector).forEach((hero) => {
      hero.classList.add('fx-hero');
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        hero.style.setProperty('--px', `${x * 36}px`);
        hero.style.setProperty('--py', `${y * 24}px`);
        hero.style.setProperty('--px2', `${x * -20}px`);
        hero.style.setProperty('--py2', `${y * -14}px`);
      });
      hero.addEventListener('pointerleave', () => {
        hero.style.setProperty('--px', '0px');
        hero.style.setProperty('--py', '0px');
        hero.style.setProperty('--px2', '0px');
        hero.style.setProperty('--py2', '0px');
      });
    });
  }

  function setupScroll(root, kit) {
    if (!kit.progress && !kit.scrollParallax) return;
    const scroller =
      root.closest('.preview-panel') ||
      root.parentElement ||
      document.scrollingElement ||
      document.documentElement;

    const onScroll = () => {
      const top = scroller.scrollTop || window.scrollY || 0;
      const max =
        (scroller.scrollHeight || document.body.scrollHeight) -
          (scroller.clientHeight || window.innerHeight) || 1;
      const p = Math.min(1, Math.max(0, top / max));
      if (kit.progress) {
        const bar = root.querySelector('.fx-progress');
        if (bar) bar.style.transform = `scaleX(${p})`;
      }
      if (kit.scrollParallax) {
        root.querySelectorAll('.fx-hero').forEach((h) => {
          h.style.setProperty('--sy', `${top * 0.16}px`);
        });
      }
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function setupMagnetic(root, selector) {
    if (!selector) return;
    root.querySelectorAll(selector).forEach((btn) => {
      btn.classList.add('fx-magnetic');
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.26}px, ${y * 0.26}px)`;
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.transform = '';
      });
    });
  }

  function setupShimmer(root, selector) {
    if (!selector) return;
    root.querySelectorAll(selector).forEach((el) => el.classList.add('fx-shimmer'));
  }

  function init(root) {
    if (!root) return;
    const kit = kitFor(root);
    if (!kit) return; // non-web or unknown theme → no FX

    root.classList.add('pf-fx-root');
    root.dataset.fxKit = themeId(root);

    if (kit.mesh) addMesh(root);
    if (kit.progress) addProgress(root);

    if (reduceMotion()) {
      root.querySelectorAll('.fx-reveal').forEach((el) => el.classList.add('fx-in'));
      return;
    }

    if (kit.reveal) setupReveal(root);
    setupTilt(root, kit.tilt);
    setupHeroParallax(root, kit.heroParallax);
    setupScroll(root, kit);
    setupMagnetic(root, kit.magnetic);
    setupShimmer(root, kit.shimmer);

    // Theme-specific flavor classes (CSS hooks)
    if (kit.skillGlow) root.classList.add('fx-skill-glow');
    if (kit.neonPulse) root.classList.add('fx-neon');
    if (kit.bentoPop) root.classList.add('fx-bento');
    if (kit.railGlow) root.classList.add('fx-rail');
    if (kit.inkReveal) root.classList.add('fx-ink');
  }

  window.CVPortfolioFx = { init, KITS };
})();
