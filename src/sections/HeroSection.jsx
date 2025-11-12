import { iconSearch } from '../assets/images'
import { useWeatherContext } from '../context/WeatherContext'
import { useLocationSearch } from '../hooks/useLocationSearch';

const HeroSection = () => {
    const {search, setSearch, setSelectedLocation} = useWeatherContext();
    const {data: suggestions = []} = useLocationSearch(search);

    console.log(search);
    console.log(suggestions);
    

  return (
    <section className='flex flex-col justify-center items-center gap-10'>
        <h1 className='text-neutral-0 text-5xl text-center text-dm-bricolage-bold '>How's the sky looking today</h1>

        <div className='flex flex-col lg:flex-row gap-3 w-full lg:w-[40%]'>
            <div className='flex gap-4 items-center bg-neutral-800 text-neutral-0 p-2 rounded-md w-full'>
                <img 
                    src={iconSearch}
                    width={15}
                />
               <input 
                    type='text'
                    placeholder='Search for a place...' 
                    className='focus:ring-0 focus:outline-0 w-full'  
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}                 
                />                                 
            </div>  
            <button
                className='w-full lg:w-[20%] bg-blue-500 rounded-md text-white p-2'
            >
                Search
            </button>          
        </div>
        {
            search && suggestions.length > 0 && (
                <ul>
                    {suggestions.map((loc) => (
                        <li
                         onClick={() => {
                            setSelectedLocation(loc)
                            setSearch(`${loc.name}`)
                         }}
                        >
                            {loc.name}
                        </li>
                    ))}
                </ul>
            )
        }
    </section>
  )
}

export default HeroSection