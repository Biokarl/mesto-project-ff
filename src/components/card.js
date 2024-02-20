import { openModal } from "./modal.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(item, { deleteCard, openCard, likeCard }) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", likeCard);

  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);
  cardImage.addEventListener("click", openCard);
  cardImage.src = item.link;
  cardImage.alt = item.name;

  return cardElement;
}

export function likeCard(e) {
  e.target.classList.toggle("card__like-button_is-active");
}

// Функция открытия карточки
export function openCard() {
  const link = this.src;
  const name = this.alt;
  const popupImage = document.querySelector(".popup_type_image");
  const content = popupImage.querySelector(".popup__image");
  const description = popupImage.querySelector(".popup__caption");

  content.src = link;
  content.alt = name;
  description.textContent = name;
  openModal(popupImage);
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}
