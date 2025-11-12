import React, { createContext, useContext, useState } from 'react'

const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
    const [search, setSearch] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <WeatherContext.Provider
            value={{search, setSearch, selectedLocation, setSelectedLocation}}
        >
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeatherContext = () => useContext(WeatherContext);