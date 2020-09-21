export default class FormValidator {
  constructor(formConfig, formElement) {
    this._formElement = formElement;
    this._formSelector = formConfig.formSelector;
    this._inputSelector = formConfig.inputSelector;
    this._submitButtonSelector = formConfig.submitButtonSelector;
    this._inactiveButtonClass = formConfig.inactiveButtonClass;
    this._inputErrorClass = formConfig.inputErrorClass;
    this._errorClass = formConfig.errorClass;
  }

  // отображение ошибок
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-input-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // скрытие ошибок
  _hideInputError = (inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-input-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

}
