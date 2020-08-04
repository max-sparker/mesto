let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-btn');
let popupCloseButton = popup.querySelector('.popup__close-btn');
let popupOverlay = popup.querySelector('.popup__overlay');
let profileName = document.querySelector('.profile__name');
let profileDescr = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__edit-form');
let profileInputName = document.querySelector('.popup__edit-item_type_username');
let profileInputDescr = document.querySelector('.popup__edit-item_type_description');

let popupToggle = function () {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else {
    profileInputName.value = profileName.textContent;
    profileInputDescr.value = profileDescr.textContent;
    popup.classList.add('popup_opened');
  }
}

let saveProfile = function (event) {
  event.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescr.textContent = profileInputDescr.value;
  popupToggle();
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', saveProfile);
popupOverlay.addEventListener('click', popupToggle);

