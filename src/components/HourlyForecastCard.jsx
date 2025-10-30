import { iconDrizzle } from "../assets/images"

const HourlyForecastCard = () => {
  return (
    <div className="flex justify-between gap-2 p-2 bg-neutral-800 text-white rounded-md">        
        <div className="flex gap-2">
            <img 
                src={iconDrizzle}
                alt="icon-drizzle"
                width={40}
            />
            <p>3 PM</p>
        </div>
        <p>20</p>
    </div>
  )
}

export default HourlyForecastCard