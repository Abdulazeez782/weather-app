import { fetchWeatherApi } from "openmeteo";

export const fetchWeatherData = async (lat, lon) => {
  const params = {
    latitude: lat,
    longitude: lon,
    daily: ["temperature_2m_min", "temperature_2m_max", "rain_sum", "snowfall_sum", "precipitation_sum"],
    hourly: ["temperature_2m", "relative_humidity_2m", "precipitation", "wind_speed_10m"],
    current: ["temperature_2m", "precipitation", "showers", "snowfall", "wind_speed_10m", "relative_humidity_2m"],
    timezone: "auto",
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const data = responses[0];

  //hourly conditions 
  const hourlyData = data.hourly();

  // Parse hourly
  const hourly = {
    time: hourlyData.time(),
    temperature: hourlyData.variables(0).valuesArray(),
    humidity: hourlyData.variables(1).valuesArray(),
    precipitation: hourlyData.variables(2).valuesArray(),
    wind: hourlyData.variables(3).valuesArray(),
  };

  //daily conditions
  const dailyData = data.daily();

  // Parse daily
  const daily = {
    time: dailyData.time(),
    tempMin: dailyData.variables(0).valuesArray(),
    tempMax: dailyData.variables(1).valuesArray(),
    rain: dailyData.variables(2).valuesArray(),
    snow: dailyData.variables(3).valuesArray(),
    precipitation: dailyData.variables(4).valuesArray(),
  };

  // Current conditions
  const currentData = data.current();

  //parse current
  const current = {
    time: currentData.time(),
    temperature: currentData.variables(0).value(),
    precipitation: currentData.variables(1).value(),
    showers: currentData.variables(2).value(),
    snowfall: currentData.variables(3).value(),
    wind: currentData.variables(4).value(),
    humidity: currentData.variables(5).value(),
  }

  return { current, hourly, daily };
};
