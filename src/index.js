import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import "./pages/index.css"; // добавьте импорт главного файла стилей

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

// @todo: Вывести карточки на страницу

cardsContainer.append(...initialCards.map(addCard));
openModal();
closeModal();
