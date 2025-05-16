import React from "react";

interface GlassRangeProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export default function GlassRange({
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  className = "w-32",
}: GlassRangeProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <input
      type="range"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      className={`appearance-none h-2 rounded cursor-pointer ${className}`}
      style={{
        background: `linear-gradient(to right, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) ${percent}%, rgba(255,255,255,0.1) ${percent}%, rgba(255,255,255,0.1) 100%)`,
      }}
    />
  );
}
