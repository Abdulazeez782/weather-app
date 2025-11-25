import { iconDrizzle } from "../assets/images"

const HourlyForecastCard = ({time, temp}) => {
  return (
    <div className="flex justify-between gap-2 p-2 bg-neutral-800 text-white rounded-md">        
        <div className="flex gap-2">
            <img 
                src={iconDrizzle}
                alt="icon-drizzle"
                width={40}
            />
            <p>{time}</p>
        </div>
        <p>{`${temp}°`}</p>
    </div>
  )
}

export default HourlyForecastCard