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

  createCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = `Фото ${this._name}`;

    const cardName = this._element.querySelector('.card__name');
    cardName.textContent = this._name;

    return this._element;
  }

}
