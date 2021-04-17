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

  mapView.map.setView(latlng, 5, {
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
    await model.loadCurrnetWeather(city);
    await model.loadForecast(city);

    // Render data
    currentView.render(model.state.forecast.current);
    hourlyView.render(model.getHourResult(1));
    fiveDayForecastView.render(model.state.forecast.days);

    displayMarker(model.state.forecast.city.coord);
  } catch (err) {
    currentView.renderError(err.message);
    hourlyView.renderError(err.message);
    console.error(err);
  }
};

const controlMap = async function (latlng) {
  const { lat, lng } = latlng;

  currentView.renderSpinner();
  hourlyView.renderSpinner();
  fiveDayForecastView.renderSpinner();

  await model.loadForecastByCoords(lat, lng);
  await model.loadCurrentWeatherByCoords(lat, lng);

  currentView.render(model.state.forecast.current);
  hourlyView.render(model.getHourResult(1));
  fiveDayForecastView.render(model.state.forecast.days);

  displayMarker(latlng);
};

const init = function () {
  searchView.addHandlerFormSubmit(controlWeather);
  mapView.addHandlerClick(controlMap);
};

init();
