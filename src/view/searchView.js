import view from "./view.js";
class SearchView extends view {
  _parentElement = document.querySelector(".search");
  _form = document.querySelector(".search-box");
  _input = document.querySelector(".search-input");

  _generateMarkup() {}

  addHandlerFormSubmit(handler) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();

      const inputEl = Array.from(e.target.childNodes).find((e) => {
        if (e.classList) {
          return e.classList.contains("search-input");
        }
      });

      handler(inputEl.value);
    });
  }
}

export default new SearchView();
