const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const submenuWrap = document.querySelector(".has-submenu");
const submenuToggle = document.querySelector(".submenu-toggle");

const setExpanded = (el, value) => {
  if (!el) return;
  el.setAttribute("aria-expanded", value ? "true" : "false");
};

const closeSubmenu = () => {
  if (!submenuWrap || !submenuToggle) return;
  submenuWrap.classList.remove("is-open");
  setExpanded(submenuToggle, false);
};

const closeMenu = () => {
  if (!toggle || !nav) return;
  nav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  setExpanded(toggle, false);
  closeSubmenu();
};

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
    setExpanded(toggle, !isOpen);
    if (isOpen) closeSubmenu();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

if (submenuWrap && submenuToggle) {
  submenuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = submenuWrap.classList.contains("is-open");
    submenuWrap.classList.toggle("is-open", !isOpen);
    setExpanded(submenuToggle, !isOpen);
  });

  submenuWrap.querySelector(".submenu")?.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", closeSubmenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSubmenu();
  });
}

const toTop = document.querySelector(".to-top");

if (toTop) {
  const toggleToTop = () => {
    toTop.classList.toggle("is-visible", window.scrollY > 400);
  };
  toggleToTop();
  window.addEventListener("scroll", toggleToTop, { passive: true });
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const galleryButtons = document.querySelectorAll(".gallery-item");

if (lightbox && lightboxImg && lightboxClose && galleryButtons.length) {
  const openLightbox = (btn) => {
    const img = btn.querySelector("img");
    if (!img) return;
    const fullSrc = btn.dataset.full || img.src;
    lightboxImg.src = fullSrc;
    lightboxImg.alt = img.alt || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.classList.remove("menu-open");
  };

  galleryButtons.forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn));
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}
