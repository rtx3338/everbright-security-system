const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const dropdowns = document.querySelectorAll('.nav-dropdown');

function updateArrow(button, open) {
  if (!button) return;
  const arrow = button.querySelector('span');
  if (arrow) {
    // Use explicit characters so the mobile state is always visually unambiguous.
    arrow.textContent = open ? '▲' : '▼';
    arrow.setAttribute('aria-hidden', 'true');
  }
}

function setDropdownState(dropdown, open) {
  const button = dropdown.querySelector('.nav-dropbtn');
  const menu = dropdown.querySelector('.dropdown-menu');

  dropdown.classList.toggle('is-open', open);
  if (button) {
    button.setAttribute('aria-expanded', String(open));
    button.classList.toggle('is-open', open);
    updateArrow(button, open);
  }

  if (menu && window.innerWidth <= 900) {
    menu.style.setProperty('display', open ? 'block' : 'none', 'important');
  } else if (menu) {
    menu.style.removeProperty('display');
  }
}

function closeDropdowns() {
  dropdowns.forEach((dropdown) => setDropdownState(dropdown, false));
}

function closeMobileMenu() {
  if (!menuButton || !nav) return;

  nav.classList.remove('open');
  menuButton.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.textContent = '';
  closeDropdowns();
}

if (menuButton && nav) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.textContent = '';

  menuButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (nav.classList.contains('open')) {
      closeMobileMenu();
    } else {
      nav.classList.add('open');
      menuButton.classList.add('is-open');
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'Close menu');
    }
  });
}

// Mobile dropdowns: ▼ when closed, ▲ when open.
dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector('.nav-dropbtn');
  if (!button) return;

  button.setAttribute('aria-expanded', 'false');
  button.classList.remove('is-open');
  updateArrow(button, false);

  button.addEventListener('click', (event) => {
    if (window.innerWidth > 900) return;

    event.preventDefault();
    event.stopPropagation();

    const isOpen = dropdown.classList.contains('is-open');
    closeDropdowns();

    if (!isOpen) {
      setDropdownState(dropdown, true);
    }
  });
});

document.addEventListener('click', (event) => {
  if (window.innerWidth <= 900 && nav && nav.classList.contains('open')) {
    if (!event.target.closest('.site-header')) {
      closeMobileMenu();
    }
  }
});

if (nav) {
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) closeMobileMenu();
    });
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeDropdowns();
    if (nav) nav.classList.remove('open');
    if (menuButton) {
      menuButton.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    }
  }
});