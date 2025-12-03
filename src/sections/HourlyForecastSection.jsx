import { useState } from "react"
import { HourlyForecastCard } from "../components"
import { useWeatherContext } from "../context/WeatherContext"
import { useWeather } from "../hooks/useWeather"
import { getWeatherIcon } from "../utils/weatherIcons"
import ReusableDropdown from "../components/ReusableDropdown"

const HourlyForecastSection = () => {
    const { selectedLocation, units } = useWeatherContext();
    const { data, isLoading, error } = useWeather(selectedLocation);
    const [selectedDay, setSelectedDay] = useState(0);

    // If we are loading or data is missing, return the Skeleton UI immediately.
    if (isLoading || !data) {
        return (
            <section className='p-4 bg-neutral-700 w-full lg:w-[30%] rounded-md h-full animate-pulse'>
                <div className='flex justify-between gap-2 text-neutral-0 mb-3 rounded-md'>
                    <div className="h-6 w-32 bg-neutral-600 rounded">-</div>
                    <div className="h-8 w-24 bg-neutral-600 rounded"></div>
                </div>
                <div className='flex flex-col gap-3'>
                    {/* Render 5 skeleton cards */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-16 w-full bg-neutral-600 rounded-md"></div>
                    ))}
                </div>
            </section>
        )
    }

    // Only runs if data exists
    const { hourly } = data;
    
    const getHoursForDisplay = () => {
        const now = new Date();
        const currentHour = now.getHours();

        let startIndex;

        if (selectedDay === 0) {
            startIndex = currentHour;
        } else {
            startIndex = selectedDay * 24
        }

        // Safety check to ensure we don't slice out of bounds
        const safeStartIndex = Math.min(startIndex, hourly.time.length - 1);
        
        const times = hourly.time.slice(safeStartIndex, safeStartIndex + 9)
        const temps = hourly.temperature.slice(safeStartIndex, safeStartIndex + 9)
        const weathercode = hourly.weathercode.slice(safeStartIndex, safeStartIndex + 9)

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

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

            days.push({ value: i, label: dayName });
        }

        return days;
    }

    const hoursToDisplay = getHoursForDisplay();
    const dayOptions = getDaysOptions();

    return (
        <section className='p-4 bg-neutral-700 w-full lg:w-[30%] rounded-md h-full'>
            <div className='flex justify-between gap-2 text-neutral-0 mb-3 rounded-md'>
                <h1>Hourly forecast</h1>
                <ReusableDropdown
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
                            temp={units.temp === "c" ? Math.round(hour.temperature) : Math.round((hour.temperature * 9 / 5) + 32)}
                            weatherIcon={hour.weatherIcon}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default HourlyForecastSection