import { deleteMyCard } from "./api.js";
import { userID, cardId } from "../index.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(item, { deleteCard, openCard, likeCard }) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const counterLike = cardElement.querySelector(".counter__like");

  cardElement.querySelector(".card__title").textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  counterLike.textContent = item.likes;

  if (userID !== item.userId) {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", (e) => deleteCard(e, item.cardId));
  likeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", openCard);

  return cardElement;
}

export function likeCard(e) {
  e.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
export function deleteCard(evt, id) {
  deleteMyCard(id);
  evt.target.closest(".places__item").remove();
}
