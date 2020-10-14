export default class UserInfo {
  constructor({selectorProfileName, selectorProfileDescription}) {
    this._name = document.querySelector(selectorProfileName);
    this._description = document.querySelector(selectorProfileDescription);
  }

  // получение данных о профиле
  getUserInfo(){
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  getUserId(){
    return this._userId;
  }

  // сохранение данных профиля
  setUserInfo(data){
    this._name.textContent = data.username;
    this._description.textContent = data.description;
    this._userId = data.id;
  }

}
