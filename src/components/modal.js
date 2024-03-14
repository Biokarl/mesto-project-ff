function openModal(popup) {
  popup.classList.add("popup_is-opened");

  //   Escape
  document.addEventListener("keydown", handleCloseByEsc);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleCloseByEsc);
}
function handleCloseByClick(evt, popup) {
  const isCloseButton = evt.target.classList.contains("popup__close");
  const isOverlay = evt.target.classList.contains("popup_is-opened");

  if (isCloseButton || isOverlay) {
    closeModal(popup);
  }
}

function handleCloseByEsc(evt) {
  const isEscPressed = evt.key === "Escape";
  if (isEscPressed) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export { openModal, closeModal, handleCloseByClick };
