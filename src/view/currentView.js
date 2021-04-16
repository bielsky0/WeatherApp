import view from "./view";

class CurrentView extends view {
  _parentElement = document.querySelector(".results--current");

  _generateMarkup() {
    return `
    <h2>${this._data.city.name}</h2>
    <span>${this._data.current.weather.main}</span>
    <h2>${this._data.current.main.temp}K</h2>
    `;
  }
}

export default new CurrentView();
