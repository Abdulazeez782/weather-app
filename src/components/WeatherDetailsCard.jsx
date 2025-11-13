import React from 'react'

const WeatherDetailsCard = ({value, label}) => {
  return (
    <div className='bg-neutral-800 p-2 flex flex-col gap-3 rounded-md text-white'>
        <p>{label}</p>
        <h1>{value}</h1>
    </div>
  )
}

export default WeatherDetailsCard