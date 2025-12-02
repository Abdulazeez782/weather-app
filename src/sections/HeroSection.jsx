import { useRef, useState } from 'react';
import { iconSearch } from '../assets/images'
import { useWeatherContext } from '../context/WeatherContext'
import { useLocationSearch } from '../hooks/useLocationSearch';
import { useWeather } from '../hooks/useWeather';

const HeroSection = () => {
    const {search, setSearch, selectedLocation, setSelectedLocation} = useWeatherContext();
    const {data: suggestions = [], isLoading: isSearchingLocation } = useLocationSearch(search);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { isLoading: isWeatherLoading } = useWeather(selectedLocation);
    const selectedRef = useRef(null);
    const [ error, setError ] = useState("");

    const handleSelectLocation = (loc) => {        
        setSearch(`${loc.name}`)      
        setShowSuggestions(false)
        selectedRef.current = loc;
        setError("")
    }

    const handleInputChange = (e) => {
        setSearch(e.target.value)
        setShowSuggestions(true);
        selectedRef.current = null;
        setError("")
    }

    const handleSearchClick = () => {
        let locationTarget = selectedRef.current;        
        
        // if users did not click an option and there are suggestions on the list automatically pick the first one
       if(!locationTarget && suggestions.length> 0) {
            locationTarget = suggestions[0];
       } 

       if(!locationTarget) {
            setError("Please select a valid location before searching")
            return;
       }
       
       //update global selected location
       setSelectedLocation({
            name: locationTarget.name,
            country: locationTarget.country,
            latitude: locationTarget.latitude,
            longitude: locationTarget.longitude
       })

       setSearch("");
       setError("");
    }

  return (
    <section className='flex flex-col justify-center items-center gap-10 relative'>
        <h1 className='text-neutral-0 text-5xl text-center text-dm-bricolage-bold '>How's the sky looking today</h1>

        <div className='flex flex-col lg:flex-row gap-3 w-full lg:w-[45%]'>
            <div className='relative w-full'>
                <div className='flex gap-4 items-center bg-neutral-800 text-neutral-0 p-2 rounded-md w-full'>
                    <img 
                        src={iconSearch}
                        width={15}
                    />
                    <input 
                        type='text'
                        placeholder='Search for a place...' 
                        className='focus:ring-0 focus:outline-0 w-full cursor-pointer'  
                        value={search}
                        onChange={handleInputChange}                 
                    />                                           
                </div>  
                {                    
                    showSuggestions && search && (suggestions.length > 0 || isSearchingLocation) && (
                    <ul className='absolute text-white bg-neutral-700 w-full top-full z-50 rounded-md shadow-2xl p-3 space-y-5 max-h-60 mt-2 cursor-pointer'>
                        {
                            isSearchingLocation ? (
                                <li className='flex gap-2 items-center'>
                                    <div className='w-3 h-3 border-3 border-white border-dotted rounded-full animate-spin'></div>
                                    
                                    <span className='text-[13px]'>Search in progress</span>
                                </li>
                            ) : (
                                suggestions.map((loc, i) => (
                                    <li
                                        key={i}
                                        onClick={() => handleSelectLocation(loc)}
                                    >
                                        {loc.name}
                                    </li>
                                ))
                            )
                        }
                    </ul>
                    )
                }
            </div>
            
            <button
                className='w-full lg:max-w-[25%] bg-blue-500 rounded-md text-white p-2 cursor-pointer disabled:cursor-not-allowed hover:bg-blue-800 disabled:opacity-45'
                onClick={handleSearchClick}
                disabled={isWeatherLoading}                
            >
                {isWeatherLoading ? "Searching..." : "Search"}
            </button> 
                      
        </div>
        {error && <p className='text-red-500 -mt-8 text-[12px]'>{error}</p>}  
    </section>
  )
}

export default HeroSection