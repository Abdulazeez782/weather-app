import { iconDropdown } from '../assets/images'
import {DailyForecastCard, HourlyForecastCard, WeatherDetails, WeatherDetailsCard} from '../components/index'
import HourlyForecastSection from './HourlyForecastSection'
import { useWeatherContext } from "../context/WeatherContext"
import { useWeather } from "../hooks/useWeather";


const WeatherDetailsSection = () => {
    const { selectedLocation } = useWeatherContext();
    const { data, isLoading, isError } = useWeather(selectedLocation);

     if (!selectedLocation) {
        return (
        <div className="flex justify-center items-center h-[50vh] text-white">
            <p>Select a location to see the weather 🌤️</p>
        </div>
        );
    }

    if (isLoading) {
        return (
        <div className="flex justify-center items-center h-[50vh] text-white">
            <p>Loading weather data...</p>
        </div>
        );
    }

    if (isError || !data) {
        return (
        <div className="flex justify-center items-center h-[50vh] text-white">
            <p>Failed to load weather data 😔</p>
        </div>
        );
    }

    const { current } = data;  

    const weatherDetails =  [
        {label: "Feels Like", value: `${Math.round(current.temperature)}°`},
        {label: "Humidity", value: `${current.humidity}%`},
        {label: "Wind", value: `${Math.round(current.wind)} km/h`},
        {label: "Precipitation", value: `${current.precipitation} mm`}
    ]    

    const dailyForecastCard = [
        {day: "mon"},
        {day: "tue"},
        {day: "wed"},
        {day: "thur"},
        {day: "fri"},
        {day: "sat"},
        {day: "sun"},
    ]
  return (
    <section className='w-full flex flex-col gap-5 lg:flex-row'>
        <section className='w-full lg:w-[70%]'>
            <section className='mb-4'>
                <WeatherDetails />  
            </section>
            
            <section className='grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10'>
                {
                    weatherDetails.map((data, index) => (
                        <WeatherDetailsCard 
                            key={index}
                            label={data.label}
                            value={data.value}
                        /> 
                    ))
                }            
            </section>   
            
            <section className='mb-10'>
                <h1 className='text-neutral-0 mb-4'>Daily Forecast</h1>
                <div className='grid grid-cols-3 lg:grid-cols-7 gap-3'>
                    {
                        dailyForecastCard.map((data, index) => (
                            <DailyForecastCard 
                                key={index}
                            /> 
                        ))
                    }  
                </div>           
            </section>
        </section>       

        <HourlyForecastSection />           
    </section>
  )
}

export default WeatherDetailsSection