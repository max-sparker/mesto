export default class UserInfo {
  constructor({selectorProfileName, selectorProfileDescription}) {
    this._name = document.querySelector(selectorProfileName);
    this._description = document.querySelector(selectorProfileDescription);
  }

  getUserInfo(){
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  setUserInfo(name, description){
    this._name.textContent = name;
    this._description.textContent = description;
  }

}
