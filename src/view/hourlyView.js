import view from "./view.js";
class HourlyView extends view {
  _parentElement = document.querySelector(".forecast-hour");

  _generateMarkup() {
    return this._data
      .map((result) => {
        return `
    <li class="forecast-hour-item">
      <div class="forecast-hour-result">
        <h2>${result.dt_txt.slice(-8).slice(0, 5)}</h2>
      
        <img src="http://openweathermap.org/img/wn/${
          result.weather[0].icon
        }.png" alt="" />
        
        <h2>${result.main.temp}°C</h2>
      </div>
    </li>
        `;
      })
      .join("");
  }
}

export default new HourlyView();
