(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const stored = localStorage.getItem('theme');
  const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (preferredDark ? 'dark' : 'light');
  root.dataset.theme = initial;

  // Inline SVG rather than the moon/sun characters: those glyphs sit off-centre
  // inside their own em box, so the button looked misaligned however carefully
  // the box itself was centred.
  const ICON_MOON = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 13.3A8.5 8.5 0 1 1 10.7 3.5a6.6 6.6 0 0 0 9.8 9.8Z"/></svg>';
  const ICON_SUN = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.1"/><path d="M12 2.8v2.1M12 19.1v2.1M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5"/></svg>';

  function updateThemeButton() {
    if (!themeButton) return;
    const dark = root.dataset.theme === 'dark';
    themeButton.innerHTML = dark ? ICON_SUN : ICON_MOON;
    themeButton.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
    themeButton.title = dark ? 'Use light theme' : 'Use dark theme';
  }
  updateThemeButton();

  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
    updateThemeButton();
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  if (sections.length && links.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-28% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
  }

  // Size the square portrait to the height of the intro text beside it, so the two
  // end level without cropping the photo. A larger photo narrows the text and makes
  // it taller, so repeat until the size settles; it only ever moves one way.
  const heroTop = document.querySelector('.hero-top');
  if (heroTop) {
    const portrait = heroTop.querySelector('.profile-column');
    const intro = heroTop.querySelector('.hero-content');
    const fitPortrait = () => {
      portrait.style.flexBasis = '';
      if (getComputedStyle(heroTop).display !== 'flex') return;
      for (let i = 0; i < 8; i += 1) {
        const size = Math.round(Math.min(320, Math.max(190, intro.offsetHeight)));
        if (Math.abs(size - portrait.offsetWidth) <= 1) break;
        portrait.style.flexBasis = `${size}px`;
      }
    };
    let frame = 0;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fitPortrait);
    });
    fitPortrait();
    document.fonts?.ready.then(fitPortrait);
  }

  document.querySelectorAll('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', async () => {
      const email = button.dataset.copyEmail;
      try {
        await navigator.clipboard.writeText(email);
        const old = button.textContent;
        button.textContent = 'Copied';
        setTimeout(() => { button.textContent = old; }, 1300);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });
})();
