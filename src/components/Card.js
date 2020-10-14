export default class Card {

  constructor({data, handleCardClick, handleCardDeleteClick}, selectorTemplate, userId) {
    this._userId = userId;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._template = document.querySelector(selectorTemplate).content;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
  }

  removeCard = () => {
    this._view.remove();
    this._view = null;
  }

  _getLikeCount = () => {
    this._likesCount = this._likes.length;
    this._cardLikeCount.textContent = this._likesCount;
  }

  _getHasMyLike = () => {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  _likeClickHandler = () => {
    this._cardLikeButton.classList.toggle('card__like-btn_liked');
  }

  _setEventListeners = () => {
    this._cardLikeButton.addEventListener('click', this._likeClickHandler);
    this._cardDeleteButton.addEventListener('click', () => {
      this._handleCardDeleteClick({
        _id: this._id
      });
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link
      })
    });
  }

  _getTemplate = () => {
    this._view = this._template.querySelector('.card').cloneNode(true);
    this._cardLikeButton = this._view.querySelector('.card__like-btn');
    if (this._getHasMyLike()) {
      this._cardLikeButton.classList.add('card__like-btn_liked');
    }
    this._cardLikeCount = this._view.querySelector('.card__like-counter');
    this._cardDeleteButton = this._view.querySelector('.card__remove-btn');
    this._cardImage = this._view.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фото ${this._name}`;
    this._cardName = this._view.querySelector('.card__name');
    this._cardName.textContent = this._name;
  }

  render = () => {
    this._getTemplate();
    this._getLikeCount();
    this._setEventListeners();
    return this._view;
  }

}
