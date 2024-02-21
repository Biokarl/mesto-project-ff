import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  handleCloseByClick,
  formEditProfile,
  popupProfile,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
} from "./components/modal.js";
import "./pages/index.css"; // добавьте импорт главного файла стилей

// @todo: DOM узлы

export const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup ");

const buttonProfile = document.querySelector(".profile__edit-button");

const buttonNewCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageDescription = popupImage.querySelector(".popup__caption");

// модалка добавления карточек
const formNewPlace = document.forms["new-place"];
const popupInputName = formNewPlace.querySelector(".popup__input_type_card-name");
const popupInputUrl = formNewPlace.querySelector(".popup__input_type_url");

// @todo: Функция создания карточки

export function addCard(element) {
  const item = {
    name: element.name,
    link: element.link,
  };
  const cardElement = createCard(item, { deleteCard, openCard, likeCard });

  return cardElement;
}

// @todo: Вывести карточки на страницу

cardsContainer.append(...initialCards.map(addCard));

// Открытие модальных окон

buttonProfile.addEventListener("click", function () {
  openProfilePopup(popupProfile);
});

buttonNewCard.addEventListener("click", function () {
  openModal(popupNewCard);
});

//Закрытие оверлей
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => handleCloseByClick(evt, popup));
});

// Добавление карточки пользователя
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: popupInputName.value, link: popupInputUrl.value };
  cardsContainer.prepend(addCard(cardData));

  formNewPlace.reset();

  closeModal(popupNewCard);
}

formNewPlace.addEventListener("submit", handleAddCardFormSubmit);

// Редактирование  профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupProfile);
}

formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);

// Функция открытия карточки
function openCard(element) {
  const link = element.target.src;
  const name = element.target.alt;

  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupImageDescription.textContent = name;

  openModal(popupImage);
}

function openProfilePopup(popup) {
  // Добавление имени со страницы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popup);
}
