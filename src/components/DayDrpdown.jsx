import { useState, useRef, useEffect } from "react";
import { iconDropdown } from "../assets/images";

const DayDropdown = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

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
          gap-2
          bg-neutral-800
          text-neutral-0
          text-sm
          px-3 py-2
          rounded-md
          min-w-[140px]
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
        "
      >
        <span>{selectedOption?.label ?? "Select day"}</span>
        <img
          src={iconDropdown}
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
            min-w-[140px]
            max-h-60
            overflow-y-auto
          "
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="
                px-3 py-2
                text-sm
                cursor-pointer
                hover:bg-neutral-700
                transition
              "
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DayDropdown;
