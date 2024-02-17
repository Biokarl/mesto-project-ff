import { initialCards } from "./scripts/cards.js";

import "./pages/index.css"; // добавьте импорт главного файла стилей

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки

function addCard(element) {
  const item = {
    name: element.name,
    link: element.link,
  };
  const cardElement = createCard(item, { deleteCard });

  return cardElement;
}

function createCard(item, { deleteCard }) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);
  cardImage.src = item.link;
  cardImage.alt = item.name;

  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу

cardsContainer.append(...initialCards.map(addCard));

// Модальные окна

const buttonProfile = document.querySelector(".profile__edit-button");
const buttonNewCard = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupClose = document.querySelector(".popup__close");
const cardImage = document.querySelector(".card__image");

// Открытие модального окна
buttonProfile.addEventListener("click", function (evt) {
  popupProfile.classList.add("popup_is-opened");
});

buttonNewCard.addEventListener("click", function (evt) {
  popupNewCard.classList.add("popup_is-opened");
});

cardImage.addEventListener("click", function (evt) {
  const link = this.src;
  const name = this.alt;
  const content = popupImage.querySelector(".popup__image");
  const description = popupImage.querySelector(".popup__caption");

  popupImage.classList.add("popup_is-opened");
  content.src = link;
  content.alt = name;
  description.textContent = name;
});

// Закрытие модального окна
popupProfile.addEventListener("click", function (evt) {
  const content = this.querySelector(".popup__content");
  const click = evt.composedPath().includes(content);
  !click && popupProfile.classList.remove("popup_is-opened");
});

document.addEventListener("keydown", function (evt) {
  const isClosed = evt.key === "Escape";
  isClosed && popupProfile.classList.remove("popup_is-opened");
});

popupClose.addEventListener("click", function (evt) {
  popupProfile.classList.remove("popup_is-opened");
});
