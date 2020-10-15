export default class UserInfo {
  constructor({selectorProfileName, selectorProfileDescription, selectorProfileAvatar}) {
    this._name = document.querySelector(selectorProfileName);
    this._description = document.querySelector(selectorProfileDescription);
    this._avatar = document.querySelector(selectorProfileAvatar);
  }

  // получение данных о профиле
  getUserInfo(){
    this._profileInfo = {};
    this._profileInfo.name = this._name.textContent;
    this._profileInfo.description = this._description.textContent;
    this._profileInfo.avatar = this._avatar.src;
    this._profileInfo.id = this._userId;

    return this._profileInfo;
  }

  // сохранение данных профиля
  setUserInfo(data){
    this._name.textContent = data.name;
    this._description.textContent = data.about;
    this._avatar.src = data.avatar
    this._avatar.alt = `Аватар профиля ${data.name}`
    this._userId = data._id;
  }

}
