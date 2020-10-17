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
  updateProfileAvatarButton,
  formProfileAvatarElement,
  popupCardOpenButton,
  formCardElement,
  selectorPlaceContainer,
  selectorProfileName,
  selectorProfileDescription,
  selectorProfileAvatar,
  selectorPopupProfile,
  selectorPopupProfileAvatar,
  selectorPopupImage,
  selectorPopupCard,
  selectorPopupConfirm,
  apiOptions
} from '../utils/constants.js';

const api = new Api(apiOptions);

/* Профиль */

// экземпляр класса с информацией о пользователе
const profileInfo = new UserInfo({
  selectorProfileName: selectorProfileName,
  selectorProfileDescription: selectorProfileDescription,
  selectorProfileAvatar: selectorProfileAvatar
});

// окно редактирования профиля
const popupEditProfile = new PopupWithForm(selectorPopupProfile, (data) => {
  popupEditProfile.loading(true);
  api.setUserInfo(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupEditProfile.loading(false, 'Сохранить');
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
  const userInfo = profileInfo.getUserInfo();
  profileInputName.value = userInfo.name;
  profileInputDescription.value = userInfo.description;
  // сбрасываем предупреждения об ошибках
  validateProfileForm.resetForm();
  popupEditProfile.open();
})

// окно редактирования аватара профиля
const popupEditAvatarProfile = new PopupWithForm(selectorPopupProfileAvatar, (data) => {
  popupEditAvatarProfile.loading(true)
  api.updateUserAvatar(data)
    .then ((res) => {
      profileInfo.setUserInfo(res);
      popupEditAvatarProfile.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupEditAvatarProfile.loading(false, 'Обновить')
    })
});

// навшеиваем слушатели
popupEditAvatarProfile.setEventListeners();

// установка валидатора на форму редактирования аватара
const validateProfileAvatarForm = new FormValidator(formConfig, formProfileAvatarElement);
validateProfileAvatarForm.enableValidation();

// кнопка на редактирования аватара пользователя
updateProfileAvatarButton.addEventListener('click', () => {
  validateProfileAvatarForm.resetForm();
  popupEditAvatarProfile.open();
})


/* Изображение */

// окно с полным отражением картинки
const popupImage = new PopupWithImage(selectorPopupImage);

// навешиваем слушатели
popupImage.setEventListeners();


/* Карточки */

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
    },
    // лайк на карточку
    handleCardLikeClick: () => {
      if (!card.isLiked()) {
        api.setLikeCard(item._id)
          .then((data) => {
            card.handleLike(data.likes.length);
          })
          .catch((err) => {
            console.error(err);
          })
      } else {
        api.removeLikeCard(item._id)
          .then((data) => {
            card.handleLike(data.likes.length);
          })
          .catch((err) => {
            console.error(err);
          })
      }
    }
  }, selectorTemplate, profileInfo.getUserInfo().id);
  return card.render();
}

// создаем экземпляр класса с контейнером для хранения списка карточек
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, selectorPlaceContainer);

// окно с формой добавления карточки
const popupAddCard = new PopupWithForm(selectorPopupCard, (data) => {
  popupAddCard.loading(true);
  api.createCard(data)
    .then((data) => {
      // создаем карточку и добавляем ее в контейнер
      cardList.addItem(createCard(data));
      popupAddCard.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupAddCard.loading(false, 'Сохранить');
    })
});

// окно с потдверждением удаления карточки
const popupConfirmDelete = new PopupWithConfirm(selectorPopupConfirm);

// навешиваем слушатели
popupAddCard.setEventListeners();
popupConfirmDelete.setEventListeners();

// установка валидатора на форму добавления карточки
const validateCardForm = new FormValidator(formConfig, formCardElement);
validateCardForm.enableValidation();

// кнопка добавления карточки
popupCardOpenButton.addEventListener('click', () => {
  validateCardForm.resetForm();
  popupAddCard.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((values) => {
  const [userInfo, cards] = values;
  profileInfo.setUserInfo(userInfo);
  cardList.renderItems(cards.reverse());
})
.catch((err) => {
  console.error(err);
})
