const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';

    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open');
    document.body.classList.toggle('menu-open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

const toTop = document.querySelector('.to-top');

if (toTop) {
  const toggleToTop = () => {
    toTop.classList.toggle('is-visible', window.scrollY > 400);
  };

  toggleToTop();
  window.addEventListener('scroll', toggleToTop, { passive: true });
}
