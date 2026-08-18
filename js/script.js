const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const dropdowns = document.querySelectorAll('.nav-dropdown');

function closeMobileMenu() {
  if (!menuButton || !nav) return;

  nav.classList.remove('open');
  menuButton.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.innerHTML = '<span aria-hidden="true">☰</span>';

  dropdowns.forEach((dropdown) => {
    dropdown.classList.remove('is-open');
    const button = dropdown.querySelector('.nav-dropbtn');
    if (button) button.setAttribute('aria-expanded', 'false');
  });
}

if (menuButton && nav) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');

  menuButton.addEventListener('click', (event) => {
    event.stopPropagation();

    const open = !nav.classList.contains('open');

    if (open) {
      nav.classList.add('open');
      menuButton.classList.add('is-open');
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'Close menu');
      menuButton.innerHTML = '<span aria-hidden="true">✕</span>';
    } else {
      closeMobileMenu();
    }
  });
}

// Mobile dropdowns: tap once to open, tap again to close.
dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector('.nav-dropbtn');
  if (!button) return;

  button.setAttribute('aria-expanded', 'false');

  button.addEventListener('click', (event) => {
    if (window.innerWidth <= 900) {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = dropdown.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));

      dropdowns.forEach((other) => {
        if (other !== dropdown) {
          other.classList.remove('is-open');
          const otherButton = other.querySelector('.nav-dropbtn');
          if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
});

// Close when clicking anywhere outside the mobile header/menu.
document.addEventListener('click', (event) => {
  if (window.innerWidth <= 900 && nav && nav.classList.contains('open')) {
    if (!event.target.closest('.site-header')) {
      closeMobileMenu();
    }
  }
});

// Close after selecting any normal navigation link on mobile.
if (nav) {
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) closeMobileMenu();
    });
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMobileMenu();
});