const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');

    // Also close submenu if open
    const submenuWrap = document.querySelector('.has-submenu');
    const submenuToggle = document.querySelector('.submenu-toggle');
    submenuWrap?.classList.remove('is-open');
    submenuToggle?.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';

    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open');
    document.body.classList.toggle('menu-open');
  });

  // Close full-screen menu when clicking any direct nav link
  nav.querySelectorAll(':scope > a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking submenu links (handled below too, but safe)
  nav.querySelectorAll('.submenu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* Back to top */
const toTop = document.querySelector('.to-top');

if (toTop) {
  const toggleToTop = () => {
    toTop.classList.toggle('is-visible', window.scrollY > 400);
  };

  toggleToTop();
  window.addEventListener('scroll', toggleToTop, { passive: true });
}

/* Submenu (What I do) */
const submenuWrap = document.querySelector('.has-submenu');
const submenuToggle = document.querySelector('.submenu-toggle');

if (submenuWrap && submenuToggle) {
  const closeSubmenu = () => {
    submenuWrap.classList.remove('is-open');
    submenuToggle.setAttribute('aria-expanded', 'false');
  };

  submenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = submenuWrap.classList.contains('is-open');
    submenuWrap.classList.toggle('is-open', !isOpen);
    submenuToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close submenu on outside click / Escape
  document.addEventListener('click', closeSubmenu);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSubmenu();
  });

  // Prevent closing when clicking inside submenu
  submenuWrap.querySelector('.submenu')?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // When clicking a submenu link: close submenu + close mobile menu if open
  submenuWrap.querySelectorAll('.submenu a').forEach(a => {
    a.addEventListener('click', () => {
      closeSubmenu();

      // Close mobile fullscreen menu if open
      nav?.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

/* Gallery lightbox */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const galleryButtons = document.querySelectorAll('.gallery-item');

if (lightbox && lightboxImg && lightboxClose && galleryButtons.length) {
  const openLightbox = (imgEl) => {
    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open'); // prevent scroll
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.classList.remove('menu-open');
  };

  galleryButtons.forEach(btn => {
    const img = btn.querySelector('img');
    if (!img) return;
    btn.addEventListener('click', () => openLightbox(img));
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}
