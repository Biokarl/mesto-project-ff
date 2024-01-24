// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
// @todo: Функция создания карточки
function addCard(cardText, cardImg) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardText;
  cardElement.querySelector(".card__image").src = cardImg;

  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);
  cardsContainer.append(cardElement);
}
// @todo: Функция удаления карточки
function deleteCard() {
  this.parentElement.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  addCard(item.name, item.link);
});
