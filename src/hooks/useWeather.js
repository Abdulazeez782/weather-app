import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "../services/weatherService";

export const useWeather = (location) => {
    return useQuery({
        queryKey: ["weatherData", location],
        queryFn: () => (fetchWeatherData(location.latitude, location,longitude)),
        enabled: !!location,
    });
};