import SimpleLightbox from 'simplelightbox';
import { galleryItems } from './gallery-items';

import 'the-new-css-reset/css/reset.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

const galleryMarkup = galleryItems.reduce(
  (markup, { preview, original, description }) => {
    return (markup += `<li class="gallery__item">
              <a class="gallery__link" href=${original}>
                <img
                  class="gallery__image"
                  src="${preview}"
                  data-source="${original}"
                  alt="${description}"
                />
              </a>
            </li>`);
  },
  ''
);

gallery.innerHTML = galleryMarkup;

new SimpleLightbox('.gallery a');