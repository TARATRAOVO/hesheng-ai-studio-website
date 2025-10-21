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
  // Preserve subject/body when replacing the mailto address
  const mailBtn = document.querySelector('#contact a[href^="mailto:"]');
  if (mailBtn && SITE_CONFIG.email) {
    const href = mailBtn.getAttribute('href');
    const qsIdx = href.indexOf('?');
    const qs = qsIdx >= 0 ? href.slice(qsIdx) : '';
    mailBtn.setAttribute('href', `mailto:${SITE_CONFIG.email}${qs}`);
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

// Highlight active nav item by section visibility
(() => {
  const nav = document.getElementById('siteNav');
  if (!nav || !('IntersectionObserver' in window)) return;
  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const map = new Map();
  links.forEach(a => {
    const id = a.getAttribute('href')?.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) map.set(id, a);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = map.get(id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.6] });
  map.forEach((_, id) => {
    const el = document.getElementById(id);
    el && io.observe(el);
  });
})();

// Copy to clipboard for contact info
(() => {
  const btns = document.querySelectorAll('[data-copy]');
  if (!btns.length || !navigator.clipboard) return;
  btns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = '已复制';
        btn.disabled = true;
        setTimeout(() => { btn.textContent = old; btn.disabled = false; }, 1400);
      } catch (_) {
        // no-op
      }
    });
  });
})();
