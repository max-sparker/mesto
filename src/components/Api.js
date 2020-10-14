export default class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _onError(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка запроса к серверу: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
        headers: this._headers
    })
      .then(this._onError);
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.description
      })
    })
      .then(this._onError);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._onError);
  }

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.placename,
        link: data.placelink
      })
    })
      .then(this._onError);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._onError);
  }

  setLikeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._onError);
  }

  removeLikeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._onError);
  }
}
