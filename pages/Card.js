export class Card {
  constructor(name, link, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
  }


  _setEventListeners() {
    const cardImage = this._element.querySelector('.card__image');
    const cardLikeBtn = this._element.querySelector('.card__like-btn');
    const cardDeleteBtn = this._element.querySelector('.card__remove-btn');

    cardImage.addEventListener('click', () => {

    });

    cardLikeBtn.addEventListener('click', () => {

    });

    cardDeleteBtn.addEventListener('click', () => {

    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = `Фото ${this._name}`;

    const cardName = this._element.querySelector('.card__name');
    cardName.textContent = this._name;

    return this._element;
  }

}
