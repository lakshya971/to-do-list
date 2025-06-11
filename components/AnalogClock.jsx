'use client';

import { useState, useEffect } from 'react';

export default function AnalogClock() {
  const [time, setTime] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setTime(new Date());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted || !time) {
    return (
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full animate-pulse"></div>
      </div>
    );
  }

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate angles for clock hands
  const hourAngle = (hours * 30) + (minutes * 0.5); // 30 degrees per hour + minute adjustment
  const minuteAngle = minutes * 6; // 6 degrees per minute
  const secondAngle = seconds * 6; // 6 degrees per second

  const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Current Time</h3>
        <p className="text-xs text-gray-600">
          {time.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })}
        </p>
      </div>

      {/* Analog Clock */}
      <div className="relative w-32 h-32 mx-auto">
        <svg
          className="w-32 h-32"
          viewBox="0 0 200 200"
        >
          {/* Clock face */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          
          {/* Hour markers */}
          {hourNumbers.map((num, index) => {
            const angle = (index * 30) - 90; // Start from 12 o'clock
            const radian = (angle * Math.PI) / 180;
            const x = 100 + 80 * Math.cos(radian);
            const y = 100 + 80 * Math.sin(radian);
            
            return (
              <g key={num}>
                {/* Major hour marks */}
                <line
                  x1={100 + 85 * Math.cos(radian)}
                  y1={100 + 85 * Math.sin(radian)}
                  x2={100 + 95 * Math.cos(radian)}
                  y2={100 + 95 * Math.sin(radian)}
                  stroke="#374151"
                  strokeWidth="2"
                />
                {/* Hour numbers */}
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700"
                >
                  {num}
                </text>
              </g>
            );
          })}

          {/* Minute markers */}
          {Array.from({ length: 60 }, (_, i) => {
            if (i % 5 !== 0) { // Skip hour markers
              const angle = (i * 6) - 90;
              const radian = (angle * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={100 + 90 * Math.cos(radian)}
                  y1={100 + 90 * Math.sin(radian)}
                  x2={100 + 95 * Math.cos(radian)}
                  y2={100 + 95 * Math.sin(radian)}
                  stroke="#9ca3af"
                  strokeWidth="1"
                />
              );
            }
            return null;
          })}

          {/* Hour hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 50 * Math.cos((hourAngle - 90) * Math.PI / 180)}
            y2={100 + 50 * Math.sin((hourAngle - 90) * Math.PI / 180)}
            stroke="#374151"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Minute hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 70 * Math.cos((minuteAngle - 90) * Math.PI / 180)}
            y2={100 + 70 * Math.sin((minuteAngle - 90) * Math.PI / 180)}
            stroke="#6b7280"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Second hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 80 * Math.cos((secondAngle - 90) * Math.PI / 180)}
            y2={100 + 80 * Math.sin((secondAngle - 90) * Math.PI / 180)}
            stroke="#ef4444"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Center dot */}
          <circle
            cx="100"
            cy="100"
            r="4"
            fill="#374151"
          />
        </svg>
      </div>

      {/* Digital time display */}
      <div className="text-center mt-3">
        <div className="text-xs text-gray-500">
          {time.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
