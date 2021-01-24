import imagesArr from "../js/gallery-items.js";

const galleryMarkup = document.querySelector(".js-gallery");
const cardImage = createImageMarkup(imagesArr);
const lightboxImage = document.querySelector(".lightbox__image");
const lightbox = document.querySelector(".js-lightbox");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const closeLightboxButton = document.querySelector(
  'button[data-action="close-lightbox"]'
);

galleryMarkup.insertAdjacentHTML("beforeend", cardImage);
galleryMarkup.addEventListener("click", onGalleryClick);
closeLightboxButton.addEventListener("click", closeLightboxHandler);
lightboxOverlay.addEventListener("click", onOverlayClick);

function createImageMarkup(images) {
  return images
    .map(({ original, preview, description }, index) => {
      return `
        <li class="gallery__item">
        <a
        class="gallery__link"
        href="${original}"
        >
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        data-index="${index}"
        alt="${description}"
        />
        </a>
        </li>`;
    })
    .join("");
}

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const largeImageUrl = event.target.dataset.source;
  lightboxImage.src = largeImageUrl;

  lightbox.classList.add("is-open");
  addOnEscModalClose();
}

function addOnEscModalClose() {
  window.addEventListener("keydown", onPressEscape);
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    closeLightboxHandler();
  }
}

function closeLightboxHandler() {
  removeOnEscModalClose();
  lightbox.classList.remove("is-open");
  lightboxImage.src = "";
}
function removeOnEscModalClose() {
  window.removeEventListener("keydown", onPressEscape);
}
function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeLightboxHandler();
  }
}
