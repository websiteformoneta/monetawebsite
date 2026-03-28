/* ============================================================
   MONETA CLOUD — main.js
   Handles: sticky nav, mobile menu, scroll-reveal animations
   ============================================================ */

(function () {
  'use strict';

  /* ── Sticky nav: add .scrolled class when page is scrolled ── */
  const nav = document.querySelector('.nav');

  function handleNavScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  if (nav) {
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // run on load in case page is already scrolled
  }

  /* ── Mobile hamburger menu toggle ── */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Highlight active nav link based on current page ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll-reveal animations using IntersectionObserver ── */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately if observer not supported
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // Hard fallback: ensure all reveals are visible after 1s regardless
  // (handles headless browsers and slow connections)
  setTimeout(function () {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }, 800);

  /* ── Contact Modal — open overlay instead of scrolling to form section ── */
  const contactModal = document.getElementById('contact-modal');

  function openContactModal() {
    if (!contactModal) return;
    contactModal.hidden = false;
    document.body.style.overflow = 'hidden';
    // Focus the first input after the entry animation completes
    setTimeout(function () {
      const firstInput = contactModal.querySelector('input, textarea');
      if (firstInput) firstInput.focus();
    }, 350);
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.hidden = true;
    document.body.style.overflow = '';
  }

  if (contactModal) {
    // Close on backdrop click
    const backdrop = contactModal.querySelector('.contact-modal__backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeContactModal);
    }

    // Close on X button click
    const closeBtn = contactModal.querySelector('.contact-modal__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeContactModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !contactModal.hidden) {
        closeContactModal();
      }
    });
  }

  /* ── Intercept all #contact links to open modal instead of scrolling ── */
  document.querySelectorAll('a[href="#contact"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      openContactModal();
    });
  });

  /* ── Smooth scroll for other anchor links (non-contact) ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      // Contact links are handled above — skip here
      if (targetId === 'contact') return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
          10
        );
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 24;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Staggered reveal for grid children ── */
  // Adds transition-delay to grid children so they cascade in
  document.querySelectorAll('.grid-2, .grid-3, .grid-4, .outcome-grid, .steps').forEach(function (grid) {
    const children = grid.querySelectorAll('.reveal');
    children.forEach(function (child, i) {
      child.style.transitionDelay = (i * 80) + 'ms';
    });
  });

})();
