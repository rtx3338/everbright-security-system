const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
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

// Mobile dropdowns: tap once to open, tap again to close.
const dropdowns = document.querySelectorAll('.nav-dropdown');

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

      // Close the other dropdown when opening this one.
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

// Reset mobile dropdown state when switching back to desktop.
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('is-open');
      const button = dropdown.querySelector('.nav-dropbtn');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (button) button.setAttribute('aria-expanded', 'false');
      if (menu) menu.style.display = '';
    });
  }
});