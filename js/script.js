const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const dropdowns = document.querySelectorAll('.nav-dropdown');

if (menuButton && nav) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');

  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuButton.classList.toggle('is-open', open);
    menuButton.innerHTML = open ? '<span aria-hidden="true">✕</span>' : '<span aria-hidden="true">☰</span>';

    nav.style.display = open ? 'flex' : '';
    nav.style.position = open ? 'absolute' : '';
    nav.style.top = open ? '68px' : '';
    nav.style.left = open ? '0' : '';
    nav.style.right = open ? '0' : '';
    nav.style.padding = open ? '20px' : '';
    nav.style.background = open ? '#fff' : '';
    nav.style.flexDirection = open ? 'column' : '';
    nav.style.borderBottom = open ? '1px solid #e5e9f0' : '';
  });
}

dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector('.nav-dropbtn');
  const menu = dropdown.querySelector('.dropdown-menu');
  if (!button || !menu) return;

  button.setAttribute('aria-expanded', 'false');

  button.addEventListener('click', (event) => {
    if (window.innerWidth <= 900) {
      event.preventDefault();
      const isOpen = dropdown.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
      menu.style.display = isOpen ? 'block' : 'none';

      dropdowns.forEach((other) => {
        if (other !== dropdown) {
          other.classList.remove('is-open');
          const otherButton = other.querySelector('.nav-dropbtn');
          const otherMenu = other.querySelector('.dropdown-menu');
          if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
          if (otherMenu) otherMenu.style.display = 'none';
        }
      });
    }
  });
});

// Close the mobile menu when clicking outside the header.
document.addEventListener('click', (event) => {
  if (window.innerWidth <= 900 && nav && menuButton && nav.classList.contains('open')) {
    if (!event.target.closest('.site-header')) {
      nav.classList.remove('open');
      menuButton.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
      menuButton.innerHTML = '<span aria-hidden="true">☰</span>';
      nav.style.display = '';
      nav.style.position = '';
      nav.style.top = '';
      nav.style.left = '';
      nav.style.right = '';
      nav.style.padding = '';
      nav.style.background = '';
      nav.style.flexDirection = '';
      nav.style.borderBottom = '';
    }
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('is-open');
      const button = dropdown.querySelector('.nav-dropbtn');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (button) button.setAttribute('aria-expanded', 'false');
      if (menu) menu.style.display = '';
    });

    if (nav && menuButton) {
      nav.classList.remove('open');
      menuButton.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
      menuButton.innerHTML = '<span aria-hidden="true">☰</span>';
      nav.style.display = '';
      nav.style.position = '';
      nav.style.top = '';
      nav.style.left = '';
      nav.style.right = '';
      nav.style.padding = '';
      nav.style.background = '';
      nav.style.flexDirection = '';
      nav.style.borderBottom = '';
    }
  }
});