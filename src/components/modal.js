// Модальные окна

export function openModal() {
  const buttonProfile = document.querySelector(".profile__edit-button");
  const popupProfile = document.querySelector(".popup_type_edit");

  const buttonNewCard = document.querySelector(".profile__add-button");
  const popupNewCard = document.querySelector(".popup_type_new-card");

  const popupImage = document.querySelector(".popup_type_image");
  //   const cardImage = document.querySelector(".card__image");
  const cardImageAll = document.querySelectorAll(".card__image");

  // Открытие модальных окон

  buttonProfile.addEventListener("click", function () {
    popupProfile.classList.add("popup_is-opened");
  });

  buttonNewCard.addEventListener("click", function () {
    popupNewCard.classList.add("popup_is-opened");
  });

  cardImageAll.forEach((el) => {
    el.addEventListener("click", function () {
      const link = this.src;
      const name = this.alt;
      const content = popupImage.querySelector(".popup__image");
      const description = popupImage.querySelector(".popup__caption");

      popupImage.classList.add("popup_is-opened");
      content.src = link;
      content.alt = name;
      description.textContent = name;
    });
  });
}

export function closeModal() {
  const closeAll = document.querySelectorAll(".popup__close");
  const popupAll = document.querySelectorAll(".popup ");

  //Закрытие оверлей
  popupAll.forEach((popup) => {
    popup.addEventListener("click", function (evt) {
      const content = this.querySelector(".popup__content");
      const click = evt.composedPath().includes(content);

      if (!click) {
        this.classList.remove("popup_is-opened");
      }
    });
  });

  // Escape
  document.addEventListener("keydown", function (evt) {
    const isClosed = evt.key === "Escape";
    if (isClosed) {
      popupAll.forEach((popup) => {
        if (popup.classList.contains("popup_is-opened")) {
          popup.classList.remove("popup_is-opened");
        }
      });
    }
  });

  // Кнопка закрытия
  closeAll.forEach((e) => {
    e.addEventListener("click", function (evt) {
      popupAll.forEach((popup) => {
        if (popup.classList.contains("popup_is-opened")) {
          popup.classList.remove("popup_is-opened");
        }
      });
    });
  });
}

// Закрытие модального окна
// popupProfile.addEventListener("click", function (evt) {
//   const content = this.querySelector(".popup__content");
//   const click = evt.composedPath().includes(content);
//   !click && popupProfile.classList.remove("popup_is-opened");
// });

// document.addEventListener("keydown", function (evt) {
//   const isClosed = evt.key === "Escape";
//   isClosed && popupProfile.classList.remove("popup_is-opened");
// });

// popupClose.addEventListener("click", function (evt) {
//   popupProfile.classList.remove("popup_is-opened");
// });

// Удаление всех модальных окон
