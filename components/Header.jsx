'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Todo List</h1>
            <p className="text-gray-600 mt-1">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Todo List</h1>
          <p className="text-gray-600 mt-1">
            {currentTime ? `Manage your tasks - ${currentTime.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}` : 'Loading...'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {currentTime ? currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }) : '--:--'}
            </div>
            <div className="text-xs text-gray-500">Current Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}