import { DailyForecastCard, WeatherDetails, WeatherDetailsCard } from '../components';
import HourlyForecastSection from './HourlyForecastSection'
import { useWeatherContext } from "../context/WeatherContext";
import { useWeather } from "../hooks/useWeather"
import { getWeatherIcon } from '../utils/weatherIcons'

const WeatherDetailsSection = () => {
  const { selectedLocation, units } = useWeatherContext();
  const { data, isLoading, isError } = useWeather(selectedLocation);

  
  if (!selectedLocation) return <p className="text-white text-center">Select a location</p>;
  
  if (isError) return <p className="text-white text-center">Failed to load weather data</p>;

  
  let weatherDetails = [];
  let combinedDailyForecast = [];

  if (data && !isLoading) {
    const { current, daily } = data;
    const temperatureCelcius = Math.round(current.temperature);
    const temperatureFarenheit = Math.round((temperatureCelcius * 9/5) + 32);
    const windKmh = Math.round(current.wind);
    const windMph = Math.round(windKmh * 0.621371);
    const precipitationmm = current.precipitation ?? 0;
    const precipitationIn = Math.round(precipitationmm * 0.0393701);

    weatherDetails = [
      { label: "Temperature", value: `${units.temp === "c" ? temperatureCelcius : temperatureFarenheit} °`},
      { label: "Humidity", value: `${current.humidity ?? 0}%` },
      { label: "Wind", value: `${units.speed === "kmh" ? `${windKmh} km/h` : `${windMph} mph`}` },
      { label: "Precipitation", value: `${units.precip === "mm" ? `${precipitationmm} mm` : `${precipitationIn} in`}` },
    ];

    combinedDailyForecast = daily.time.map((dateString, i) => {
      const date = new Date(dateString);
      const maxTempCelcuis = Math.round(daily.tempMax[i] ?? 0);
      const maxTempFaren = Math.round((maxTempCelcuis * 9/5) + 32);

      const minTempCelcius = Math.round(daily.tempMin[i] ?? 0);
      const minTempFaren = Math.round((minTempCelcius * 9/5) + 32)
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        maxTemp: units.temp === "c" ? maxTempCelcuis : maxTempFaren,
        minTemp: units.temp === "c" ? minTempCelcius : minTempFaren,
        weatherIcon: getWeatherIcon(daily.weathercode[i])
      };
    });
  }

  return (
    <section className="w-full flex flex-col gap-5 lg:flex-row">        
      <section className="w-full lg:w-[70%]">
        
        <section className='mb-4'> 
            <WeatherDetails /> 
        </section>
        
        {isLoading ? (
            <div className="animate-pulse space-y-10">
                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                    {[1,2,3,4].map(i => <div key={i} className="h-24 bg-[#1e213a] rounded-md"></div>)}
                </div>
                {/* Daily Forecast Skeleton */}
                <div className="grid grid-cols-3 lg:grid-cols-7 gap-3">
                    {[1,2,3,4,5,6,7].map(i => <div key={i} className="h-32 bg-[#1e213a] rounded-md"></div>)}
                </div>
            </div>
        ) : (
            <>
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
            </>
        )}
      </section>

      <HourlyForecastSection />
    </section>
  );
};

export default WeatherDetailsSection;