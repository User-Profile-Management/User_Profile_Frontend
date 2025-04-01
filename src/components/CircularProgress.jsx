import React from "react";

const CircularProgress = ({ percentage }) => {
  const radius = 50; // Circle radius
  const strokeWidth = 15; // Thickness
  const circumference = 2 * Math.PI * radius; // Full circumference
  const offset = circumference - (percentage / 100) * circumference; // Progress

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      {/* Background Circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#e0e0e0"
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      {/* Progress Circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#0069A8" // Blue color
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
      />
      {/* Percentage Text */}
      <text
        x="60"
        y="70"
        fontSize="32"
        fontWeight="bold"
        textAnchor="middle"
        fill="#000"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularProgress;
