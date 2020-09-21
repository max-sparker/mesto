export default class Card {

  constructor(name, link, selectorTemplate, popupImage, toggleModalWindow, setImageDescription) {
    this._name = name;
    this._link = link;
    this._template = selectorTemplate;
    this._popupImage = popupImage;
    this._toggleModalWindow = toggleModalWindow;
    this._setImageDescription = setImageDescription;
  }

  _fullImageClickHandler = () => {
    this._toggleModalWindow(this._popupImage);
    this._setImageDescription(this._cardImage);
  }

  _likeClickHandler = () => {
    this._cardLikeButton.classList.toggle('card__like-btn_liked');
  }

  _deleteClickHandler = () => {
    this._view.remove();
  }

  _setEventListeners = () => {
    this._cardLikeButton.addEventListener('click', this._likeClickHandler);
    this._cardDeleteButton.addEventListener('click', this._deleteClickHandler);
    this._cardImage.addEventListener('click', this._fullImageClickHandler);
  }

  render = (container) => {
    this._view = this._template.cloneNode(true).children[0];
    this._cardLikeButton = this._view.querySelector('.card__like-btn');
    this._cardDeleteButton = this._view.querySelector('.card__remove-btn');
    this._cardImage = this._view.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фото ${this._name}`;
    this._cardName = this._view.querySelector('.card__name');
    this._cardName.textContent = this._name;
    this._setEventListeners();
    container.prepend(this._view);
  }

}
