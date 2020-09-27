export default class Card {

  constructor(data, selectorTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = selectorTemplate;
    this._handleCardClick = handleCardClick;
  }

  _likeClickHandler = () => {
    this._cardLikeButton.classList.toggle('card__like-btn_liked');
  }

  _deleteClickHandler = () => {
    this._view.remove();
    this._view = null;
  }

  _setEventListeners = () => {
    this._cardLikeButton.addEventListener('click', this._likeClickHandler);
    this._cardDeleteButton.addEventListener('click', this._deleteClickHandler);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link
      })
    });
  }

  _getTemplate = () => {
    this._view = this._template.cloneNode(true).children[0];
    this._cardLikeButton = this._view.querySelector('.card__like-btn');
    this._cardDeleteButton = this._view.querySelector('.card__remove-btn');
    this._cardImage = this._view.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фото ${this._name}`;
    this._cardName = this._view.querySelector('.card__name');
    this._cardName.textContent = this._name;
  }

  render = () => {
    this._getTemplate();
    this._setEventListeners();
    return this._view;
  }

}
