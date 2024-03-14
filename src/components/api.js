import { checkResponse } from "../utils/index.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "f4bc8400-a504-4eae-a503-81110307b198",
    "Content-Type": "application/json",
  },
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

function patchUserInfo(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then(checkResponse);
}

function postNewCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then(checkResponse);
}

function deleteMyCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

function addLikeCard(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

function removeLikeCard(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

function changeAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(checkResponse);
}

export {
  getUserInfo,
  getInitialCards,
  patchUserInfo,
  postNewCard,
  deleteMyCard,
  addLikeCard,
  removeLikeCard,
  changeAvatar,
};

// .catch((err) => {
//   console.log(err);
// });
