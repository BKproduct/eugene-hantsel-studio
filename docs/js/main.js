/* =========================================
   EUGENE HANTSEL — PRIVATE BODY TRANSFORMATION
   Main JavaScript — Interactions & Animations
   ========================================= */

(function () {
  'use strict';

  /* --- Nav scroll behaviour --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    let ticking = false;
    const onNavScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('nav-scrolled', window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onNavScroll, { passive: true });
  }

  /* --- Mobile menu --- */
  const toggle  = document.querySelector('.nav-toggle');
  const overlay = document.querySelector('.nav-overlay');
  const closeBtn = document.querySelector('.nav-overlay-close');

  if (toggle && overlay) {
    const openMenu = () => {
      overlay.style.display = 'flex';
      requestAnimationFrame(() => overlay.classList.add('open'));
      document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
      overlay.classList.remove('open');
      setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    };
    toggle.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* --- IntersectionObserver: all animated elements --- */
  const animEls = document.querySelectorAll(
    '.fade-up, .fade-in, .scale-in, .slide-left, ' +
    '.gold-rule, .intel-panel, .programme-stat, ' +
    '.phase, .method-card, .testimonial, .credential'
  );

  if (animEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.10, rootMargin: '0px 0px -36px 0px' }
    );
    animEls.forEach(el => observer.observe(el));
  } else {
    /* Fallback: show all immediately */
    animEls.forEach(el => el.classList.add('visible'));
  }

  /* --- Hero entrance animation on load --- */
  const heroEnterEls = document.querySelectorAll('.hero-enter');
  heroEnterEls.forEach(el => el.classList.add('hero-loaded'));

  /* --- Hero image load → remove zoom --- */
  const heroBgImg = document.querySelector('.hero-bg img');
  if (heroBgImg) {
    const markLoaded = () => heroBgImg.classList.add('loaded');
    if (heroBgImg.complete && heroBgImg.naturalWidth > 0) {
      markLoaded();
    } else {
      heroBgImg.addEventListener('load', markLoaded);
    }
  }

  /* --- Subtle hero parallax (desktop only) --- */
  if (window.innerWidth >= 1024 && heroBgImg) {
    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      if (sy < window.innerHeight * 1.2) {
        heroBgImg.style.transform =
          (heroBgImg.classList.contains('loaded') ? 'scale(1)' : 'scale(1.04)') +
          ` translateY(${sy * 0.20}px)`;
      }
    }, { passive: true });
  }

  /* --- Smooth scroll for nav anchors --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --- Visual break images: subtle Ken Burns on hover --- */
  document.querySelectorAll('.visual-break img, .visual-break-2 img').forEach(img => {
    const parent = img.closest('.visual-break, .visual-break-2');
    if (!parent) return;
    parent.addEventListener('mouseenter', () => {
      img.style.transition = 'transform 14s ease';
    });
    parent.addEventListener('mouseleave', () => {
      img.style.transition = 'transform 14s ease';
    });
  });

})();
