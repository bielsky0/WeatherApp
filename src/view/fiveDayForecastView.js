import view from "./view.js";

class fiveDayForecastView extends view {
  _parentElement = document.querySelector(".results--week--list");

  _generateMarkup() {
    return this._data
      .map((result) => {
        return `
     <li class="results--week-item">
        <div class="results--week">
            <h2>${result.dt_txt.split(" ")[0].slice(5, 10)}</h2>
            <span>${result.weather.main}</span>
            <h2>${result.main.temp}K</h2>
        </div>
     </li>
        `;
      })
      .join("");
  }
}

export default new fiveDayForecastView();
