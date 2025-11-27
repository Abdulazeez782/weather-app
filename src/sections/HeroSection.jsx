import { useRef, useState } from 'react';
import { iconSearch } from '../assets/images'
import { useWeatherContext } from '../context/WeatherContext'
import { useLocationSearch } from '../hooks/useLocationSearch';

const HeroSection = () => {
    const {search, setSearch, selectedLocation, setSelectedLocation} = useWeatherContext();
    const {data: suggestions = []} = useLocationSearch(search);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const selectedRef = useRef(null);

    const handleSelectLocation = (loc) => {        
        setSearch(`${loc.name}`)      
        setShowSuggestions(false)
        selectedRef.current = loc;
    }

    const handleInputChange = (e) => {
        setSearch(e.target.value)
        setShowSuggestions(true);
        selectedRef.current = null;
    }

    const handleSearchClick = () => {
       if(!selectedRef.current) {
            alert("Please select a location before searching")
            return;
       } 
       
       //update global selected location
       setSelectedLocation({
            name: selectedRef.current.name,
            country: selectedRef.current.country,
            latitude: selectedRef.current.latitude,
            longitude: selectedRef.current.longitude
       })

       setSearch("");
    }

    console.log(search);
    console.log(suggestions);
    

  return (
    <section className='flex flex-col justify-center items-center gap-10'>
        <h1 className='text-neutral-0 text-5xl text-center text-dm-bricolage-bold '>How's the sky looking today</h1>

        <div className='flex flex-col lg:flex-row gap-3 w-full lg:w-[40%]'>
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
                    showSuggestions && search && suggestions.length > 0 && (
                    <ul className='absolute text-white bg-neutral-700 w-full top-full z-50 rounded-md shadow-2xl p-3 space-y-5 max-h-60 mt-2 cursor-pointer'>
                        {suggestions.map((loc, i) => (
                            <li
                                key={i}
                                onClick={() => handleSelectLocation(loc)}
                            >
                                {loc.name}
                            </li>
                        ))}
                    </ul>
                    )
                }
            </div>
            
            <button
                className='w-full lg:w-[20%] bg-blue-500 rounded-md text-white p-2 cursor-pointer'
                onClick={handleSearchClick}
            >
                Search
            </button>          
        </div>
        
    </section>
  )
}

export default HeroSection