document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn = document.querySelector('.theme-toggle');
  var icon = toggleBtn ? toggleBtn.querySelector('.toggle-icon') : null;
  var THEME_KEY = 'portfolio-theme';

  function applyTheme(isLight) {
    document.body.classList.toggle('light', isLight);
    if (toggleBtn) toggleBtn.setAttribute('aria-pressed', String(isLight));
    if (icon) icon.textContent = isLight ? '☀️' : '🌙';
  }

  (function initTheme() {
    var saved = localStorage.getItem(THEME_KEY); // 'light' | 'dark' | null
    var isLight;
    if (saved === 'light') isLight = true;
    else if (saved === 'dark') isLight = false;
    else {
      var prefersLight = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches;
      isLight = !!prefersLight;
    }
    applyTheme(isLight);
  })();

  function toggleTheme() {
    var nowLight = document.body.classList.toggle('light');
    localStorage.setItem(THEME_KEY, nowLight ? 'light' : 'dark');
    applyTheme(nowLight);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
    toggleBtn.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleTheme();
      }
    });
  }
});


// Mobile menu toggle (simple, matches your HTML/CSS)
document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('primary-nav');   // <nav id="primary-nav" class="nav">
  var menuToggle = document.getElementById('menu-toggle'); // <label id="menu-toggle" class="hamburger">
  var checkbox = menuToggle ? menuToggle.querySelector('input') : null;

  function setMenu(open) {
    if (!nav || !menuToggle || !checkbox) return;
    checkbox.checked = open;                           // drives the SVG animation via :checked CSS
    nav.classList.toggle('open', open);                // show/hide menu on mobile
    menuToggle.setAttribute('aria-controls', 'primary-nav');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('role', 'button');
    menuToggle.setAttribute('tabindex', '0');
  }

  // Start closed (mobile) / nav stays visible on desktop via CSS
  setMenu(false);

  // Label click toggles the checkbox; listen to checkbox changes
  if (checkbox) {
    checkbox.addEventListener('change', function () {
      setMenu(checkbox.checked);
    });
  }

  // Keyboard support on the label (Enter/Space)
  if (menuToggle) {
    menuToggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setMenu(!checkbox.checked);
      }
    });
  }

  // Close menu when a nav link is clicked (mobile)
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (window.innerWidth <= 790 && e.target.closest('a')) {
        setMenu(false);
      }
    });
  }

  // Close when resizing wider than mobile breakpoint
  window.addEventListener('resize', function () {
    if (window.innerWidth > 790) setMenu(false);
  });
});