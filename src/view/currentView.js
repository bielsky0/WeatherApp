import view from "./view";

class CurrentView extends view {
  _parentElement = document.querySelector(".results--current");

  _generateMarkup() {
    return `
    <h2>${this._data.name}</h2>
    <span>${this._data.weather.main}</span>
    <h2>${this._data.main.temp}K</h2>
    `;
  }
}

export default new CurrentView();
