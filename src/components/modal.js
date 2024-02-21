const formEditProfile = document.forms["edit-profile"];
const popupProfile = document.querySelector(".popup_type_edit");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

export { formEditProfile, popupProfile, nameInput, jobInput, profileTitle, profileDescription };

export function openProfilePopup(popup) {
  // Добавление имени со страницы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popup);
}

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
  const content = popup.querySelector(".popup__content");
  const isCloseButton = evt.target.className.includes("popup__close");
  const isHasContent = evt.composedPath().includes(content);
  if (isCloseButton || !isHasContent) {
    closeModal(popup);
  }
}

function handleCloseByEsc(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  const isEscPressed = evt.key === "Escape";
  if (isEscPressed) {
    closeModal(openedPopup);
  }
}
