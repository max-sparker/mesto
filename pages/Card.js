export default class Card {
  constructor(name, link, cardSelector) {
    this._cardSelector = cardSelector;
    this.name = name;
    this.link = link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('#cardTemplate')
      .cloneNode(true);

    return cardElement;
  }

}
