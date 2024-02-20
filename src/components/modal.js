import { initialCards } from "../scripts/cards.js";
import { cardsContainer, addCard } from "../index.js";

const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// модалка добавления карточек
const popupInputName = formNewPlace.querySelector(".popup__input_type_card-name");
const popupInputUrl = formNewPlace.querySelector(".popup__input_type_url");

export function openModal(popup) {
  popup.classList.add("popup_is-opened");

  // Добавление имени со страницы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  //   Escape
  document.addEventListener("keydown", closeModalKey);
}

export function closeModal(evt, isClosed) {
  const openedPopup = document.querySelector(".popup_is-opened");
  const content = openedPopup.querySelector(".popup__content");
  const isCloseButton = evt.target.className.includes("popup__close");
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

// Добавление карточки пользователя
function attachCard(evt) {
  evt.preventDefault();
  const objCard = { name: popupInputName.value, link: popupInputUrl.value };
  initialCards.unshift(objCard);
  cardsContainer.prepend(addCard(objCard));

  popupInputName.value = "";
  popupInputUrl.value = "";

  closeModal(evt, true);
}

formNewPlace.addEventListener("submit", attachCard);

// Редактирование  профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(evt, true);
}

formEditProfile.addEventListener("submit", handleFormSubmit);
