import React, { useEffect, useState } from "react";

const CircularProgress = ({ percentage }) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const radius = 50;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercent / 100) * circumference;

  useEffect(() => {
    let current = 0;
    const speed = 24; // lower = faster
    const increment = Math.ceil(percentage / 100); // speed control

    const interval = setInterval(() => {
      current += increment;
      if (current >= percentage) {
        current = percentage;
        clearInterval(interval);
      }
      setAnimatedPercent(current);
    }, speed);

    return () => clearInterval(interval);
  }, [percentage]);

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
        stroke="#0069A8"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dashoffset 0.2s ease-out" }}
      />
      {/* Animated Percentage Text */}
      <text
        x="60"
        y="70"
        fontSize="32"
        fontWeight="bold"
        textAnchor="middle"
        fill="#000"
      >
        {animatedPercent}%
      </text>
    </svg>
  );
};

export default CircularProgress;
