import Card from './Card.js';
import FormValidator from './FormValidator.js';

import {initialCards, formConfig} from './constants.js';

// Профиль
const popupProfile = document.querySelector('.popup-profile');
const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formProfileElement = popupProfile.querySelector('.popup__form');
const profileInputName = formProfileElement.querySelector('.popup__input_type_username');
const profileInputDescription = formProfileElement.querySelector('.popup__input_type_description');

// Карточки
const popupCard = document.querySelector('.popup-card');
const popupCardOpenButton = document.querySelector('.profile__add-btn');
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn');
const formCardElement = popupCard.querySelector('.popup__form');

// Изображение
const popupImage = document.querySelector('.popup-image');
const popupImageElement = popupImage.querySelector('.popup-image__image');
const popupImageDescription = popupImage.querySelector('.popup-image__desc');
const popupImageCloseButton = popupImage.querySelector('.popup__close-btn');

// контейнер для карточек
const placeContainer = document.querySelector('.places');

// код клавишы закрытия popup
const keyClose = "Escape";

// открытие/закрытие модального окна
const toggleModalWindow = (modalWindow) => {
  if (modalWindow.classList.contains('popup_opened')) {
    modalWindow.classList.remove('popup_opened');
    modalWindow.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupEscape);
    if (modalWindow.classList.contains('popup-image')) {
      clearImageDescription();
    }
  } else {
    modalWindow.classList.add('popup_opened');
    modalWindow.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', closePopupEscape);
  }
}

// закрытие окна кликом на оверлей
const closePopupOverlay = evt => {
  const popup = document.querySelector('.popup_opened');
  if(evt.target.classList.contains('popup__overlay')) {
    toggleModalWindow(popup);
  }
}

// закрытие окна по клавише
const closePopupEscape = evt => {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === keyClose) {
    toggleModalWindow(popup);
  }
}

// сохранение данных о профиле
const saveProfile = evt => {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  toggleModalWindow(popupProfile);
}

popupProfileOpenButton.addEventListener('click', () => {
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  validateProfileForm.resetForm();
  toggleModalWindow(popupProfile);
});

popupProfileCloseButton.addEventListener('click', () => {
  toggleModalWindow(popupProfile);
});

formProfileElement.addEventListener('submit', saveProfile);

// создание карточки
const createCard = () => {
  const cardTitle = formCardElement.querySelector('.popup__input_type_placename').value;
  const cardLink = formCardElement.querySelector('.popup__input_type_placelink').value;
  const cardElement = new Card(cardTitle, cardLink, popupImage, toggleModalWindow, setImageDescription);
  cardElement.render(placeContainer);
}


popupCardOpenButton.addEventListener('click', () => {
  formCardElement.reset();
  validateCardForm.resetForm();
  toggleModalWindow(popupCard);
});
popupCardCloseButton.addEventListener('click', () => {
  toggleModalWindow(popupCard);
});

formCardElement.addEventListener('submit', evt => {
  evt.preventDefault();
  createCard();
  toggleModalWindow(popupCard);
})

// добавление данных об изображении
const setImageDescription = (image) => {
   popupImageElement.src = image.src;
   popupImageElement.alt = `Фото ${image.alt}`;
   popupImageDescription.textContent = image.alt;
}

// очистка данных об изображении
const clearImageDescription = () => {
  popupImageElement.src = '';
  popupImageElement.alt = '';
  popupImageDescription.textContent = '';
}

popupImageCloseButton.addEventListener('click', () => {
  toggleModalWindow(popupImage);
});

// добавление первоначальных данных объектами
const addInitialCards = () => {
  initialCards.forEach((card) => {
    const cardElement = new Card (card.name, card.link, popupImage, toggleModalWindow, setImageDescription);
    cardElement.render(placeContainer);
  })
}

addInitialCards();

const validateProfileForm = new FormValidator(formConfig, formProfileElement);
validateProfileForm.enableValidation();
const validateCardForm = new FormValidator(formConfig, formCardElement);
validateCardForm.enableValidation();

