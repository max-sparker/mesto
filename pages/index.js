const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-btn');
const popupCloseButton = popup.querySelector('.popup__close-btn');
const popupOverlay = popup.querySelector('.popup__overlay');
const profileName = document.querySelector('.profile__name');
const profileDescr = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__edit-form');
const profileInputName = document.querySelector('.popup__edit-item_type_username');
const profileInputDescr = document.querySelector('.popup__edit-item_type_description');

const popupOpen = function () {
  popup.classList.add('popup_opened');
}

const popupClose = function () {
  popup.classList.remove('popup_opened');
}

function getProfile() {
  profileInputName.value = profileName.textContent;
  profileInputDescr.value = profileDescr.textContent;
}

function saveProfile (event) {
  event.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescr.textContent = profileInputDescr.value;
  popupClose();
}

function editProfile() {
  getProfile();
  popupOpen();
}

popupOpenButton.addEventListener('click', editProfile);
popupCloseButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', saveProfile);
popupOverlay.addEventListener('click', popupClose);

