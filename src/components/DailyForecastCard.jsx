import { iconDrizzle } from "../assets/images"

const DailyForecastCard = () => {
  return (
    <div className='flex flex-col justify-center gap-3 text-white bg-neutral-800 rounded-md p-2'>
        <h1>Tue</h1>
        <img 
            src={iconDrizzle}
            alt="iconDrizzle"
            width={70}
        />
        <div className='flex justify-between'>
            <p>20</p>
            <p>14</p>
        </div>
    </div>
  )
}

export default DailyForecastCard