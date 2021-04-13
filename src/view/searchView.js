import view from "./view.js";
class SearchView extends view {
  _parentElement = document.querySelector(".search");
  _form = document.querySelector(".form");
  _input = document.querySelector(".input");

  _generateMarkup() {}

  addHandlerFormSubmit(handler) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Select input element form xdd array
      const xdd = Array.from(e.target.childNodes).find((e) => {
        if (e.classList) {
          return e.classList.contains("input");
        }
      });
      console.log(xdd);

      handler("Bielawa");
    });
  }
}

export default new SearchView();
