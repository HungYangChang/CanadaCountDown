import React, { useState, useEffect } from 'react';
import { getDaysInMonth, getFirstDayOfMonth, addMonths } from '../utils';

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minYear?: number;
  maxYear?: number;
  maxDate?: Date;
  minDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelectDate, minYear = 2000, maxYear = 2050, maxDate, minDate }) => {
  // Initialize with selectedDate if available, otherwise today
  const [viewDate, setViewDate] = useState(selectedDate ? new Date(selectedDate) : new Date());

  // Sync viewDate when selectedDate prop changes externally
  useEffect(() => {
    if (selectedDate) {
      // Only update view if the selected date is in a different month/year to avoid resetting navigation
      const currentViewMonth = viewDate.getMonth();
      const currentViewYear = viewDate.getFullYear();
      if (selectedDate.getMonth() !== currentViewMonth || selectedDate.getFullYear() !== currentViewYear) {
         setViewDate(new Date(selectedDate));
      }
    }
  }, [selectedDate]); // Intentionally exclude viewDate to prevent loops

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = (e?: React.MouseEvent) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const baseDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const newDate = addMonths(baseDate, -1);
    if (newDate.getFullYear() >= minYear) {
      setViewDate(newDate);
    }
  };

  const nextMonth = (e?: React.MouseEvent) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const baseDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const newDate = addMonths(baseDate, 1);
    if (newDate.getFullYear() <= maxYear) {
      setViewDate(newDate);
    }
  };

  const jumpToToday = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const today = new Date();
    setViewDate(today);
    onSelectDate(today);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    const newDate = new Date(viewDate);
    newDate.setFullYear(newYear);
    setViewDate(newDate);
  };

  const handleDayClick = (day: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectDate(new Date(currentYear, currentMonth, day));
  };

  const isDateDisabled = (year: number, month: number, day: number) => {
    const dateToCheck = new Date(year, month, day);
    dateToCheck.setHours(0, 0, 0, 0);

    if (maxDate) {
        const max = new Date(maxDate);
        max.setHours(23, 59, 59, 999);
        if (dateToCheck > max) return true;
    }

    if (minDate) {
        const min = new Date(minDate);
        min.setHours(0, 0, 0, 0);
        if (dateToCheck < min) return true;
    }

    return false;
  };

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const years = [];
  for (let y = minYear; y <= maxYear; y++) {
    years.push(y);
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="flex w-full flex-col bg-transparent select-none animate-in fade-in duration-300">
      {/* iOS Style Header */}
      <div className="flex items-center justify-between mb-4 px-1 pt-1">
        <div className="flex items-center gap-1.5">
            <span className="text-primary font-semibold text-lg cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group relative">
                {monthNames[currentMonth]}
                {/* Invisible Select Overlay for iOS native picker feel */}
                <select 
                    value={currentMonth}
                    onChange={(e) => {
                        const newMonth = parseInt(e.target.value);
                        const d = new Date(viewDate);
                        d.setMonth(newMonth);
                        setViewDate(d);
                    }}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer appearance-none"
                >
                    {monthNames.map((m, i) => <option key={i} value={i}>{m}</option>)}
                </select>
                <span className="text-[10px] opacity-50">▼</span>
            </span>
            
            <div className="relative group">
                <span className="text-black dark:text-white text-lg font-normal ml-1">{currentYear}</span>
                <select 
                    value={currentYear}
                    onChange={handleYearChange}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer appearance-none"
                >
                    {years.map(y => (
                        <option key={y} value={y} className="text-black">{y}</option>
                    ))}
                </select>
            </div>
        </div>

        <div className="flex items-center gap-1">
            <button 
              type="button"
              onClick={prevMonth}
              disabled={currentYear === minYear && currentMonth === 0}
              className="text-primary disabled:opacity-30 w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors active:bg-gray-200 dark:active:bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">chevron_left</span>
            </button>
            <button 
              type="button"
              onClick={nextMonth}
              disabled={currentYear === maxYear && currentMonth === 11}
              className="text-primary disabled:opacity-30 w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors active:bg-gray-200 dark:active:bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">chevron_right</span>
            </button>
        </div>
      </div>
      
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((d, i) => (
          <div key={`${d}-${i}`} className="text-gray-400 dark:text-gray-500 text-[11px] font-semibold uppercase text-center">
            {d}
          </div>
        ))}
      </div>
        
      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-1 place-items-center">
        {/* Padding for empty days at start of month */}
        {[...Array(firstDay)].map((_, i) => (
          <div key={`empty-${i}`} className="h-10 w-full" />
        ))}
        
        {/* Days */}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const disabled = isDateDisabled(currentYear, currentMonth, day);
          
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
              type="button"
              disabled={disabled}
              onClick={(e) => !disabled && handleDayClick(day, e)}
              className={`relative flex items-center justify-center h-10 w-10 outline-none rounded-full touch-manipulation group ${disabled ? 'cursor-not-allowed opacity-20' : 'cursor-pointer'}`}>
              <div className={`
                flex size-[34px] items-center justify-center rounded-full text-[17px] transition-all duration-200
                ${isSelected 
                  ? 'bg-primary text-white font-semibold shadow-sm' 
                  : disabled ? 'text-gray-400 dark:text-gray-600' : 'text-black dark:text-white font-normal hover:bg-gray-100 dark:hover:bg-white/10'
                }
                ${!isSelected && isToday && !disabled ? 'text-primary font-bold' : ''}
              `}>
                {day}
              </div>
              {/* iOS style dot for today */}
              {!isSelected && isToday && !disabled && (
                  <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Today Button Footer */}
      <div className="flex justify-center mt-3 pt-2 border-t border-gray-100 dark:border-white/5">
        <button 
            onClick={jumpToToday}
            className="text-primary text-sm font-medium active:opacity-50 transition-opacity">
            Today
        </button>
      </div>
    </div>
  );
};

export default Calendar;