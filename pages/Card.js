export default class Card {

  static _template = document.querySelector('#cardTemplate').content;

  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _likeClickHandler = () => {
    this._cardLikeButton.classList.toggle('card__like-btn_liked');
  }

  _deleteClickHandler = () => {
    this._view.remove();
  }

  render = (container) => {
    this._view = Card._template.cloneNode(true).children[0];
    this._cardLikeButton = this._view.querySelector('.card__like-btn');
    this._cardLikeButton.addEventListener('click', this._likeClickHandler);
    this._cardDeleteButton = this._view.querySelector('.card__remove-btn');
    this._cardDeleteButton.addEventListener('click', this._deleteClickHandler);

    const cardImage = this._view.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = `Фото ${this._name}`;
    const cardName = this._view.querySelector('.card__name');
    cardName.textContent = this._name;


    container.prepend(this._view);
  }

  // _getTemplate() {
  //   const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
  //   return cardElement;
  // }

  // _handleLikeIcon = () => {
  //   cardLikeBtn.classListtoggle('card__like-btn_liked');
  // }

  // _setEventListeners() {
  //   const cardImage = this._element.querySelector('.card__image');
  //   const cardLikeBtn = this._element.querySelector('.card__like-btn');
  //   const cardDeleteBtn = this._element.querySelector('.card__remove-btn');
  //
  //   cardImage.addEventListener('click', () => {
  //
  //   });
  //
  //   cardLikeBtn.addEventListener('click', () => {
  //
  //   });
  //
  //   cardDeleteBtn.addEventListener('click', () => {
  //
  //   });
  // }

  // createCard() {
  //   this._element = this._getTemplate();
  //   this._setEventListeners();
  //
  //   const cardImage = this._element.querySelector('.card__image');
  //   cardImage.src = this._link;
  //   cardImage.alt = `Фото ${this._name}`;
  //
  //   const cardName = this._element.querySelector('.card__name');
  //   cardName.textContent = this._name;
  //
  //   return this._element;
  // }

}
