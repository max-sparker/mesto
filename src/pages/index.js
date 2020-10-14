import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
  formConfig,
  selectorTemplate,
  profileInputName,
  profileInputDescription,
  popupProfileOpenButton,
  formProfileElement,
  popupCardOpenButton,
  formCardElement,
  selectorPlaceContainer,
  selectorProfileName,
  selectorProfileDescription,
  selectorPopupProfile,
  selectorPopupImage,
  selectorPopupCard,
  selectorPopupConfirm
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    'Content-Type': 'application/json',
    'authorization': 'c211647d-a4c4-4f78-99de-8c8f862db42e'
  }
});


/* Профиль */

// получение информации о пользоваеле с сервера
api.getUserInfo()
  .then((data) => {
    profileInfo.setUserInfo({
      username: data.name,
      description: data.about,
      id: data._id
    });
  })
  .catch((err) => {
    console.error(err);
  });


// экземпляр класса с информацией о пользователе
const profileInfo = new UserInfo({
  selectorProfileName: selectorProfileName,
  selectorProfileDescription: selectorProfileDescription
});

// окно редактирования профиля
const popupEditProfile = new PopupWithForm(selectorPopupProfile, (data) => {
  api.setUserInfo(data)
    .then((res) => {
      profileInfo.setUserInfo({
        username: res.name,
        description: res.about
      });
      popupEditProfile.close();
    })
    .catch((err) => {
      console.error(err);
    })
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
const popupImage = new PopupWithImage(selectorPopupImage);

// навешиваем слушатели
popupImage.setEventListeners();

// обработка клика по карточке
// const handleCardClick = (item) => {
//   popupImage.open(item);
// }



/* Карточки */
api.getInitialCards()
  .then((data) => {
    cardList.renderItems(data)
  })
  .catch((err) => {
    console.error(err);
  });

// функция создания карточки
const createCard = (item) => {
  // создаем экземплят класса с карточкой
  const card = new Card({
    data: item,
    // отображение полной картинки
    handleCardClick: () => {
      popupImage.open(item)
    },
    // удаление карточки
    handleCardDeleteClick: () => {
      popupConfirmDelete.setFormSubmitHandler(() => {
        api.deleteCard(item._id)
          .then(() => {
            card.removeCard();
            popupConfirmDelete.close();
          })
          .catch((err) => {
            console.error(err);
          });
      })
      popupConfirmDelete.open();
    }
  }, selectorTemplate);
  return card.render();
}

const popupConfirmDelete = new PopupWithConfirm(selectorPopupConfirm);
popupConfirmDelete.setEventListeners();

// создаем экземпляр класса с контейнером для хранения списка карточек
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, selectorPlaceContainer);

// окно с формой добавления карточки
const popupAddCard = new PopupWithForm(selectorPopupCard, (data) => {
  api.createCard(data)
    .then((data) => {
      // создаем карточку и добавляем ее в контейнер
      cardList.addItem(createCard(data));
      popupAddCard.close();
    })
    .catch((err) => {
      console.error(err);
    })
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
