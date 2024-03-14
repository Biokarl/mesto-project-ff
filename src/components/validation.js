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
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, option) => {
  if (inputElement.validity.patternMismatch) {
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
  const inputList = Array.from(formElement.querySelectorAll(option.inputSelector));
  const buttonElement = formElement.querySelector(option.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, option);
      toggleButtonState(inputList, buttonElement, option);
    });
  });
};

const enableValidation = (option) => {
  const formList = Array.from(document.querySelectorAll(option.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, option);
  });
};

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function disableButton(isDisabled, buttonElement, option) {
  if (isDisabled) {
    buttonElement.disabled = true;
    buttonElement.classList.add(option.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(option.inactiveButtonClass);
  }
}

const toggleButtonState = (inputList, buttonElement, option) => {
  disableButton(hasInvalidInput(inputList), buttonElement, option);
};

function clearValidation(formElement, option) {
  const inputs = formElement.querySelectorAll(option.inputSelector);
  const button = formElement.querySelector(option.submitButtonSelector);

  inputs.forEach((input) => {
    hideInputError(formElement, input, option);
  });

  disableButton(true, button, option);
}

export { enableValidation, clearValidation, validationConfig };
