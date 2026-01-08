import React, { useState, useEffect } from 'react';
import { getDaysInMonth, getFirstDayOfMonth, addMonths } from '../utils';

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minYear?: number;
  maxYear?: number;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelectDate, minYear = 2000, maxYear = 2050 }) => {
  const [viewDate, setViewDate] = useState(selectedDate || new Date());

  // Ensure viewDate is within bounds when mounting or changing
  useEffect(() => {
    if (viewDate.getFullYear() < minYear) setViewDate(new Date(minYear, 0, 1));
    if (viewDate.getFullYear() > maxYear) setViewDate(new Date(maxYear, 0, 1));
  }, []);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    const newDate = addMonths(viewDate, -1);
    if (newDate.getFullYear() >= minYear) {
      setViewDate(newDate);
    }
  };

  const nextMonth = () => {
    const newDate = addMonths(viewDate, 1);
    if (newDate.getFullYear() <= maxYear) {
      setViewDate(newDate);
    }
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onSelectDate(newDate);
  };

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="flex w-full flex-col gap-2 rounded-xl bg-white dark:bg-[#1c2127] p-4 shadow-sm ring-1 ring-gray-200 dark:ring-[#3b4754]">
      <div className="flex items-center p-1 justify-between mb-2">
        <button 
          onClick={prevMonth}
          disabled={currentYear === minYear && currentMonth === 0}
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors disabled:opacity-30">
          <span className="material-symbols-outlined text-[#111418] dark:text-white text-[20px]">chevron_left</span>
        </button>
        <p className="text-[#111418] dark:text-white text-base font-bold leading-tight flex-1 text-center select-none">
          {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
        <button 
          onClick={nextMonth}
          disabled={currentYear === maxYear && currentMonth === 11}
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors disabled:opacity-30">
          <span className="material-symbols-outlined text-[#111418] dark:text-white text-[20px]">chevron_right</span>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-y-2">
        {weekDays.map(d => (
          <div key={d} className="text-[#9dabb9] text-[12px] font-bold uppercase tracking-wider flex h-8 w-full items-center justify-center select-none">
            {d}
          </div>
        ))}
        
        {/* Padding for empty days at start of month */}
        {[...Array(firstDay)].map((_, i) => (
          <div key={`empty-${i}`} className="h-10 w-full" />
        ))}
        
        {/* Days */}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isSelected = selectedDate && 
            selectedDate.getDate() === day && 
            selectedDate.getMonth() === currentMonth && 
            selectedDate.getFullYear() === currentYear;
            
          const isToday = new Date().getDate() === day && 
            new Date().getMonth() === currentMonth && 
            new Date().getFullYear() === currentYear;

          return (
            <button 
              key={day} 
              onClick={() => handleDayClick(day)}
              className={`h-10 w-full text-sm font-medium leading-normal rounded-full transition-colors relative
                ${isSelected 
                  ? 'text-white' 
                  : 'text-[#111418] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                }
              `}>
              <div className={`flex size-full items-center justify-center rounded-full ${isSelected ? 'bg-primary shadow-lg shadow-primary/30' : ''}`}>
                {day}
                {!isSelected && isToday && (
                   <div className="absolute bottom-1.5 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
