// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(item, { deleteCard, openCard, likeCard }) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", openCard);

  return cardElement;
}

export function likeCard(e) {
  e.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}
