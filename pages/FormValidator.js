export default class FormValidator {
  constructor(formConfig, formElement) {
    this._formElement = formElement;
    this._formSelector = formConfig.formSelector;
    this._inputSelector = formConfig.inputSelector;
    this._submitButtonSelector = formConfig.submitButtonSelector;
    this._inactiveButtonClass = formConfig.inactiveButtonClass;
    this._inputErrorClass = formConfig.inputErrorClass;
    this._errorClass = formConfig.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  // отображение ошибок
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-input-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // скрытие ошибок
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-input-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // проверка поля на валидность
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // есть ли поле, что не прошло вадидацию
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // состояние кнопки
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  // установка слушателя
  _setEventListeners = () => {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  // сброс элементов формы
  resetForm = () => {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
    });
  }

  // метод включения валидации формы
  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

}
