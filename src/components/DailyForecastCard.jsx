const DailyForecastCard = ({maxTemp, minTemp, day, weatherIcon}) => {
  return (
    <div className='flex flex-col justify-center gap-3 text-white bg-neutral-800 rounded-md p-2'>
        <h1>{day}</h1>
        <img 
            src={weatherIcon}
            alt="weatherIcon"
            width={70}
        />
        <div className='flex justify-between'>
            <p>{maxTemp}</p>
            <p>{minTemp}</p>
        </div>
    </div>
  )
}

export default DailyForecastCard