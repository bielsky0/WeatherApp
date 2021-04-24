import view from "./view";
import { WEEKDAYS } from "../config.js";

class CurrentView extends view {
  _parentElement = document.querySelector(".forecast-current");

  _generateMarkup() {
    return `
  <div class="forecast-current-left">
    <img src="http://openweathermap.org/img/wn/${
      this._data.weather.icon
    }@2x.png" alt="" />
    <div class="desc-curr">
      <h2>${this._data.weather.main}</h2>
      <h2>${this._data.main.temp}°</h2>
    </div>
  </div>
  <div class="forecast-current-right">
    <h2>${this._data.name}</h2>
    <h3>${WEEKDAYS[new Date(this._data.dt * 1000).getDay()]} ${
      new Date(this._data.dt * 1000).toLocaleString().slice(11, 15) +
      new Date(this._data.dt * 1000).toLocaleString().slice(18)
    }</h3>
    <h3>${this._data.weather.description}</h3>
  </div>
    `;
  }
}

export default new CurrentView();
