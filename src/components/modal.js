export { formEditProfile, nameInput, jobInput, profileTitle, profileDescription };

const formEditProfile = document.forms["edit-profile"];
const popupProfile = document.querySelector(".popup_type_edit");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

export function openProfilePopup() {
  // Добавление имени со страницы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupProfile);
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");

  //   Escape
  document.addEventListener("keydown", handleCloseByEsc);
}

export function closeModal(evt, isEscPressed) {
  const openedPopup = document.querySelector(".popup_is-opened");
  const content = openedPopup.querySelector(".popup__content");
  const isCloseButton = evt.target.className.includes("popup__close");
  const isHasContent = evt.composedPath().includes(content);

  if (!isHasContent || isCloseButton || isEscPressed) {
    openedPopup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleCloseByEsc);
  }
}

function handleCloseByEsc(evt) {
  const isEscPressed = evt.key === "Escape";
  if (isEscPressed) {
    closeModal(evt, isEscPressed);
  }
}
