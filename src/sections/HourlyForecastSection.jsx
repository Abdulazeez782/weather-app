import { useState } from "react"
import { iconDropdown } from "../assets/images"
import { HourlyForecastCard } from "../components"
import { useWeatherContext } from "../context/WeatherContext"
import { useWeather } from "../hooks/useWeather"
import DayDropdown from "../components/DayDrpdown"
import { getWeatherIcon } from "../utils/weatherIcons"


const HourlyForecastSection = () => {
    const { selectedLocation } = useWeatherContext();
    const { data, isLoading, error } = useWeather(selectedLocation);
    const [ selectedDay, setSelectedDay ] = useState(0);
    
    const { hourly } = data;
    const getHoursForDisplay = () => {
        const now = new Date();
        const currentHour = now.getHours();

        let startIndex;

        if(selectedDay === 0) {
            startIndex = currentHour;
        } else {
            startIndex = selectedDay * 24
        }

        const times = hourly.time.slice(startIndex, startIndex + 9)
        const temps = hourly.temperature.slice(startIndex, startIndex + 9)
        const weathercode = hourly.weathercode.slice(startIndex, startIndex + 9)

        return times.map((time, index) => ({
            time,
            temperature: temps[index],
            weatherIcon: getWeatherIcon(weathercode[index])
        }))

        
    }
    
    const formatHour = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString("en-US", {
            hour: 'numeric',
            hour12: true
        })
    }

    const getDaysOptions = () => {
        const days = [];
        const today = new Date();

        for(let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            const dayName =  date.toLocaleDateString('en-US', { weekday: 'long' });
            
            days.push({ value: i, label: dayName });
        }

        return days;
    }
    
    const hoursToDisplay = getHoursForDisplay();
    const dayOptions = getDaysOptions();
    console.log("Hours", hoursToDisplay);
    console.log("Days", dayOptions);
    
  return (
    <section className='p-4 bg-neutral-700 w-full lg:w-[30%] rounded-md h-full'>
        <div className='flex justify-between gap-2 text-neutral-0 mb-3 rounded-md'>
            <h1>Hourly forecast</h1> 
            <DayDropdown 
                value={selectedDay}
                onChange={(val) => setSelectedDay(Number(val))}
                options={dayOptions}
            />
        </div>
        <div className='flex flex-col gap-3'>
            {
                hoursToDisplay.map((hour, index) => (
                <HourlyForecastCard 
                    key={index}
                    time={formatHour(hour.time)}
                    temp={Math.round(hour.temperature)}
                    weatherIcon={hour.weatherIcon}
                />  
                ))
            }    
        </div>                     
    </section>
  )
}

export default HourlyForecastSection