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
  popupToggle();
}

popupProfileOpenButton.addEventListener('click', popupProfileToggle);
popupProfileCloseButton.addEventListener('click', popupProfileToggle);
formProfileElement.addEventListener('submit', saveProfile);
popupProfileOverlay.addEventListener('click', popupProfileToggle);

// Добавление карточки
const placeContainer = document.querySelector(".places");
const addCardToContainer = card => {
  const cardElement = document.querySelector("#cardTemplate").content.cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = 'Фото ' + card.name;
  cardElement.querySelector('.card__name').textContent = card.name;
  cardElement.querySelector('.card__remove-btn').addEventListener('click', (evt) => {
    const card = evt.target.closest('.card');
    card.remove();
  })
  cardElement.querySelector('.card__like-btn').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-btn_liked');
  })
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    popupImageEl.src = card.link;
    popupImageEl.alt = 'Фото ' + card.name;
    popupImageDesc.textContent = card.name;
    popupImageToggle();
  })
  placeContainer.prepend(cardElement);
}
initialCards.forEach(addCardToContainer);

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
formCardElement.addEventListener('submit', evt => {
  evt.preventDefault();
  const cardTitle = formCardElement.querySelector('.popup__input_type_placename').value;
  const cardLink = formCardElement.querySelector('.popup__input_type_placelink').value;
  const card = {'name':cardTitle, 'link':cardLink};
  addCardToContainer(card);
  formCardElement.reset();
  popupCardToggle();
})

// Полный просмотр изображения
const popupImage = document.querySelector('.popup-image');
const popupImageEl = popupImage.querySelector('.popup-image__image');
const popupImageDesc = popupImage.querySelector('.popup-image__desc');
const popupImageCloseButton = popupImage.querySelector('.popup-image__close-btn');
const popupImageOverlay = popupImage.querySelector('.popup__overlay');

const popupImageToggle = () => {
  if (popupImage.classList.contains('popup_opened')) {
    popupImage.classList.remove('popup_opened');
    popupImageEl.src = "";
    popupImageEl.alt = "нет изображения";
    popupImageDesc.textContent = "";
  } else {
    popupImage.classList.add('popup_opened');
  }
}


popupImageCloseButton.addEventListener('click', popupImageToggle);
popupImageOverlay.addEventListener('click', popupImageToggle);
