import { iconSunny, bgTodaySmall, bgTodayBig } from "../assets/images"

const WeatherDetails = () => {
  return (
    <div
        className="relative w-full flex flex-col justify-center items-center gap-1 text-white h-[50vh]"
    >
        <div>

        </div>
        {/* mobile backgound image */}
        <div
            style={{backgroundImage: `url(${bgTodaySmall})`}}
            className="absolute inset-0 bg-no-repeat bg-cover bg-center sm:hidden"
        ></div>

        {/* desktop background image  */}
        <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center sm:block"
            style={{backgroundImage: `url(${bgTodayBig})`}}
        ></div>

        
        <div className="z-10">
            <h1 className="text-xl text-dm-bold font-bold">Berlin, Germany</h1>
            <p className="text-[10px]">Tuesday, Aug 5, 2025</p>
            <div className="flex justify-between gap-3 items-center">
                <img 
                    src={iconSunny}
                    alt="icon-sunny"
                    width={100}
                />
                <h1 className="text-8xl">68</h1>
            </div> 
        </div>
        
    </div>
  )
}

export default WeatherDetails