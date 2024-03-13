import { deleteMyCard, addLikeCard, removeLikeCard } from "./api.js";
import { userID } from "../index.js";

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
  counterLike.textContent = item.likes.length;

  if (item.likes.find((el) => el._id === userID)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (userID !== item.userId) {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", (e) => deleteCard(e, item.cardId));
  likeButton.addEventListener("click", (e) => likeCard(e, item.cardId));
  cardImage.addEventListener("click", openCard);

  return cardElement;
}

export function likeCard(e, id) {
  const wrap = e.target.closest(".wrap");
  const counterLike = wrap.querySelector(".counter__like");
  if (e.target.classList.contains("card__like-button_is-active")) {
    removeLikeCard(id)
      .then((res) => res.json())
      .then((res) => {
        counterLike.textContent = res.likes.length;
      });
  } else {
    addLikeCard(id)
      .then((res) => res.json())
      .then((res) => {
        counterLike.textContent = res.likes.length;
      });
  }

  e.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
export function deleteCard(e, id) {
  deleteMyCard(id);
  e.target.closest(".places__item").remove();
}
