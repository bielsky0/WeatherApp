import { async } from "regenerator-runtime";
import { API_KEY, API_WEATHER, API_FORECAST } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  forecast: {},
  weather: {},
};

const createWeatherObject = function (data) {
  const weather = data;
  return {
    name: weather.name,
    main: weather.main,
    dt: weather.dt,
    weather: weather.weather[0],
  };
};

export const loadForecast = async function (city) {
  try {
    const data = await getJSON(`${API_FORECAST}q=${city}&appid=${API_KEY}`);

    state.forecast = data.list;
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};

export const loadWeather = async function (city) {
  try {
    const data = await getJSON(`${API_WEATHER}q=${city}&appid=${API_KEY}`);

    state.weather = createWeatherObject(data);
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};
