export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// селекторы
export const selectorTemplate = '#cardTemplate';
export const selectorPlaceContainer = '.places';
export const selectorProfileName = '.profile__name';
export const selectorProfileDescription = '.profile__description';
export const selectorPopupProfile = '.popup-profile';
export const selectorPopupImage = '.popup-image';
export const selectorPopupCard = '.popup-card';

// Профиль
export const popupProfile = document.querySelector('.popup-profile');
export const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
export const formProfileElement = popupProfile.querySelector('.popup__form');
export const profileInputName = formProfileElement.querySelector('.popup__input_type_username');
export const profileInputDescription = formProfileElement.querySelector('.popup__input_type_description');

// Карточки
export const popupCard = document.querySelector('.popup-card');
export const popupCardOpenButton = document.querySelector('.profile__add-btn');
export const formCardElement = popupCard.querySelector('.popup__form');

// код клавишы закрытия popup
export const keyClose = "Escape";
