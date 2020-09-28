import {keyClose} from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // открытия окна
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // закрытие окна
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // функция закрытия окна по клавише
  _handleEscClose(evt) {
    if (evt.key === keyClose) {
      this.close();
    }
  }

  // установка слушателей кликов
  setEventListeners() {
    this._popup.querySelector('.popup__close-btn').addEventListener('click', () => {
      this.close();
    });
    this._popup.querySelector('.popup__overlay').addEventListener('click', () => {
      this.close();
    })
  }

}
