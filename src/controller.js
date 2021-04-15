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
    await model.loadWeather(city);
    await model.loadForecast(city);

    currentView.render(model.state.weather);
    hourlyView.render(model.state.hourly);

    console.log(model.state.hourly);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  searchView.addHandlerFormSubmit(controlWeather);
};

init();
