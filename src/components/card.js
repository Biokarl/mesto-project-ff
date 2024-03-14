import { deleteMyCard, addLikeCard, removeLikeCard } from "./api.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

function createCard(item, { deleteCard, openCard, likeCard }) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const counterLike = cardElement.querySelector(".counter__like");
  const localStorageData = localStorage.getItem("userId") || "";
  const userId = JSON.parse(localStorageData);

  cardElement.querySelector(".card__title").textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  counterLike.textContent = item.likes.length;

  if (item.likes.find((el) => el._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (userId !== item.userId) {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", (e) => deleteCard(e, item.cardId));
  likeButton.addEventListener("click", (e) => likeCard(e, item.cardId));
  cardImage.addEventListener("click", openCard);

  return cardElement;
}

function likeCard(e, id) {
  const wrap = e.target.closest(".wrap");
  const counterLike = wrap.querySelector(".counter__like");
  if (e.target.classList.contains("card__like-button_is-active")) {
    removeLikeCard(id)
      .then((res) => {
        counterLike.textContent = res.likes.length;
        e.target.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLikeCard(id)
      .then((res) => {
        counterLike.textContent = res.likes.length;
        e.target.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// @todo: Функция удаления карточки
function deleteCard(e, id) {
  deleteMyCard(id)
    .then(() => {
      e.target.closest(".places__item").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard, likeCard, deleteCard };
