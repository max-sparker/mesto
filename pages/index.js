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

// Редактирование профиля
const popupProfile = document.querySelector('.popup-profile');
const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-btn');
const popupProfileOverlay = popupProfile.querySelector('.popup__overlay');
const profileName = document.querySelector('.profile__name');
const profileDescr = document.querySelector('.profile__description');
const formProfileElement = popupProfile.querySelector('.popup__form');
const profileInputName = formProfileElement.querySelector('.popup__input_type_username');
const profileInputDescr = formProfileElement.querySelector('.popup__input_type_description');

// Контейнер для карточек
const placeContainer = document.querySelector('.places');

const popupProfileToggle = () => {
  if (popupProfile.classList.contains('popup_opened')) {
    popupProfile.classList.remove('popup_opened');
  } else {
    profileInputName.value = profileName.textContent;
    profileInputDescr.value = profileDescr.textContent;
    popupProfile.classList.add('popup_opened');
  }
}

const saveProfile = evt => {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescr.textContent = profileInputDescr.value;
  popupProfileToggle();
}

popupProfileOpenButton.addEventListener('click', popupProfileToggle);
popupProfileCloseButton.addEventListener('click', popupProfileToggle);
formProfileElement.addEventListener('submit', saveProfile);
popupProfileOverlay.addEventListener('click', popupProfileToggle);

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
  popupImageEl.src = evt.target.src;
  popupImageEl.alt = `Фото ${evt.target.alt}`;
  popupImageDesc.textContent = evt.target.alt;
  popupImageToggle();
}

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

const fillInitialCards = () => {
  initialCards.forEach((card) => {
    let cardElement = getCardElement (card.name, card.link);
    renderCard(cardElement);
  })
}

fillInitialCards();

const popupCard = document.querySelector('.popup-card');
const popupCardOpenButton = document.querySelector('.profile__add-btn');
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn');
const popupCardOverlay = popupCard.querySelector('.popup__overlay');
const formCardElement = popupCard.querySelector('.popup__form');

const popupCardToggle = () => {
  popupCard.classList.toggle('popup_opened');
}

popupCardOpenButton.addEventListener('click', popupCardToggle);
popupCardCloseButton.addEventListener('click', popupCardToggle);
popupCardOverlay.addEventListener('click', popupCardToggle);

const createCard = () => {
  const cardTitle = formCardElement.querySelector('.popup__input_type_placename').value;
  const cardLink = formCardElement.querySelector('.popup__input_type_placelink').value;
  renderCard(getCardElement(cardTitle, cardLink));
}

formCardElement.addEventListener('submit', evt => {
  evt.preventDefault();
  createCard();
  formCardElement.reset();
  popupCardToggle();
})

// Полный просмотр изображения
const popupImage = document.querySelector('.popup-image');
const popupImageEl = popupImage.querySelector('.popup-image__image');
const popupImageDesc = popupImage.querySelector('.popup-image__desc');
const popupImageCloseButton = popupImage.querySelector('.popup__close-btn');
const popupImageOverlay = popupImage.querySelector('.popup__overlay');

const popupImageToggle = () => {
  if (popupImage.classList.contains('popup_opened')) {
    popupImage.classList.remove('popup_opened');
    popupImageEl.src = '';
    popupImageEl.alt = '';
    popupImageDesc.textContent = '';
  } else {
    popupImage.classList.add('popup_opened');
  }
}

popupImageCloseButton.addEventListener('click', popupImageToggle);
popupImageOverlay.addEventListener('click', popupImageToggle);
