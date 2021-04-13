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
      const xdd = e.target.childNodes;

      console.log(xdd);
      console.log(xdd);
      console.log(xdd);
      console.log(xdd);
      handler("Bielawa");
    });
  }
}

export default new SearchView();
