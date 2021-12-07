import view from "./view.js";
class SearchView extends view {
  _parentElement = document.querySelector(".search");
  _form = document.querySelector(".search-box");
  _input = document.querySelector(".search-input");

  _generateMarkup() {}

  addHandlerFormSubmit(handler) {
    const inputEl = this._input;
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();

      handler(inputEl.value);
    });
  }
}

export default new SearchView();
