export const fetchWeatherData = async (lat, lon) => {
  if (!lat || !lon) throw new Error("Invalid coordinates");

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,temperature_2m_max,rain_sum,snowfall_sum,precipitation_sum,weathercode&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&current_weather=true&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather");

  const json = await res.json();

  // Find the current hour index
  const nowISO = json.current_weather?.time;
  const currentHourIndex = json.hourly.time.findIndex(t => t === nowISO);

  // ---------------- CURRENT ----------------
  const current = {
    time: json.current_weather?.time ?? "",
    temperature: json.current_weather?.temperature ?? 0,
    wind: json.current_weather?.windspeed ?? 0,
    humidity: currentHourIndex >= 0 ? json.hourly.relative_humidity_2m[currentHourIndex] : null,
    precipitation: currentHourIndex >= 0 ? json.hourly.precipitation[currentHourIndex] : null,
    weathercode: json.current_weather?.weathercode ?? null,
  };

  // ---------------- DAILY ----------------
  const daily = {
    time: json.daily?.time ?? [],
    tempMin: json.daily?.temperature_2m_min ?? [],
    tempMax: json.daily?.temperature_2m_max ?? [],
    rain: json.daily?.rain_sum ?? [],
    snowfall: json.daily?.snowfall_sum ?? [],
    precipitation: json.daily?.precipitation_sum ?? [],
    weathercode: json.daily?.weathercode ?? [],
  };

  // ---------------- HOURLY ----------------
  const hourly = {
    time: json.hourly?.time ?? [],
    temperature: json.hourly?.temperature_2m ?? [],
    humidity: json.hourly?.relative_humidity_2m ?? [],
    precipitation: json.hourly?.precipitation ?? [],
    wind: json.hourly?.wind_speed_10m ?? [],
  };

  return { current, daily, hourly };
};
