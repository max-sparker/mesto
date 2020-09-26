import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {
  initialCards,
  formConfig,
  keyClose,
  selectorTemplate,
  profileName,
  profileDescription,
  profileInputName,
  profileInputDescription,
  popupProfile,
  popupProfileOpenButton,
  popupProfileCloseButton,
  formProfileElement,
  popupImage,
  popupImageCloseButton,
  popupCard,
  popupCardOpenButton,
  popupCardCloseButton,
  formCardElement
} from '../utils/constants.js';
import {
  setImageDescription
} from "../utils/utils.js";

// открытие/закрытие модального окна
const toggleModalWindow = (modalWindow) => {
  if (modalWindow.classList.contains('popup_opened')) {
    modalWindow.classList.remove('popup_opened');
    modalWindow.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupEscape);
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

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, selectorTemplate, popupImage, toggleModalWindow, setImageDescription);
    const cardElement = card.render();
    cardList.addItem(cardElement);
  }
}, '.places');

cardList.renderItems();

// создание карточки
// const createCard = () => {
//   const cardElement = new Card(
//     cardTitle.value,
//     cardLink.value,
//     selectorTemplate,
//     popupImage,
//     toggleModalWindow,
//     setImageDescription
//   ).render();
//   placeContainer.prepend(cardElement);
// }

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



popupImageCloseButton.addEventListener('click', () => {
  toggleModalWindow(popupImage);
});

// добавление первоначальных данных объектами
// const addInitialCards = () => {
//   initialCards.forEach((card) => {
//     const cardElement = new Card (card.name, card.link, selectorTemplate, popupImage, toggleModalWindow, setImageDescription).render();
//     placeContainer.prepend(cardElement);
//   })
// }
//
// addInitialCards();

const validateProfileForm = new FormValidator(formConfig, formProfileElement);
validateProfileForm.enableValidation();
const validateCardForm = new FormValidator(formConfig, formCardElement);
validateCardForm.enableValidation();
