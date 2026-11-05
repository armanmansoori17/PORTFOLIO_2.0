/**
 * Arman Mansoori Portfolio - Client Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initDynamicTyping();
  initProjectsFilter();
  initNavScrollSpy();
  initMobileMenu();
  initContactForm();
  updateFooterYear();
});

/* ===================================================================
   1. Theme Toggle (Dark / Light with LocalStorage Persistence)
   =================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('arman_portfolio_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('arman_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* ===================================================================
   2. Dynamic Typing Line (Hero Section - Strictly Full Stack Java Developer)
   =================================================================== */
function initDynamicTyping() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const title = "Full Stack Java Developer";
  let charIndex = 0;
  typingElement.textContent = "";

  function type() {
    if (charIndex <= title.length) {
      typingElement.textContent = title.substring(0, charIndex);
      charIndex++;
      setTimeout(type, 75);
    }
  }

  type();
}

/* ===================================================================
   3. Featured Projects Filter (Matches Image 5 Tabs)
   =================================================================== */
function initProjectsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   4. Navbar Scroll Spy & Active State
   =================================================================== */
function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   5. Mobile Navigation Menu
   =================================================================== */
function initMobileMenu() {
  const trigger = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-link');

  if (!trigger || !menu) return;

  function toggleMenu() {
    const isOpen = menu.classList.toggle('open');
    trigger.classList.toggle('active', isOpen);
  }

  function closeMenu() {
    menu.classList.remove('open');
    trigger.classList.remove('active');
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when tapping outside
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !trigger.contains(e.target) && menu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ===================================================================
   6. Contact Form Submission
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const subject = form.elements['subject'].value.trim();
    const message = form.elements['message'].value.trim();

    if (!name || !email || !subject || !message) {
      statusMsg.className = 'form-status-msg error';
      statusMsg.textContent = 'Please fill out all fields.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Opening Mail Client...</span>';

    setTimeout(() => {
      statusMsg.className = 'form-status-msg success';
      statusMsg.textContent = `Thank you, ${name}! Opening mail client to send message to Arman...`;

      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-regular fa-paper-plane"></i>';

      const mailtoUrl = `mailto:mansooriarman15@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
      window.location.href = mailtoUrl;

      showToast("Email client opened!");
    }, 600);
  });
}

/* ===================================================================
   7. Footer Year
   =================================================================== */
function updateFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ===================================================================
   Toast Helper
   =================================================================== */
function showToast(message) {
  const box = document.getElementById('toast-box');
  if (!box) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<i class="fa-solid fa-check"></i> <span>${message}</span>`;

  box.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}
