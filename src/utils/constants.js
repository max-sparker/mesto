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
export const selectorProfileAvatar = '.profile__avatar';
export const selectorPopupProfile = '.popup-profile';
export const selectorPopupProfileAvatar = '.popup-update-avatar';
export const selectorPopupImage = '.popup-image';
export const selectorPopupCard = '.popup-card';
export const selectorPopupConfirm = '.popup-confirm';

// Профиль
export const popupProfile = document.querySelector('.popup-profile');
export const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
export const formProfileElement = popupProfile.querySelector('.popup__form');
export const profileInputName = formProfileElement.querySelector('.popup__input_type_username');
export const profileInputDescription = formProfileElement.querySelector('.popup__input_type_description');
export const popupProfileAvatar = document.querySelector('.popup-update-avatar');
export const updateProfileAvatarButton = document.querySelector('.profile__avatar-edit-btn');
export const formProfileAvatarElement = popupProfileAvatar.querySelector('.popup__form');


// Карточки
export const popupCard = document.querySelector('.popup-card');
export const popupCardOpenButton = document.querySelector('.profile__add-btn');
export const formCardElement = popupCard.querySelector('.popup__form');

// код клавишы закрытия popup
export const keyClose = "Escape";
