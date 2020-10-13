export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // добавление элемента в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  // отрисовка всех элементов
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

}
