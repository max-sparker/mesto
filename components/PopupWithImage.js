import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = popupSelector.querySelector('.popup-image__image');
    this._description = popupSelector.querySelector('.popup-image__desc');
  }

  open(item) {
    this._image.src = item.link;
    this._image.alt = `Фото ${item.link}`;
    this._description.textContent = item.name;
    super.open();
  }

}
