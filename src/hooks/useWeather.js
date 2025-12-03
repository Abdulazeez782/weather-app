import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "../services/weatherService";

export const useWeather = (selectedLocation) => {
  const enabled = !!selectedLocation?.latitude && !!selectedLocation?.longitude;

  return useQuery({
    queryKey: ["weather", selectedLocation?.latitude, selectedLocation?.longitude],
    queryFn: () => fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude),
    enabled, // only fetch when location is valid
  }); 
};
