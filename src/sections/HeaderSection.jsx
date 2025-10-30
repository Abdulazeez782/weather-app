import { logo, iconUnits, iconDropdown } from "../assets/images/index"

const HeaderSection = () => {
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
            <button
                className="flex gap-1 bg-neutral-800 p-2 rounded-md cursor-pointer"
            >
                <img 
                    src={iconUnits}
                    alt="units-icon"
                />
                <span>Units</span>
                <img 
                    src={iconDropdown}
                    alt="dropdown-icon"
                />
            </button>
        </div>
    </section>
  )
}

export default HeaderSection