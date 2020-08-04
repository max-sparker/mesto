let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-btn');
let popupCloseButton = popup.querySelector('.popup__close-btn');
let popupOverlay = popup.querySelector('.popup__overlay');
let profileName = document.querySelector('.profile__name');
let profileDescr = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__edit-form');
let profileInputName = document.querySelector('.popup__edit-item_type_username');
let profileInputDescr = document.querySelector('.popup__edit-item_type_description');

let popupOpen = function () {
  popup.classList.add('popup_opened');
}

let popupClose = function () {
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

