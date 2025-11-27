
const HourlyForecastCard = ({time, temp, weatherIcon}) => {
  return (
    <div className="flex justify-between gap-2 p-2 bg-neutral-800 text-white rounded-md">        
        <div className="flex gap-2">
            <img 
                src={weatherIcon}
                alt="icon"
                width={40}
            />
            <p>{time}</p>
        </div>
        <p>{`${temp}°`}</p>
    </div>
  )
}

export default HourlyForecastCard