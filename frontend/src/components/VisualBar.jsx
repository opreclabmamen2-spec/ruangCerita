import React, { useEffect, useState } from "react";

const VisualBar = ({ label, value, color }) => {
  const percentage = Number(value) || 0;

  const radius = 45;
  const stroke = 8;
  const normalizedRadius = radius - stroke;
  const circumference = 2 * Math.PI * normalizedRadius;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    let current = 0;

    const timer = setInterval(() => {
      current += percentage / 50;

      if (current >= percentage) {
        current = percentage;
        clearInterval(timer);
      }

      setProgress(current);
    }, 16);

    return () => clearInterval(timer);
  }, [percentage]);

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  console.log(label, percentage, strokeDashoffset);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="overflow-visible"
        >
          {/* Background */}
          <circle
            cx="50"
            cy="50"
            r="37"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />

          {/* Progress */}
          <circle
            cx="50"
            cy="50"
            r="37"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center font-bold">
          {progress.toFixed(0)}%
        </div>
      </div>

      <p className="mt-2 text-sm">{label}</p>
    </div>
  );
};

export default VisualBar;