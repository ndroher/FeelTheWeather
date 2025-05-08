import { useState, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  setOpen,
}: CustomSelectProps) {
  const [open, setLocalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setLocalOpen(false);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => {
          setLocalOpen(!open);
          setOpen(!open);
        }}
        className="w-full flex justify-between items-center cursor-pointer py-2 px-4 bg-white/10 hover:bg-white/20 rounded-l"
      >
        <span>{selected?.label || "Select..."}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="z-20 glass w-full rounded mt-1 shadow overflow-y-auto max-h-60">
          {options.map(({ label, value: val }) => (
            <div
              key={val}
              onClick={() => {
                onChange(val);
                setLocalOpen(false);
                setOpen(false);
              }}
              className="px-4 py-2 glass-hover rounded cursor-pointer"
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
