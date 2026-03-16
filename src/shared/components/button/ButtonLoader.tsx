import React from "react";

const Spinner: React.FC<{
  size?: number;
  color?: string;
  className?: string;
}> = ({ size = 20, color = "#4B5563", className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`animate-spin ${className ?? ""}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill={color}
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

export default Spinner;
