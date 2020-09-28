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

  setUserInfo({username, description}){
    this._name.textContent = username;
    this._description.textContent = description;
  }

}
