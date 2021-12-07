import view from "./view";
import { WEEKDAYS } from "../config.js";

class CurrentView extends view {
  _parentElement = document.querySelector(".forecast-current");

  _getCurrentWeekDay(timestamp) {
    return WEEKDAYS[new Date(timestamp * 1000).getDay()];
  }

  _getCurrentTime(timestamp) {
    const hours = new Date(timestamp * 1000).getUTCHours();

    const minutes = new Date(timestamp * 1000).getUTCMinutes();

    return `${hours}:${
      minutes.toString().length < 10 ? "0" + minutes : minutes
    }`;
  }

  _generateMarkup() {
    return `
  <div class="forecast-current-left">
    <img src="https://openweathermap.org/img/wn/${
      this._data.weather.icon
    }@2x.png" alt="" />
    <div class="desc-curr">
      <h2>${this._data.weather.main}</h2>
      <h2>${this._data.main.temp}°C</h2>
    </div>
  </div>
  <div class="forecast-current-right">
    <h2>${this._data.name}</h2>
    <h3>${this._getCurrentWeekDay(this._data.dt)} ${this._getCurrentTime(
      this._data.dt
    )}       
    </h3>
    <h3>${this._data.weather.description}</h3>
  </div>
    `;
  }
}

export default new CurrentView();
