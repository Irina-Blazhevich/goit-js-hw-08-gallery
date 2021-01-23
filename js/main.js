import initialArr from "../js/gallery-items.js";

const galleryMarkup = document.querySelector(".js-gallery");
const cardImage = createImageMarkup(initialArr);
const lightboxImage = document.querySelector(".lightbox__image");
const lightbox = document.querySelector(".js-lightbox");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const closeLightboxButton = document.querySelector(
  'button[data-action="close-lightbox"]'
);
// let currentImgIdx = 0;

galleryMarkup.insertAdjacentHTML("beforeend", cardImage);
galleryMarkup.addEventListener("click", onGalleryClick);
closeLightboxButton.addEventListener("click", closeLightboxHandler);
lightboxOverlay.addEventListener("click", onClickOverlay);

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
  //   currentImgIdx = Number(event.target.dataset.index);
  lightbox.classList.add("is-open");
  addKeydownListener();
}

function addKeydownListener() {
  window.addEventListener("keydown", onPressEscape);
}

function closeLightboxHandler() {
  removeKeydownListener();
  lightbox.classList.remove("is-open");
  lightboxImage.src = "";
}
function removeKeydownListener() {
  window.removeEventListener("keydown", onPressEscape);
}
function onClickOverlay(event) {
  if (event.target === event.currentTarget) {
    closeLightboxHandler();
  }
}
function onPressEscape(event) {
  if (event.code === "Escape") {
    closeLightboxHandler();
  }
}
