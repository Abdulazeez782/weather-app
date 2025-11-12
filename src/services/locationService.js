import axios from "axios";

const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";

export const fetchLocationSuggestions = async (query) => {
    if(!query || query.trim().length < 2 ) return [];
    const res = await axios.get(GEO_API, { params: {name: query, count: 5}});
    return res.data.results || [];
}