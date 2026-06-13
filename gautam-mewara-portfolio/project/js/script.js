/* ============================================================
   script.js — Gautam Mewara Portfolio
   Created by Gautam Mewara
   ============================================================ */

/* ── Mobile Nav Toggle ──────────────────────────────────────── */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ── Active Nav Link ────────────────────────────────────────── */
(function setActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── Scroll-triggered Progress Bars ────────────────────────── */
function animateProgressBars() {
  document.querySelectorAll('.progress-fill[data-pct]').forEach(bar => {
    const pct = bar.getAttribute('data-pct');
    bar.style.setProperty('--pct', pct + '%');
    bar.style.width = pct + '%';
  });
}

/* ── Intersection Observer for Fade-in ─────────────────────── */
const observerOpts = { threshold: 0.12 };
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.fade-in').forEach(el => {
  fadeObserver.observe(el);
});

/* ── Skill Level Bar Observer ───────────────────────────────── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress-fill').forEach(bar => {
        const pct = bar.getAttribute('data-pct') || '0';
        bar.style.width = pct + '%';
      });
      entry.target.querySelectorAll('.skill-level-fill').forEach(bar => {
        const pct = bar.getAttribute('data-pct') || '0';
        bar.style.width = pct + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.hero-card-progress, .skills-grid, .skills-table-section').forEach(el => {
  barObserver.observe(el);
});

/* ── FAQ Accordion ──────────────────────────────────────────── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
    });

    if (!isOpen) item.classList.add('open');
  });
});

/* ── Contact Form ───────────────────────────────────────────── */
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const original = btn.textContent;

    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#22c55e,#4ade80)';

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

/* ── Smooth Scroll for Anchor Links ────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Navbar scroll shadow ───────────────────────────────────── */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,.4)';
    } else {
      navbar.style.boxShadow = '';
    }
  }
});

/* ── Skill bar init (for about page) ───────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.skill-level-fill').forEach(bar => {
      const pct = bar.getAttribute('data-pct') || '0';
      bar.style.transition = 'width 1.2s ease';
      bar.style.width = pct + '%';
    });
    document.querySelectorAll('.progress-fill').forEach(bar => {
      const pct = bar.getAttribute('data-pct') || '0';
      bar.style.transition = 'width 1.4s ease';
      bar.style.width = pct + '%';
    });
  }, 400);
});
