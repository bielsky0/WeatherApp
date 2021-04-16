import { async } from "regenerator-runtime";
import { API_KEY, API_FORECAST } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  forecast: {
    city: {},
    days: [],
    current: {},
  },
  hourly: {},
};

export const loadForecast = async function (place) {
  try {
    const data = await getJSON(`${API_FORECAST}q=${place}&appid=${API_KEY}`);

    const { city } = data;

    state.forecast.city = city;

    state.forecast.days = createDayObject(data);
    state.forecast.current = createCurrentObject(data);

    console.log(state.forecast.days);

    state.hourly = data.list.slice(0, 8);
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};

const createCurrentObject = function (data) {
  const { list } = data;

  return {
    main: list[0].main,
    weather: list[0].weather[0],
  };
};

const createDayObject = function (data) {
  const { list } = data;
  return list.reduce((acc, curr) => {
    let date = curr.dt_txt.split(" ")[0];
    // console.log(date);

    if (!acc[date]) acc[date] = [];

    acc[date].push({
      main: curr.weather[0].main,
      desc: curr.weather[0].description,
      icon: curr.weather[0].icon,
      temp: curr.main,
      dateTime: new Date(curr.dt_txt),
    });
    return acc;
  }, []);
};
