document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector('.nav-dropbtn');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!button || !menu) return;

    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', (event) => {
      // On mobile, clicking the same dropdown button toggles it open/closed.
      if (window.innerWidth <= 900) {
        event.preventDefault();
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

  // Keep mobile dropdown state clean when returning to desktop.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove('is-open');
        const button = dropdown.querySelector('.nav-dropbtn');
        if (button) button.setAttribute('aria-expanded', 'false');
      });
    }
  });
});