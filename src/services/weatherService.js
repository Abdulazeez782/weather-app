import { fetchWeatherApi } from "openmeteo";

export const fetchWeatherData = async (lat, lon) => {
    const params = {
        "latitude": lat,
        "longitude": lon,
        "daily": ["temperature_2m_min", "temperature_2m_max", "rain_sum", "snowfall_sum", "precipitation_sum"],
        "hourly": ["temperature_2m", "relative_humidity_2m", "precipitation", "wind_speed_10m"],
        "current": ["temperature_2m", "precipitation", "showers", "snowfall", "wind_speed_10m", "relative_humidity_2m"],
        "timezone": "auto",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const data = responses[0];

    const hourly = {
        time: data.hourly().time(),
        temperature: data.hourly().variables(0).valuesArray(),
    };

    const daily = {
        time: data.daily().time(),
        tempMax: data.daily().variables(0).valuesArray(),
        tempMin: data.daily().variables(1).valuesArray()
    }

    return { current: data.current(), hourly, daily}
}

