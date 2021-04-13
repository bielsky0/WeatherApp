import { async } from "regenerator-runtime";
import * as model from "./model.js";
import mapView from "./view/mapView.js";
import searchView from "./view/searchView.js";

if (module.hot) {
  module.hot.accept();
}

const controlForecast = async function (city) {
  try {
    await model.loadForecast(city);
  } catch (err) {
    console.error(err);
  }
};

const controlWeather = async function (city) {
  try {
    await model.loadFoWeather(city);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  searchView.addHandlerFormSubmit(controlForecast);
};

init();
