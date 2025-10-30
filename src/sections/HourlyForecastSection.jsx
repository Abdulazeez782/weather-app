import { iconDropdown } from "../assets/images"
import { HourlyForecastCard } from "../components"

const HourlyForecastSection = () => {
    const hourlyForecast = [
        {time: "3pm"},
        {time: "3pm"},
        {time: "3pm"},
        {time: "3pm"},
        {time: "3pm"},
        {time: "3pm"},
        {time: "3pm"},
        {time: "3pm"},
    ]
  return (
    <section className='p-4 bg-neutral-700 w-full lg:w-[30%] rounded-md h-full'>
        <div className='flex justify-between gap-2 text-neutral-0 mb-3 rounded-md'>
            <h1>Hourly forecast</h1>  
            <button
            className='flex gap-2 items-centertext-neutral-0 bg-neutral-800 px-2 py-1'
            >
                Tuesday
            <img
                src={iconDropdown}
                alt='dropdown icon'
            />
            </button>
        </div>
        <div className='flex flex-col gap-3'>
            {
                hourlyForecast.map((data, index) => (
                <HourlyForecastCard 
                    key={index}
                />  
                ))
            }    
        </div>                     
    </section>
  )
}

export default HourlyForecastSection