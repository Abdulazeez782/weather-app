import React, { createContext, useContext, useState } from 'react'

const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
    const [search, setSearch] = useState("");
    const [selectedLocation, setSelectedLocation] = useState({
        name: "Lagos",
        country: "Nigeria",
        latitude: 6.5244,
        longitude: 3.3792,
    });

    return (
        <WeatherContext.Provider
            value={{search, setSearch, selectedLocation, setSelectedLocation}}
        >
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeatherContext = () => useContext(WeatherContext);