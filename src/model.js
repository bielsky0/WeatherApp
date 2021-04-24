import { async } from "regenerator-runtime";
import { API_KEY, API_WEATHER, API_FORECAST } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  forecast: {
    city: {},
    days: [],
    current: {},
  },
  hourly: [],
  day: 1,
};
export const loadForecastByCoords = async function (lat, lng) {
  try {
    const data = await getJSON(
      `${API_FORECAST}lat=${lat}&lon=${lng}&appid=${API_KEY}`
    );

    const { city } = data;

    state.forecast.city = city;
    state.forecast.list = data.list;

    state.forecast.days = [];

    for (let i = 0; i < data.list.length; i += 8) {
      state.forecast.days.push({
        main: data.list[i].main,
        dt: data.list[i].dt,
        dt_txt: data.list[i].dt_txt,
        weather: data.list[i].weather[0],
      });
    }
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};

export const loadForecast = async function (place) {
  try {
    const data = await getJSON(`${API_FORECAST}q=${place}&appid=${API_KEY}`);

    const { city } = data;

    state.forecast.city = city;
    state.forecast.list = data.list;

    // console.log(data);
    state.forecast.days = [];

    for (let i = 0; i < data.list.length; i += 8) {
      state.forecast.days.push({
        main: data.list[i].main,
        dt: data.list[i].dt,
        dt_txt: data.list[i].dt_txt,
        weather: data.list[i].weather[0],
      });
    }
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};

export const loadCurrnetWeather = async function (place) {
  try {
    const data = await getJSON(`${API_WEATHER}q=${place}&appid=${API_KEY}`);

    state.forecast.current = createCurrentObject(data);
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};

export const loadCurrentWeatherByCoords = async function (lat, lng) {
  try {
    const data = await getJSON(
      `${API_WEATHER}lat=${lat}&lon=${lng}&appid=${API_KEY}`
    );

    state.forecast.current = createCurrentObject(data);
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};
export const loadHourResults = function (date) {
  state.hourly = state.forecast.list.filter((weather) => {
    if (weather.dt_txt.split(" ")[0] === date) {
      return weather;
    }
  });
};

export const getHourResult = function (day = state.day) {
  state.day = day;

  const start = (day - 1) * 8;
  const end = day * 8;
  return state.forecast.list.slice(start, end);
};

const createCurrentObject = function (data) {
  return {
    main: data.main,
    weather: data.weather[0],
    coords: data.coord,
    name: data.name,
    dt: data.dt,
  };
};
