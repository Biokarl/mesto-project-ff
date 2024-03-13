const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: ".popup__input-error_active",
};

// Функция, которая добавляет класс с ошибкой

const showInputError = (formElement, inputElement, errorMessage, option) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(option.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  errorElement.classList.add(option.errorClass);
};

// Функция, которая удаляет класс с ошибкой

const hideInputError = (formElement, inputElement, option) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(option.inputErrorClass);
  errorElement.classList.remove(option.errorClass);

  // Очистим ошибку
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, option) => {
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
    // HTML мы писали в kebab-case, это не опечатка)

    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, option);
  } else {
    hideInputError(formElement, inputElement, option);
  }
};

const setEventListeners = (formElement, option) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(option.inputSelector));

  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(option.submitButtonSelector);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, option);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, option);
    });
  });
};

const enableValidation = (option) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(option.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, option);
  });
};

// Вызовем функцию

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, option) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(option.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(option.inactiveButtonClass);
  }
};

// const validationConfig = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button-inactive",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__input-error_active",
// };

function clearValidation(formElement, option) {
  const inputs = formElement.querySelectorAll(option.inputSelector);
  const button = formElement.querySelector(option.submitButtonSelector);
  const errorsText = formElement.querySelectorAll(option.errorClass);

  errorsText.forEach((errorText) => {
    errorText.textContent = "";
  });

  inputs.forEach((input) => {
    input.classList.remove(option.inputErrorClass);
  });

  button.disabled = true;
  button.classList.add(option.inactiveButtonClass);
}

export { enableValidation, clearValidation, validationConfig };
