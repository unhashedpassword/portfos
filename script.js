// ===== Mobile navigation =====
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');

  if (burger && nav) {
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    const closeNav = () => {
      nav.classList.remove('open');
      overlay.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    };

    const toggleNav = () => {
      const isOpen = nav.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    };

    burger.addEventListener('click', toggleNav);
    overlay.addEventListener('click', closeNav);

    // Close menu after clicking a plain link (not dropdown toggles) on mobile
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 840) closeNav();
      });
    });

    // Accordion-style dropdowns on mobile
    nav.querySelectorAll('.has-dropdown > a').forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth > 840) return; // desktop uses hover
        e.preventDefault();
        const parent = toggle.parentElement;
        const wasOpen = parent.classList.contains('open');
        nav.querySelectorAll('.has-dropdown.open').forEach((el) => el.classList.remove('open'));
        if (!wasOpen) parent.classList.add('open');
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 840) closeNav();
    });
  }

  // ===== Contact form (front-end only demo handling) =====
  const form = document.getElementById('leadForm');
  const note = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const email = form.email.value.trim();

      if (!name || !phone) {
        note.textContent = 'Пожалуйста, укажите имя и номер телефона.';
        note.style.color = '#c0392b';
        return;
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.textContent = 'Проверьте, пожалуйста, адрес e-mail.';
        note.style.color = '#c0392b';
        return;
      }

      // No backend wired up yet — replace this block with a real request
      // (e.g. fetch('/api/lead', { method: 'POST', body: new FormData(form) }))
      note.textContent = 'Спасибо! Мы свяжемся с вами в течение 5 минут.';
      note.style.color = '#225556';
      form.reset();
    });
  }
});
