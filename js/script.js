document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  const closeMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    nav.removeAttribute('style');
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('is-open');
      const button = dropdown.querySelector('.nav-dropbtn');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (button) button.setAttribute('aria-expanded', 'false');
      if (menu) menu.style.display = 'none';
    });
  };

  if (menuButton && nav) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');

    menuButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (window.innerWidth > 900) return;

      const isOpen = !nav.classList.contains('open');
      if (!isOpen) {
        closeMenu();
        return;
      }

      nav.classList.add('open');
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'Close menu');
      nav.style.display = 'flex';
      nav.style.position = 'absolute';
      nav.style.top = '68px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.padding = '20px';
      nav.style.background = '#fff';
      nav.style.flexDirection = 'column';
      nav.style.borderBottom = '1px solid #e5e9f0';
    });

    document.addEventListener('click', (event) => {
      if (window.innerWidth <= 900 && nav.classList.contains('open') && !nav.contains(event.target) && event.target !== menuButton) {
        closeMenu();
      }
    });
  }

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector('.nav-dropbtn');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!button || !menu) return;

    button.setAttribute('aria-expanded', 'false');
    if (window.innerWidth <= 900) menu.style.display = 'none';

    button.addEventListener('click', (event) => {
      if (window.innerWidth <= 900) {
        event.preventDefault();
        event.stopPropagation();
        const isOpen = !dropdown.classList.contains('is-open');

        dropdowns.forEach((other) => {
          other.classList.remove('is-open');
          const otherButton = other.querySelector('.nav-dropbtn');
          const otherMenu = other.querySelector('.dropdown-menu');
          if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
          if (otherMenu) otherMenu.style.display = 'none';
        });

        if (isOpen) {
          dropdown.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
          menu.style.display = 'block';
        }
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      nav?.classList.remove('open');
      nav?.removeAttribute('style');
      if (menuButton) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open menu');
      }
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove('is-open');
        const button = dropdown.querySelector('.nav-dropbtn');
        const menu = dropdown.querySelector('.dropdown-menu');
        if (button) button.setAttribute('aria-expanded', 'false');
        if (menu) menu.style.display = '';
      });
    }
  });
});