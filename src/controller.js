import { async } from "regenerator-runtime";
import * as model from "./model.js";
import mapView from "./view/mapView.js";
import searchView from "./view/searchView.js";
import currentView from "./view/currentView.js";
import hourlyView from "./view/hourlyView.js";
import fiveDayForecastView from "./view/fiveDayForecastView.js";

if (module.hot) {
  module.hot.accept(function () {
    window.location.reload();
  });
}
const displayMarker = function (latlng) {
  if (mapView.marker) {
    mapView.map.removeLayer(mapView.marker);
  }

  mapView.marker = new L.Marker(latlng).addTo(mapView.map);

  mapView.map.setView(latlng, 10, {
    animate: true,
    pan: {
      duration: 1,
    },
  });
};

const controlWeather = async function (city) {
  try {
    // Render spinners
    currentView.renderSpinner();
    hourlyView.renderSpinner();
    fiveDayForecastView.renderSpinner();

    // Get data
    await model.loadForecast(city);

    // Render data
    currentView.render(model.state.forecast.current[0]);
    hourlyView.render(model.state.forecast.hourly);
    fiveDayForecastView.render(model.state.forecast.days);

    displayMarker(model.state.city.coord);
    console.log(city);
  } catch (err) {
    currentView.renderError(err.message);
    hourlyView.renderError(err.message);
    fiveDayForecastView.renderError(err.message);
  }
};

const controlMap = async function (latlng) {
  const { lat, lng } = latlng;

  currentView.renderSpinner();
  hourlyView.renderSpinner();
  fiveDayForecastView.renderSpinner();

  await model.loadForecastByCoords(lat, lng);

  currentView.render(model.state.forecast.current[0]);
  hourlyView.render(model.state.forecast.hourly);
  fiveDayForecastView.render(model.state.forecast.days);

  displayMarker(latlng);
};

const control3HourForecast = function (date) {
  model.createCurrentObj(date);
  currentView.render(model.state.forecast.current[0]);

  model.loadHourResults(date);

  hourlyView.render(model.state.forecast.hourly);
};

const init = function () {
  searchView.addHandlerFormSubmit(controlWeather);
  mapView.addHandlerClick(controlMap);
  fiveDayForecastView.addHandlerClick(control3HourForecast);
};

init();
