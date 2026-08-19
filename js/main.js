document.addEventListener('DOMContentLoaded', () => {
  const experienceCards = document.querySelectorAll('.exp-card');

  document.querySelectorAll('.exp-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.exp-card');
      card.classList.toggle('open');
    });
  });

  const expandAllButton = document.querySelector('.exp-expand-all');
  const collapseAllButton = document.querySelector('.exp-collapse-all');

  if (expandAllButton) {
    expandAllButton.addEventListener('click', () => {
      experienceCards.forEach(card => card.classList.add('open'));
    });
  }

  if (collapseAllButton) {
    collapseAllButton.addEventListener('click', () => {
      experienceCards.forEach(card => card.classList.remove('open'));
    });
  }

  const contactToggle = document.querySelector('.contact-toggle');
  const contactPanel = document.querySelector('#contact-panel');
  if (contactToggle && contactPanel) {
    contactToggle.addEventListener('click', () => {
      const isOpen = contactToggle.getAttribute('aria-expanded') === 'true';
      contactToggle.setAttribute('aria-expanded', String(!isOpen));
      contactPanel.hidden = isOpen;
    });
  }

  const aboutContactToggle = document.querySelector('.about-contact-toggle');
  const aboutContactPanel = document.querySelector('#about-contact-panel');
  if (aboutContactToggle && aboutContactPanel) {
    aboutContactToggle.addEventListener('click', () => {
      const isOpen = aboutContactToggle.getAttribute('aria-expanded') === 'true';
      aboutContactToggle.setAttribute('aria-expanded', String(!isOpen));
      aboutContactPanel.hidden = isOpen;
    });
  }

  document.querySelectorAll('.copy-action').forEach(button => {
    button.addEventListener('click', async () => {
      const originalText = button.textContent;
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        button.textContent = '已复制';
      } catch {
        button.textContent = '复制失败';
      }
      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1400);
    });
  });

  const hobbyLightboxModal = document.querySelector('.hobby-lightbox-modal');
  const hobbyLightboxImage = document.querySelector('.hobby-lightbox-image');
  const hobbyLightboxClose = document.querySelector('.hobby-lightbox-close');

  const closeLightbox = () => {
    if (!hobbyLightboxModal || !hobbyLightboxImage) return;
    hobbyLightboxModal.hidden = true;
    hobbyLightboxImage.src = '';
    hobbyLightboxImage.alt = '';
  };

  const openLightbox = (trigger) => {
    if (!hobbyLightboxModal || !hobbyLightboxImage) return;
    hobbyLightboxImage.src = trigger.dataset.fullsrc;
    hobbyLightboxImage.alt = trigger.dataset.alt || '';
    hobbyLightboxModal.hidden = false;
  };

  hobbyLightboxClose?.addEventListener('click', closeLightbox);
  hobbyLightboxModal?.addEventListener('click', (event) => {
    if (event.target === hobbyLightboxModal) {
      closeLightbox();
    }
  });

  document.querySelectorAll('[data-open-hobby]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modal = document.querySelector(`[data-hobby-modal="${trigger.dataset.openHobby}"]`);
      if (modal) {
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('.hobby-modal').forEach(modal => {
    const stage = modal.querySelector('[data-photo-stack]');

    const closeModal = () => {
      modal.hidden = true;
      document.body.style.overflow = '';
      stage?.classList.remove('is-spread');
      closeLightbox();
    };

    modal.querySelector('.hobby-modal-close')?.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    if (stage) {
      stage.addEventListener('click', (event) => {
        const trigger = event.target.closest('.photo-stack-item');
        if (!trigger) return;

        if (!stage.classList.contains('is-spread')) {
          stage.classList.add('is-spread');
          event.preventDefault();
          return;
        }

        openLightbox(trigger);
      });
    }
  });

  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const pageSections = Array.from(document.querySelectorAll('main section[id]'));

  const updateActiveNav = () => {
    const currentY = window.scrollY + 140;
    let activeId = 'home';

    pageSections.forEach(section => {
      if (section.offsetTop <= currentY) {
        activeId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  };

  updateActiveNav();
  document.addEventListener('scroll', updateActiveNav, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (hobbyLightboxModal && !hobbyLightboxModal.hidden) {
        closeLightbox();
        return;
      }

      document.querySelectorAll('.hobby-modal').forEach(modal => {
        modal.hidden = true;
      });
      document.querySelectorAll('[data-photo-stack]').forEach(stage => {
        stage.classList.remove('is-spread');
      });
      document.body.style.overflow = '';
    }
  });
});

