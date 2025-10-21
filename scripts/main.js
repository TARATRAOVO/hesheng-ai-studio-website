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
