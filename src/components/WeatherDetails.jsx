import { bgTodaySmall, bgTodayBig } from "../assets/images"
import { useWeatherContext } from "../context/WeatherContext"
import { useWeather } from "../hooks/useWeather";
import { getWeatherIcon } from "../utils/weatherIcons";

const WeatherDetails = () => {
    const { selectedLocation, units } = useWeatherContext();
    const { data, isLoading, isPending, isError } = useWeather(selectedLocation);

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    if (!selectedLocation) {
        return (
            <div className="flex justify-center items-center h-[50vh] w-full text-white bg-[#1e213a] rounded-md">
                <p>Select a location to see the weather 🌤️</p>
            </div>
        );
    }

    if (isPending || isLoading) {
        return (
            <div className="relative w-full h-[50vh] flex flex-col justify-center items-center gap-4 text-white bg-[#1e213a] rounded-md">
                {/* Three Dots Animation */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                </div>
                <p className="text-gray-300 text-sm">Loading...</p>
            </div>
        );
    }    

    const { current } = data;
    const temperatureCelcius = Math.round(current.temperature);
    const temperatureFarenheit = Math.round((temperatureCelcius * 9/5) + 32);

    return (
        <div className="relative w-full h-[50vh] flex flex-col justify-center items-center gap-1 text-white overflow-hidden rounded-md">
            
            <div
                style={{ backgroundImage: `url(${bgTodaySmall})` }}
                className="absolute inset-0 bg-no-repeat bg-cover bg-center sm:hidden z-0"
            ></div>
            <div
                style={{ backgroundImage: `url(${bgTodayBig})` }}
                className="absolute inset-0 bg-no-repeat bg-cover bg-center hidden sm:block z-0"
            ></div>

            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-xl text-dm-bold font-bold drop-shadow-md">
                    {selectedLocation.name}, {selectedLocation.country}
                </h1>
                <p className="text-[10px] mb-4 drop-shadow-md">{today}</p>
                
                <div className="flex justify-between gap-4 items-center">
                    <img
                        src={getWeatherIcon(current.weathercode)}
                        alt="weather icon"
                        className="w-20 h-20 object-contain drop-shadow-lg"
                    />
                    <h1 className="text-6xl sm:text-8xl font-medium drop-shadow-lg">
                        { units.temp === "c" ? temperatureCelcius : temperatureFarenheit }°
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default WeatherDetails