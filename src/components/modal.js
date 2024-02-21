const formEditProfile = document.forms["edit-profile"];
const popupProfile = document.querySelector(".popup_type_edit");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

export { formEditProfile, popupProfile, nameInput, jobInput, profileTitle, profileDescription };

export function openModal(popup) {
  popup.classList.add("popup_is-opened");

  //   Escape
  document.addEventListener("keydown", handleCloseByEsc);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleCloseByEsc);
}

export function handleCloseByClick(evt, popup) {
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
