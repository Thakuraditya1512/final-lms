import React from 'react';

function CircularProgressBar({ progress }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <svg width="100" height="100">
      <circle
        className="progress-ring__circle"
        strokeWidth="10"
        fill="transparent"
        r={radius}
        cx="50"
        cy="50"
      />
      <circle
        className="progress-ring__circle-progress"
        strokeWidth="10"
        fill="transparent"
        r={radius}
        cx="50"
        cy="50"
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset: progressOffset,
        }}
      />
    </svg>
  );
}

export default CircularProgressBar;
