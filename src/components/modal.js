// Модальные окна

export function openModal(popup) {
  popup.classList.add("popup_is-opened");

  //   Escape
  document.addEventListener("keydown", closeModalKey);
}

export function closeModal(evt, isClosed) {
  const openedPopup = document.querySelector(".popup_is-opened");
  const content = openedPopup.querySelector(".popup__content");
  const isCloseButton = evt.target.className === "popup__close";
  const isHasContent = evt.composedPath().includes(content);

  if (!isHasContent || isCloseButton || isClosed) {
    openedPopup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeModalKey);
  }
}

function closeModalKey(evt) {
  const isClosed = evt.key === "Escape";
  if (isClosed) {
    closeModal(evt, isClosed);
  }
}
