import { DailyForecastCard, WeatherDetails, WeatherDetailsCard } from '../components';
import HourlyForecastSection from './HourlyForecastSection'
import { useWeatherContext } from "../context/WeatherContext";
import { useWeather } from "../hooks/useWeather"
import { getWeatherIcon } from '../utils/weatherIcons'

const WeatherDetailsSection = () => {
  const { selectedLocation } = useWeatherContext();
  const { data, isLoading, isError } = useWeather(selectedLocation);

  if (!selectedLocation) return <p>Select a location</p>;
  if (isLoading) return <p>Loading weather data...</p>;
  if (isError || !data) return <p>Failed to load weather data</p>;

  const { current, daily } = data;

  const weatherDetails = [
    { label: "Temperature", value: `${Math.round(current.temperature)}°C` },
    { label: "Humidity", value: `${current.humidity ?? 0}%` },
    { label: "Wind", value: `${Math.round(current.wind)} km/h` },
    { label: "Precipitation", value: `${current.precipitation ?? 0} mm` },
  ];

  const combinedDailyForecast = daily.time.map((dateString, i) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      maxTemp: Math.round(daily.tempMax[i] ?? 0),
      minTemp: Math.round(daily.tempMin[i] ?? 0),
      weatherIcon: getWeatherIcon(daily.weathercode[i])
    };
  });

  return (
    <section className="w-full flex flex-col gap-5 lg:flex-row">        
      <section className="w-full lg:w-[70%]">
        <section className='mb-4'> 
            <WeatherDetails /> 
        </section>
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {weatherDetails.map((weather, index) => (
            <WeatherDetailsCard key={index} label={weather.label} value={weather.value} />
          ))}
        </section>

        <section className="mb-10">
          <h1 className="text-neutral-0 mb-4">Daily Forecast</h1>
          <div className="grid grid-cols-3 lg:grid-cols-7 gap-3">
            {combinedDailyForecast.map((forecast, index) => (
              <DailyForecastCard 
                key={index} 
                day={forecast.day} 
                maxTemp={`${forecast.maxTemp}°`} 
                minTemp={`${forecast.minTemp}°`} 
                weatherIcon={forecast.weatherIcon}
            />
            ))}
          </div>
        </section>
      </section>

      <HourlyForecastSection />
    </section>
  );
};

export default WeatherDetailsSection;
