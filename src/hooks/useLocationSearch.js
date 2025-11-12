import { useQuery } from "@tanstack/react-query";
import { fetchLocationSuggestions } from "../services/locationService";

export const useLocationSearch = async (search) => {
    return useQuery({
        queryKey: ["locationSuggestions", search],
        queryFn: () => fetchLocationSuggestions(search),
        enabled: !!search
    });
};