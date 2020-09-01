const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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


// открытие/закрытие модального окна
const toggleModalWindow = (modalWindow) => {
  const formPopupElement = modalWindow.querySelector('.popup__form');
  resetValid(formPopupElement);
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

// закрытие окна по клавише Escape
const closePopupEscape = evt => {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
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
  toggleModalWindow(popupProfile);
});

popupProfileCloseButton.addEventListener('click', () => {
  toggleModalWindow(popupProfile);
});

formProfileElement.addEventListener('submit', saveProfile);

// рендер карточки
const renderCard = card => {
  placeContainer.prepend(card);
}

// постановка лайка
const handleLikeIcon = (evt) => {
  evt.target.classList.toggle('card__like-btn_liked');
}

// удаление карточки
const handleDeleteCard = (evt) => {
  const card = evt.target.closest('.card');
  card.remove();
}

// демонстрация изображения
const handlePreviewPicture = (evt) => {
  popupImageElement.src = evt.target.src;
  popupImageElement.alt = `Фото ${evt.target.alt}`;
  popupImageDescription.textContent = evt.target.alt;
  toggleModalWindow(popupImage);
}

// генерация шаблона карточки
const getCardElement = (name, link) => {
  const cardElement = document.querySelector('#cardTemplate').content.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = `Фото ${name}`;

  cardImage.addEventListener('click', handlePreviewPicture);

  const cardName = cardElement.querySelector('.card__name');
  cardName.textContent = name;

  const deleteButton = cardElement.querySelector('.card__remove-btn');
  deleteButton.addEventListener('click', handleDeleteCard);

  const likeButton = cardElement.querySelector('.card__like-btn');
  likeButton.addEventListener('click', handleLikeIcon);

  return cardElement;
}

// создание карточки
const createCard = () => {
  const cardTitle = formCardElement.querySelector('.popup__input_type_placename').value;
  const cardLink = formCardElement.querySelector('.popup__input_type_placelink').value;
  renderCard(getCardElement(cardTitle, cardLink));
}

// добавление первоначальных данных
const addInitialCards = () => {
  initialCards.forEach((card) => {
    let cardElement = getCardElement (card.name, card.link);
    renderCard(cardElement);
  })
}

addInitialCards();

popupCardOpenButton.addEventListener('click', () => {
  toggleModalWindow(popupCard);
});
popupCardCloseButton.addEventListener('click', () => {
  toggleModalWindow(popupCard);
});

formCardElement.addEventListener('submit', evt => {
  evt.preventDefault();
  createCard();
  formCardElement.reset();
  toggleModalWindow(popupCard);
})

// очистка данных об изображении
const clearImageDescription = () => {
  popupImageElement.src = '';
  popupImageElement.alt = '';
  popupImageDescription.textContent = '';
}

popupImageCloseButton.addEventListener('click', () => {
  toggleModalWindow(popupImage);
  clearImageDescription();
});
