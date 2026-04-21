/**
 * Cosmic Essence Education - Main JavaScript
 * Vanilla JS - No Frameworks
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initMobileMenu();
  initSmoothScroll();
  initTabs();
  initAccordion();
  initLazyLoading();
  initScrollAnimations();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');

    // Animate hamburger to X
    const spans = menuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      const spans = menuBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const navHeight = document.querySelector('.nav')?.offsetHeight || 72;
      const targetPosition = targetElement.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * Tab Component
 */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tab-container');

  tabContainers.forEach(container => {
    const tabBtns = container.querySelectorAll('.tab-btn');
    const tabContents = container.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetId = this.getAttribute('data-tab');

        // Remove active from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active to clicked tab
        this.classList.add('active');
        const targetContent = container.querySelector(`#${targetId}`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });
}

/**
 * Accordion Component
 */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (!header || !content) return;

    header.addEventListener('click', function() {
      // Close other items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.querySelector('.accordion-content')?.classList.remove('open');
        }
      });

      // Toggle current item
      content.classList.toggle('open');
    });
  });
}

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => img.classList.add('loaded'));
  }
}

/**
 * Scroll Animations (Fade in on scroll)
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => animationObserver.observe(el));
  } else {
    // Fallback
    animatedElements.forEach(el => el.classList.add('animated'));
  }
}

/**
 * Sticky Navigation Shadow
 */
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

/**
 * Form Validation Helper
 */
function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
  });

  return isValid;
}

/**
 * Copy to Clipboard
 */
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!');
    });
  } else {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Copied to clipboard!');
  }
}

/**
 * Toast Notification
 */
function showToast(message) {
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #111;
    color: #fff;
    padding: 12px 24px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add toast animations to CSS
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(toastStyles);
