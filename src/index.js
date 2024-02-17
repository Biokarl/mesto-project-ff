import { initialCards } from "./scripts/cards.js";
// import addIconImage from "./images/add-icon.svg";
import avatarImage from "./images/avatar.jpg";
// import card_1Image from "./images/card_1.jpg";
// import card_2Image from "./images/card_2.jpg";
// import card_3Image from "./images/card_3.jpg";
// import closeImage from "./images/close.svg";
// import deleteIconImage from "./images/delete-icon.svg";
// import editIconImage from "./images/edit-icon.svg";
// import likeActiveImage from "./images/like-active.svg";
// import likeInactiveImage from "./images/like-inactive.svg";
// import logoImage from "./images/logo.svg";

import "./pages/index.css"; // добавьте импорт главного файла стилей

// const cardsImage = [
//   { name: "add icon", link: addIconImage },
//   { name: "avatar", link: avatarImage },
//   { name: "card 1", link: card_1Image },
//   { name: "card 2", link: card_2Image },
//   { name: "card 3", link: card_3Image },
//   { name: "close", link: closeImage },
//   { name: "delete icon", link: deleteIconImage },
//   { name: "edit icon", link: editIconImage },
//   { name: "like active", link: likeActiveImage },
//   { name: "like inactive", link: likeInactiveImage },
//   { name: "logo", link: logoImage },
// ];

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

const button = document.querySelector(".profile__edit-button");
const form = document.forms.editProfile; // получаем форму
const popupProfile = document.querySelector(".popup_type_edit");
console.log(popupProfile);
// const inputName = document.form.name;
// const inputDescription = document.form.description;

// вешаем на неё обработчик события submit
button.addEventListener("click", function (evt) {
  // popup_is - opened;
});
