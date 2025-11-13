import { useQuery } from "@tanstack/react-query";
import { fetchLocationSuggestions } from "../services/locationService";
import { useState, useEffect } from "react";

export const useLocationSearch = (search) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce search (waits 500ms before calling API)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  return useQuery({
    queryKey: ["locationSuggestions", debouncedSearch],
    queryFn: () => fetchLocationSuggestions(debouncedSearch),
    enabled: debouncedSearch.trim().length > 1, // only trigger if 2+ chars
  });
};
