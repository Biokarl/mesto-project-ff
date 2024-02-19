// Модальные окна
const formElement = document.querySelector(".popup_type_edit");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// модалка добавления карточек
const popupInputName = document.querySelector(".popup__input_type_card-name");
const popupInputUrl = document.querySelector(".popup__input_type_url");

export function openModal(popup) {
  popup.classList.add("popup_is-opened");

  // Добавление имени со страницы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  //   Escape
  document.addEventListener("keydown", closeModalKey);
}

export function closeModal(evt, isClosed) {
  const openedPopup = document.querySelector(".popup_is-opened");
  const content = openedPopup.querySelector(".popup__content");
  const isCloseButton = evt.target.className === "popup__close";
  const isHasContent = evt.composedPath().includes(content);

  if (!isHasContent || isCloseButton || isClosed) {
    openedPopup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeModalKey);
  }
}

function closeModalKey(evt) {
  const isClosed = evt.key === "Escape";
  if (isClosed) {
    closeModal(evt, isClosed);
  }
}

// Редактирование  профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  // ПОД ВОПРОСОМ!!! повторение с функцией удаления модалки
  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.classList.remove("popup_is-opened");
}

formElement.addEventListener("submit", handleFormSubmit);
