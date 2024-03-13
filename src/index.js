import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  handleCloseByClick,
  formEditProfile,
  popupProfile,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
} from "./components/modal.js";
import {
  getUserInfo,
  getInitialCards,
  patchUserInfo,
  postNewCard,
  changeAvatar,
} from "./components/api.js";
import { enableValidation, clearValidation, validationConfig } from "./components/validation.js";
import "./pages/index.css"; // добавьте импорт главного файла стилей

export let userID = null;
// @todo: DOM узлы

export const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup ");

const avatar = document.querySelector(".profile__image");

const buttonProfile = document.querySelector(".profile__edit-button");

const buttonProfileImage = document.querySelector(".profile__image-overlay");
const popupProfileImage = document.querySelector(".popup_type_avatar-update");

const buttonNewCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageDescription = popupImage.querySelector(".popup__caption");

// модалка добавления карточек
const formNewPlace = document.forms["new-place"];
const popupInputName = formNewPlace.querySelector(".popup__input_type_card-name");
const popupInputUrl = formNewPlace.querySelector(".popup__input_type_url");

// модалка смены профиля

const formAvatarUpdate = document.forms["avatar-update"];
const popupInputAvatar = formAvatarUpdate.querySelector(".popup__input_type_avatar-input");

// @todo: Функция создания карточки

export function addCard(element) {
  const item = {
    name: element.name,
    link: element.link,
    likes: element.likes,
    cardId: element._id,
    userId: element.owner._id,
  };

  const cardElement = createCard(item, { deleteCard, openCard, likeCard });

  return cardElement;
}

// Открытие модальных окон

buttonProfile.addEventListener("click", function () {
  clearValidation(formEditProfile, validationConfig);
  openProfilePopup(popupProfile);
});

buttonNewCard.addEventListener("click", function () {
  clearValidation(formNewPlace, validationConfig);
  openModal(popupNewCard);
});

buttonProfileImage.addEventListener("click", function () {
  clearValidation(formAvatarUpdate, validationConfig);
  openModal(popupProfileImage);
});

//Закрытие оверлей
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => handleCloseByClick(evt, popup));
});

// Смена аватара
function handleProfileForm(evt) {
  evt.preventDefault();

  avatar.style.backgroundImage = `url("${popupInputAvatar.value}")`;

  changeAvatar(popupInputAvatar.value);
  closeModal(popupProfileImage);
  formAvatarUpdate.reset();
}

formAvatarUpdate.addEventListener("submit", handleProfileForm);

// Добавление карточки пользователя
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: popupInputName.value, link: popupInputUrl.value };
  postNewCard(cardData)
    .then((res) => res.json())
    .then((res) => {
      cardsContainer.prepend(addCard(res));
    });

  formNewPlace.reset();

  closeModal(popupNewCard);
}

formNewPlace.addEventListener("submit", handleAddCardFormSubmit);

// Редактирование  профиля
function handleEditProfileFormSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  patchUserInfo({ name: nameInput.value, about: jobInput.value });
  closeModal(popupProfile);
}

formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);

// Функция открытия карточки
function openCard(element) {
  const link = element.target.src;
  const name = element.target.alt;

  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupImageDescription.textContent = name;

  openModal(popupImage);
}

function openProfilePopup(popup) {
  // Добавление имени со страницы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popup);
}

// validation ===============================================
enableValidation(validationConfig);

//  API =============================================

function initProject() {
  Promise.all([getInitialCards(), getUserInfo()]).then((res) => {
    const userInfo = res[1];
    userID = userInfo._id;

    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    profileDescription.textContent = userInfo.about;
    profileTitle.textContent = userInfo.name;
    avatar.style.backgroundImage = `url("${userInfo.avatar}")`;

    const cards = res[0];

    cardsContainer.append(...cards.map(addCard));
  });
}

initProject();
