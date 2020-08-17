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

const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-btn');
const popupCloseButton = popup.querySelector('.popup__close-btn');
const popupOverlay = popup.querySelector('.popup__overlay');
const profileName = document.querySelector('.profile__name');
const profileDescr = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__edit-form');
const profileInputName = document.querySelector('.popup__edit-item_type_username');
const profileInputDescr = document.querySelector('.popup__edit-item_type_description');

const popupToggle = function () {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else {
    profileInputName.value = profileName.textContent;
    profileInputDescr.value = profileDescr.textContent;
    popup.classList.add('popup_opened');
  }
}

const saveProfile = function (event) {
  event.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescr.textContent = profileInputDescr.value;
  popupToggle();
}

const placeContainer = document.querySelector(".places");
const addCardToContainer = card => {
  const cardElement = document.querySelector("#cardTemplate").content.cloneNode(true);
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = 'Фото ' + card.name;
  cardElement.querySelector(".card__name").textContent = card.name;
  placeContainer.append(cardElement);
}

initialCards.forEach(addCardToContainer);

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', saveProfile);
popupOverlay.addEventListener('click', popupToggle);

