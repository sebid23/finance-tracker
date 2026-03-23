import { useState } from "react";
import { LucideIcon } from "lucide-react"

type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  className?: string;
  icon?: LucideIcon
};

export default function Dropdown({ value, onChange, options, className = "", icon: Icon }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <div
      tabIndex={0}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false);
        }
      }}
      className={`relative w-fit outline-none ${className}`}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full whitespace-nowrap items-center justify-between gap-1 rounded-lg border border-cyan-900 bg-cyan-900/40 hover:bg-cyan-900/20 py-1 px-2 text-[14px] cursor-pointer outline-none transition-colors"
      >
        {Icon && <Icon size={14}/>}
        <span>{selected?.label ?? "Select..."}</span>
        <svg
          className={`w-3 h-3 shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Menu */}
      {open && (
        <ul className="absolute z-10 mt-1 right-0 md:left-0 min-w-full w-max rounded-lg border border-cyan-900 bg-cyan-950 overflow-hidden shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`px-3 py-1.5 whitespace-nowrap text-[14px] cursor-pointer hover:bg-cyan-900/50 transition-colors ${
                option.value === value ? "font-medium text-white" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}