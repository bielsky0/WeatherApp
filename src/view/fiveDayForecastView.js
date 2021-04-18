import view from "./view.js";

class fiveDayForecastView extends view {
  _parentElement = document.querySelector(".results--week--list");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const el = e.target.closest(".results--week-item");

      if (!el) return;

      Array.from(el.parentElement.children).forEach((e) =>
        e.classList.remove("card")
      );

      el.classList.add("card");

      handler(el.dataset.date);
    });
  }

  _generateMarkup() {
    return this._data
      .map((result) => {
        return `
     <li class="results--week-item" data-date="${result.dt_txt.split(" ")[0]}">
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
