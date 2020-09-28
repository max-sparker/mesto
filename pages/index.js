import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
  initialCards,
  formConfig,
  selectorTemplate,
  profileInputName,
  profileInputDescription,
  popupProfileOpenButton,
  formProfileElement,
  popupCardOpenButton,
  formCardElement
} from '../utils/constants.js';

const profileInfo = new UserInfo({
  selectorProfileName: '.profile__name',
  selectorProfileDescription: '.profile__description'
});

const popupEditProfile = new PopupWithForm('.popup-profile', (data) => {
  profileInfo.setUserInfo(data);
});

popupEditProfile.setEventListeners();

popupProfileOpenButton.addEventListener('click', () => {
  profileInputName.value = profileInfo.getUserInfo().name;
  profileInputDescription.value = profileInfo.getUserInfo().description;
  validateProfileForm.resetForm();
  popupEditProfile.open();
})

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

const popupAddCard = new PopupWithForm('.popup-card', (data) => {
  cardList.addItem(createCard({name: data.placename, link: data.placelink}));
});

popupAddCard.setEventListeners();

popupCardOpenButton.addEventListener('click', () => {
  validateCardForm.resetForm();
  popupAddCard.open();
});

const validateProfileForm = new FormValidator(formConfig, formProfileElement);
validateProfileForm.enableValidation();
const validateCardForm = new FormValidator(formConfig, formCardElement);
validateCardForm.enableValidation();
