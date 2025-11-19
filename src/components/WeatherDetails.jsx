import { iconSunny, bgTodaySmall, bgTodayBig } from "../assets/images"
import { useWeatherContext } from "../context/WeatherContext"
import { useWeather } from "../hooks/useWeather";
import { getWeatherIcon } from "../utils/weatherIcons";

const WeatherDetails = () => {
    const { selectedLocation } = useWeatherContext();
    const { data, isLoading, isError } = useWeather(selectedLocation);

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    });

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

    console.log(selectedLocation);
    const { current } = data;
    
  return (
    <div
        className="relative w-full flex flex-col justify-center items-center gap-1 text-white h-[50vh]"
    >
        <div>

        </div>
        {/* mobile backgound image */}
        <div
            style={{backgroundImage: `url(${bgTodaySmall})`}}
            className="absolute inset-0 bg-no-repeat bg-cover bg-center sm:hidden"
        ></div>

        {/* desktop background image  */}
        <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center sm:block"
            style={{backgroundImage: `url(${bgTodayBig})`}}
        ></div>

        
        <div className="z-10">
            <h1 className="text-xl text-dm-bold font-bold">{selectedLocation.name}, {selectedLocation.country}</h1>
            <p className="text-[10px]">{today}</p>
            <div className="flex justify-between gap-3 items-center">
                <img 
                    src={getWeatherIcon(current.weathercode)}
                    alt="icon-sunny"
                    width={100}
                />
                <h1 className="text-8xl">{Math.round(current.temperature)}°</h1>
            </div> 
        </div>
        
    </div>
  )
}

export default WeatherDetails