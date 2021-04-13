import { async } from "regenerator-runtime";
import { API_KEY, API_WEATHER, API_FORECAST } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  forecast: {},
  weather: {},
};

export const loadForecast = async function (city) {
  try {
    const data = await getJSON(`${API_FORECAST}q=${city}&appid=${API_KEY}`);

    state.forecast = data.list;

    console.log(state.forecast);
    console.log(state.forecast[0].dt);
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};

export const loadWeather = async function (city) {
  try {
    const data = await getJSON(`${API_WEATHER}q=${city}&appid=${API_KEY}`);

    state.weather = data;
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};
