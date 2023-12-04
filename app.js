import images from './galleryItems.js';

const galleryContainer = document.querySelector(".js-gallery");
const imagesMarkup = createGalleryItemsMarkup(images);
const lightBoxImage = document.querySelector(".js-lightbox");
const imageItem = document.querySelector(".lightbox__image");
const backdrop = document.querySelector(".lightbox__overlay");
const btnClose = document.querySelector('[data-action="close-lightbox"]');

galleryContainer.insertAdjacentHTML("beforeend", imagesMarkup);
galleryContainer.addEventListener("click", onGalleryItemClick);
btnClose.addEventListener("click", onHandlerClose);
backdrop.addEventListener("click", onBackdropClick);

function createGalleryItemsMarkup(images) {
  return images.map(({ preview, description, original }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`;
    }).join("");
};

function onGalleryItemClick(e) {
  e.preventDefault();
  const isGalleryImageEl = e.target.classList.contains("gallery__image");
  if (!isGalleryImageEl) {
    return;
  };
 
  if (isGalleryImageEl) {
    window.addEventListener("keydown", onEscKeyPress);
    lightBoxImage.classList.add("is-open");

    imageItem.src = e.target.getAttribute("data-source");
    imageItem.alt = e.target.alt;
  };
};

function onHandlerClose(e) {

  window.removeEventListener("keydown", onEscKeyPress);
  lightBoxImage.classList.remove("is-open");
  imageItem.src = "";
  imageItem.alt = "";
};

function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    onHandlerClose();
  };
};

function onEscKeyPress(e) {
  console.log(e);
  const ESC_KEY_CODE = "Escape";
  if (e.code === ESC_KEY_CODE) {
    onHandlerClose();
  };
};
