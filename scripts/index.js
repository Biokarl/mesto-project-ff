// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
// @todo: Функция создания карточки

function addCard(cardText, cardImg, index) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardText;
  cardElement.querySelector(".card__image").src = cardImg;

  cardElement.querySelector(".card__delete-button").addEventListener("click", function (evt) {
    const cards = document.querySelectorAll(".card");
    cards[index].remove();
    console.log(cards);
  });

  cardsContainer.append(cardElement);
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach(function (el, index) {
    addCard(el.name, el.link, index);
  });
}
renderCards();
