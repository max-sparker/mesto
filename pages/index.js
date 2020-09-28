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

/* Профиль */

// экземпляр класса с информацией о пользователе
const profileInfo = new UserInfo({
  selectorProfileName: '.profile__name',
  selectorProfileDescription: '.profile__description'
});

// окно редактирования профиля
const popupEditProfile = new PopupWithForm('.popup-profile', (data) => {
  profileInfo.setUserInfo(data);
});

// навешиваем слушатели
popupEditProfile.setEventListeners();

// установка валидатора на форму редактирования профиля
const validateProfileForm = new FormValidator(formConfig, formProfileElement);
validateProfileForm.enableValidation();

// кнопка редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
  // заполняем поля инфомацией о профиле из экземпляпа класса
  profileInputName.value = profileInfo.getUserInfo().name;
  profileInputDescription.value = profileInfo.getUserInfo().description;
  // сбрасываем предупреждения об ошибках
  validateProfileForm.resetForm();
  popupEditProfile.open();
})

/* Изображение */

// окно с полным отражением картинки
const popupImage = new PopupWithImage('.popup-image');

// навешиваем слушатели
popupImage.setEventListeners();

// обработка клика по карточке
const handleCardClick = (item) => {
  popupImage.open(item);
}

/* Карточки */

// функция создания карточки
const createCard = (item) => {
  // создаем экземплят класса с карточкой
  const card = new Card(item, selectorTemplate, handleCardClick);
  return card.render();
}

// создаем экземпляр класса с контейнером для хранения списка карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.places');

// добавляем первоначальные данные в контейнер
cardList.renderItems();

// окно с формой добавления карточки
const popupAddCard = new PopupWithForm('.popup-card', (data) => {
  // создаем карточку и добавляем ее в контейнер
  cardList.addItem(createCard({name: data.placename, link: data.placelink}));
});

// навешиваем слушатели
popupAddCard.setEventListeners();

// установка валидатора на форму добавления карточки
const validateCardForm = new FormValidator(formConfig, formCardElement);
validateCardForm.enableValidation();

// кнопка добавления карточки
popupCardOpenButton.addEventListener('click', () => {
  validateCardForm.resetForm();
  popupAddCard.open();
});


