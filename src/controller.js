import { async } from "regenerator-runtime";
import * as model from "./model.js";
import mapView from "./view/mapView.js";
import searchView from "./view/searchView.js";
import currentView from "./view/currentView.js";
import hourlyView from "./view/hourlyView.js";

if (module.hot) {
  module.hot.accept();
}

const controlWeather = async function (city) {
  try {
    currentView.renderSpinner();
    hourlyView.renderSpinner();

    await model.loadForecast(city);

    currentView.render(model.state.forecast);
    hourlyView.render(model.state.hourly);

    // console.log(model.state.forecast);
  } catch (err) {
    currentView.renderError(err.message);
    hourlyView.renderError(err.message);
    console.error(err);
  }
};

const init = function () {
  searchView.addHandlerFormSubmit(controlWeather);
};

init();
