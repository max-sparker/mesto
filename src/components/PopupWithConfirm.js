import Popup from './Popup';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setFormSubmitHandler(formSubmitHandler) {
    this._FormSubmitHandler = formSubmitHandler;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._FormSubmitHandler();
    })
    super.setEventListeners();
  }

}
