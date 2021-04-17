import view from "./view.js";
class HourlyView extends view {
  _parentElement = document.querySelector(".results--hour--list");

  _generateMarkup() {
    return this._data
      .map((result) => {
        return `
    <li class="result--hour-item">
      <div class="result--hour">
        <h2>${result.dt_txt.slice(-8).slice(0, 5)}</h2>
        <span>${result.weather[0].main}</span>
        <h2>${result.main.temp}K</h2>
      </div>
    </li>
          `;
      })
      .join("");
  }
}

export default new HourlyView();
