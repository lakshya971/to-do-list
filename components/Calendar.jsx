'use client';

import { useState, useEffect } from 'react';

export default function Calendar({ tasks = [] }) {
  const [currentDate, setCurrentDate] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now.getDate());
  }, []);

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: day, isCurrentMonth: true });
    }
    
    return days;
  };

  if (!mounted || !currentDate) {
    return (
      <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
        <div className="animate-pulse">
          <div className="h-3 bg-gray-200 rounded mb-2"></div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 42 }).map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const days = getDaysInMonth();
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Calendar</h3>
          <p className="text-xs text-gray-600">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
        </div>
        <div className="flex space-x-1">
          <button 
            onClick={() => navigateMonth(-1)}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
          >
            ←
          </button>
          <button 
            onClick={() => navigateMonth(1)}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
          >
            →
          </button>
        </div>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day, index) => (
          <div key={`day-${index}-${day}`} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isSelected = selectedDate === day.date;
          const isToday = day.isCurrentMonth && 
            day.date === new Date().getDate() && 
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear();
          const hasTask = day.isCurrentMonth && tasks.some(task => 
            task.dueDate && new Date(task.dueDate).getDate() === day.date
          );

          return (
            <button
              key={index}
              onClick={() => day.isCurrentMonth && setSelectedDate(day.date)}
              className={`
                h-6 text-xs font-medium rounded transition-all duration-200 relative
                ${day.isCurrentMonth 
                  ? isSelected 
                    ? 'bg-blue-600 text-white' 
                    : isToday
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-900 hover:bg-gray-100'
                  : 'text-gray-300'
                }
              `}
            >
              {day.date}
              {hasTask && (
                <div className={`
                  absolute bottom-0 right-0 w-1 h-1 rounded-full
                  ${isSelected ? 'bg-white' : 'bg-blue-500'}
                `}></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-3 pt-2 border-t border-gray-100 text-xs text-gray-600">
        {tasks.filter(task => !task.completed).length} pending tasks
      </div>
    </div>
  );
}