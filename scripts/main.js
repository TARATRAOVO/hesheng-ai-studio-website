// Minimal JS: theme toggle + current year + config-driven text hooks
const elYear = document.getElementById('year');
elYear && (elYear.textContent = String(new Date().getFullYear()));

// Theme handling with localStorage persistence
const THEME_KEY = 'pref-theme';
const themeToggle = document.getElementById('themeToggle');
const applyTheme = (mode) => {
  document.documentElement.dataset.theme = mode;
  localStorage.setItem(THEME_KEY, mode);
};

// Initialize theme from storage or system
(() => {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return applyTheme(saved);
  const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(dark ? 'dark' : 'light');
})();

themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

// Example: centralized config for quick edits (brand, email, links)
const SITE_CONFIG = {
  brand: '平乐合笙人工智能应用软件工作室',
  email: 'dipan.tang@foxmail.com', // TODO: 替换为你的正式联系邮箱
  links: {
    pricing: '#pricing',
    contact: '#contact',
  },
};

// Apply config-driven content quickly if needed
(() => {
  const logoText = document.querySelector('.logo span');
  if (logoText) logoText.textContent = SITE_CONFIG.brand;
  const contactBtn = document.querySelector('#contact .btn');
  if (contactBtn && SITE_CONFIG.email) {
    contactBtn.href = `mailto:${SITE_CONFIG.email}`;
  }
})();

// Mobile navigation toggle
(() => {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  if (!navToggle || !siteNav) return;
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
})();

// Smooth in-page anchor scrolling with header offset (more reliable on iOS/Safari)
(() => {
  const headerH = (() => {
    const v = getComputedStyle(document.documentElement).getPropertyValue('--header-h');
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : 56;
  })();
  const offset = headerH + 12;
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') { return; }
      const id = href.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      // Close mobile nav if open
      const siteNav = document.getElementById('siteNav');
      const navToggle = document.getElementById('navToggle');
      if (siteNav && navToggle && siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
      scrollToId(id);
      // Update URL hash without jumping
      if (history.pushState) {
        history.pushState(null, '', `#${id}`);
      }
    });
  });
})();
