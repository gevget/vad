(() => {
  'use strict';

  const galleries = document.querySelectorAll('.product-gallery');
  if (!galleries.length) return;

  const lightbox = document.createElement('dialog');
  lightbox.className = 'product-gallery__lightbox';
  lightbox.setAttribute('aria-label', 'Просмотр фотографии');
  lightbox.innerHTML = '<button class="product-gallery__close" type="button" aria-label="Закрыть фотографию">×</button><img alt="">';
  document.body.append(lightbox);

  const image = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('.product-gallery__close');
  let lastTrigger = null;

  galleries.forEach(gallery => {
    gallery.addEventListener('click', event => {
      const trigger = event.target.closest('[data-gallery-image]');
      if (!trigger || !gallery.contains(trigger)) return;

      const thumbnail = trigger.querySelector('img');
      lastTrigger = trigger;
      image.src = trigger.dataset.galleryImage;
      image.alt = thumbnail ? thumbnail.alt : '';
      lightbox.showModal();
      closeButton.focus({ preventScroll: true });
    });
  });

  closeButton.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    image.removeAttribute('src');
    lastTrigger?.focus({ preventScroll: true });
  });
})();
