document.addEventListener('DOMContentLoaded', () => {

  // ─── Typing effect ───

  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const text = 'AI-assisted delivery that actually ships.';
    let i = 0;

    function typeChar() {
      if (i < text.length) {
        typedEl.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 45 + Math.random() * 35);
      }
    }

    setTimeout(typeChar, 600);
  }

  // ─── Scroll reveals ───

  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // ─── Smooth scroll for anchor links ───

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });

        // Close mobile dropdown if open
        const dropdown = this.closest('.dropdown');
        if (dropdown) {
          document.activeElement.blur();
        }
      }
    });
  });

  // ─── Active nav highlight on scroll ───

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle(
                'text-primary',
                link.getAttribute('href') === '#' + id
              );
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '-80px 0px -60% 0px' }
    );

    sections.forEach((section) => navObserver.observe(section));
  }
});
