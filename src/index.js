import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, openCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import "./pages/index.css"; // добавьте импорт главного файла стилей

// @todo: DOM узлы

export const cardsContainer = document.querySelector(".places__list");
const popupAll = document.querySelectorAll(".popup ");

const buttonProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");

const buttonNewCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

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
  openModal(popupProfile);
});

buttonNewCard.addEventListener("click", function () {
  openModal(popupNewCard);
});

//Закрытие оверлей / анимирование попапов
popupAll.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", closeModal);
});
