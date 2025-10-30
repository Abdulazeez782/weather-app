import { iconDropdown } from '../assets/images'
import {DailyForecastCard, HourlyForecastCard, WeatherDetails, WeatherDetailsCard} from '../components/index'
import HourlyForecastSection from './HourlyForecastSection'

const WeatherDetailsSection = () => {
    const weatherDetails =  [
        {temp: 10},
        {humidity: "46%"},
        {wind: "14 km/h"},
        {precipitation: "0 mm"}
    ]    

    const dailyForecastCard = [
        {day: "mon"},
        {day: "tue"},
        {day: "wed"},
        {day: "thur"},
        {day: "fri"},
        {day: "sat"},
        {day: "sun"},
    ]
  return (
    <section className='w-full flex flex-col gap-5 lg:flex-row'>
        <section className='w-full lg:w-[70%]'>
            <section className='mb-4'>
                <WeatherDetails />  
            </section>
            
            <section className='grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10'>
                {
                    weatherDetails.map((data, index) => (
                        <WeatherDetailsCard 
                            key={index}
                        /> 
                    ))
                }            
            </section>   
            
            <section className='mb-10'>
                <h1 className='text-neutral-0 mb-4'>Daily Forecast</h1>
                <div className='grid grid-cols-3 lg:grid-cols-7 gap-3'>
                    {
                        dailyForecastCard.map((data, index) => (
                            <DailyForecastCard 
                                key={index}
                            /> 
                        ))
                    }  
                </div>           
            </section>
        </section>       

        <HourlyForecastSection />           
    </section>
  )
}

export default WeatherDetailsSection