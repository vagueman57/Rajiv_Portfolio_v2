document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.querySelector('.theme-toggle');
  const icon = toggleBtn ? toggleBtn.querySelector('.toggle-icon') : null;
  const THEME_KEY = 'portfolio-theme';

  const applyTheme = (isLight) => {
    document.body.classList.toggle('light', isLight);
    if (toggleBtn) toggleBtn.setAttribute('aria-pressed', String(isLight));
    if (icon) icon.textContent = isLight ? '☀️' : '🌙';
  };

  (() => {
    const saved = localStorage.getItem(THEME_KEY);
    const systemPreference = window.matchMedia?.(
      '(prefers-color-scheme: light)'
    ).matches ?? false;
    
    const isLight = saved === 'light' 
      ? true : saved === 'dark' 
      ? false : systemPreference;
    
    applyTheme(isLight);
  })();

  const toggleTheme = () => {
    const nowLight = document.body.classList.toggle('light');
    localStorage.setItem(THEME_KEY, nowLight ? 'light' : 'dark');
    applyTheme(nowLight);
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
    toggleBtn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleTheme();
      }
    });
  }
});


// Mobile menu toggle (simple, matches your HTML/CSS)
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('primary-nav');
  const menuToggle = document.getElementById('menu-toggle');
  const checkbox = menuToggle?.querySelector('input') ?? null;

  const setMenu = (open) => {
    if (!nav || !menuToggle || !checkbox) return;
    checkbox.checked = open;
    nav.classList.toggle('open', open);
    menuToggle.setAttribute('aria-controls', 'primary-nav');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('role', 'button');
    menuToggle.setAttribute('tabindex', '0');
  };

  setMenu(false);

  checkbox?.addEventListener('change', () => {
    setMenu(checkbox.checked);
  });

  menuToggle?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setMenu(!checkbox.checked);
    }
  });

  nav?.addEventListener('click', (e) => {
    if (window.innerWidth <= 790 && e.target.closest('a')) {
      setMenu(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 790) setMenu(false);
  });
});