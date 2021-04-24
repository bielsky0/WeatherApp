import view from "./view.js";
import { WEEKDAYS } from "../config.js";

class fiveDayForecastView extends view {
  _parentElement = document.querySelector(".forecast-week");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const el = e.target.closest(".forecast-week-item");

      if (!el) return;

      Array.from(el.parentElement.children).forEach((e) =>
        e.classList.remove("active")
      );

      el.classList.add("active");
      console.log(new Date(el.dataset.date).getDay());

      handler(el.dataset.date);
    });
  }

  _generateMarkup() {
    return this._data
      .map((result) => {
        return `
      <li class="forecast-week-item" data-date="${result.dt_txt.split(" ")[0]}">
        <div class="forecast-week-result">
          <img src="http://openweathermap.org/img/wn/${
            result.weather.icon
          }.png" alt="" />
          <div class="desc-week">
            <h2>${WEEKDAYS[new Date(result.dt * 1000).getDay()]}</h2>
            <span>${result.weather.main}</span>
            <h2>${result.main.temp}°</h2>
          </div>
        </div>
      </li>
        `;
      })
      .join("");
  }
}

export default new fiveDayForecastView();
