import { API_KEY, API_FORECAST } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  city: {},
  list: [],
  forecast: {
    days: [],
    hourly: [],
    current: {},
  },
};
export const loadForecastByCoords = async function (lat, lng) {
  try {
    const data = await getJSON(
      `${API_FORECAST}lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
    );

    const { city } = data;

    state.city = city;
    state.forecast.days = [];
    state.list = data.list;

    for (let i = 0; i < data.list.length; i += 8) {
      state.forecast.days.push({
        main: data.list[i].main,
        dt: data.list[i].dt,
        dt_txt: data.list[i].dt_txt,
        weather: data.list[i].weather[0],
      });
    }
    loadHourResults(state.forecast.days[0].dt_txt.split(" ")[0]);
    createCurrentObj(state.forecast.days[0].dt_txt.split(" ")[0]);
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};

export const loadForecast = async function (place) {
  try {
    const data = await getJSON(
      `${API_FORECAST}q=${place}&units=metric&appid=${API_KEY}`
    );

    const { city } = data;

    state.city = city;
    state.forecast.days = [];
    state.list = data.list;

    for (let i = 0; i < data.list.length; i += 8) {
      state.forecast.days.push({
        main: data.list[i].main,
        dt: data.list[i].dt,
        dt_txt: data.list[i].dt_txt,
        weather: data.list[i].weather[0],
      });
    }

    loadHourResults(state.forecast.days[0].dt_txt.split(" ")[0]);
    createCurrentObj(state.forecast.days[0].dt_txt.split(" ")[0]);
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};

export const loadHourResults = function (date) {
  state.forecast.hourly = state.list.filter((weather) => {
    if (weather.dt_txt.split(" ")[0] === date) {
      return weather;
    }
  });
};

export const createCurrentObj = function (date) {
  state.forecast.current = state.forecast.days.filter((day) => {
    if (day.dt_txt.split(" ")[0] === date) {
      return day;
    }
  });
  state.forecast.current[0].name = state.city.name;
};
