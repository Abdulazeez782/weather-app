import { logo } from "../assets/images/index"
import ReusableDropdown from "../components/ReusableDropdown";
import { useWeatherContext } from "../context/WeatherContext"

const HeaderSection = () => {
    const { units, setUnits } = useWeatherContext();
    const unitOptions = [
        // Temperature group
        {label: "Temperature", isHeader: true},
        {label: "Celsius (°C)", value: "c", category: "temp"},
        {label: "Fahrenheit (°F)", value: "f", category: "temp"},

        // Wind speed group
        {label: "Wind Speed", isHeader: true},
        {label: "km/h", value: "kmh", category: "speed"}, 
        {label: "mph", value: "mph", category: "speed"}, 

        // Precipitation group
        {label: "Precipitation", isHeader: true},
        {label: "Millimeters (mm)", value: "mm", category: "precip"},
        {label: "Inches (in)", value: "in", category: "precip"}
    ]

    const handleUnitChange = (newValue, category) => {
        setUnits((prev) => ({
            ...prev, [category]:newValue
        }))
    }
        
  return (
    <section className="text-neutral-0 flex justify-between gap-2 items-center">
        <div className="cursor-pointer">
            <img 
                src={logo}
                alt="logo"
                width={137}
            />
        </div>

        <div>
            <ReusableDropdown 
                options={unitOptions}
                value={[units.temp, units.speed, units.precip]}
                onChange={handleUnitChange}
                triggerLabel={"Units"}
            />
        </div>
    </section>
  )
}

export default HeaderSection