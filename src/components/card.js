// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(item, { deleteCard }) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);
  cardImage.src = item.link;
  cardImage.alt = item.name;

  return cardElement;
}

// @todo: Функция удаления карточки

export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}
