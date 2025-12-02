import { useState, useRef, useEffect } from "react";
import { iconDropdown, iconUnits } from "../assets/images";

const ReusableDropdown = ({ 
    value, 
    onChange, 
    options, 
    triggerLabel,
    icon          
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // If no triggerLabel is provided, try to find the label from the selected value (Logic for DayDropdown)
  const selectedLabel = options.find(opt => opt.value === value)?.label;
  const displayLabel = triggerLabel || selectedLabel || "Select";

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="
          flex items-center justify-between
          gap-1
          bg-neutral-800
          text-neutral-0
          text-sm
          px-3 py-2
          rounded-md
          min-w-[110px]
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          cursor-pointer
        "
      >
        {triggerLabel && <img src={iconUnits} alt="icon-units"/>}
        <span>{displayLabel}</span>
        <img
          src={icon || iconDropdown}
          alt="dropdown icon"
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          className="
            absolute right-0 mt-1
            bg-neutral-800
            text-neutral-0
            rounded-md
            shadow-lg
            overflow-hidden
            z-20
            min-w-40
            max-h-80
            overflow-y-auto
            border border-neutral-700
          "
        >
          {options.map((opt, index) => {
            // RENDER HEADER (Temperature, Wind, etc.)
            if (opt.isHeader) {
               return (
                 <li 
                   key={index} 
                   className="px-3 py-1.5 text-xs font-bold text-neutral-400 uppercase tracking-wider bg-neutral-900/50 cursor-default"
                 >
                   {opt.label}
                 </li>
               )
            }

            // RENDER OPTION
            // We verify if this specific option is currently selected
            const isSelected = value === opt.value || (Array.isArray(value) && value.includes(opt.value));
            
            return (
                <li
                key={opt.value}
                onClick={() => {
                    onChange(opt.value, opt.category); 
                    setOpen(false);
                }}
                className={`
                    px-3 py-2
                    text-sm
                    cursor-pointer
                    transition
                    flex justify-between items-center
                    ${isSelected ? "text-blue-400 bg-neutral-700/50" : "hover:bg-neutral-700 text-neutral-200"}
                `}
                >
                {opt.label}
                {/* Add a checkmark if selected */}
                {isSelected && <span>✓</span>}
                </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ReusableDropdown;