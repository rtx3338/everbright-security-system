const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
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