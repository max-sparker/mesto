import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import {
  initialCards,
  formConfig,
  selectorTemplate,
  profileName,
  profileDescription,
  profileInputName,
  profileInputDescription,
  popupProfile,
  popupProfileOpenButton,
  popupProfileCloseButton,
  formProfileElement,
  popupCardOpenButton,
  formCardElement
} from '../utils/constants.js';

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

const popupImage = new PopupWithImage('.popup-image');
popupImage.setEventListeners();

const handleCardClick = (item) => {
  popupImage.open(item);
}

// создание карточки
const createCard = (item) => {
  const card = new Card(item, selectorTemplate, handleCardClick);
  return card.render();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.places');

cardList.renderItems();



const validateProfileForm = new FormValidator(formConfig, formProfileElement);
validateProfileForm.enableValidation();
const validateCardForm = new FormValidator(formConfig, formCardElement);
validateCardForm.enableValidation();
