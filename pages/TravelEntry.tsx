import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import Calendar from '../components/Calendar';
import { getDaysDiff, formatDate } from '../utils';
import { TravelRecord } from '../types';

const TravelEntryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { travelHistory, addTravelRecord, updateTravelRecord, deleteTravelRecord } = useApp();

  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const [showCalendar, setShowCalendar] = useState<'start' | 'end' | null>(null);

  useEffect(() => {
    if (id) {
      const record = travelHistory.find(r => r.id === id);
      if (record) {
        setCountry(record.country);
        const sParts = record.startDate.split('-').map(Number);
        const eParts = record.endDate.split('-').map(Number);
        setStartDate(new Date(sParts[0], sParts[1] - 1, sParts[2]));
        setEndDate(new Date(eParts[0], eParts[1] - 1, eParts[2]));
      }
    }
  }, [id, travelHistory]);

  const handleSave = () => {
    if (!startDate || !endDate || !country.trim()) return;

    const formatYMD = (d: Date) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };

    const diff = getDaysDiff(startDate, endDate) + 1;
    
    const record: TravelRecord = {
      id: id || Date.now().toString(),
      country: country.trim(),
      startDate: formatYMD(startDate),
      endDate: formatYMD(endDate),
      days: diff > 0 ? diff : 0,
    };

    if (id) {
      updateTravelRecord(record);
    } else {
      addTravelRecord(record);
    }
    navigate('/travel-history');
  };

  const handleDelete = () => {
    if (id) {
      deleteTravelRecord(id);
      navigate('/travel-history');
    }
  };

  const duration = (startDate && endDate) ? (getDaysDiff(startDate, endDate) + 1) : 0;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display antialiased text-[#111418] dark:text-white overflow-x-hidden relative transition-colors">
      <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-[#e5e7eb] dark:border-[#293038] px-4 h-14 flex items-center justify-between transition-colors">
        <button 
          onClick={() => navigate(-1)}
          className="text-primary/80 dark:text-[#9dabb9] text-base font-medium leading-normal hover:opacity-70 transition-opacity">Cancel</button>
        <h1 className="text-[#111418] dark:text-white text-[17px] font-bold leading-tight absolute left-1/2 -translate-x-1/2 w-max">
            {id ? 'Edit Trip' : 'New Trip'}
        </h1>
        <button 
          onClick={handleSave}
          disabled={!startDate || !endDate || !country.trim()}
          className="text-primary text-base font-bold leading-normal hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed">Save</button>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-5 pt-6 pb-2">
          <h2 className="text-[#111418] dark:text-white text-2xl font-bold leading-tight tracking-tight">{id ? 'Edit Trip' : 'Add Trip'}</h2>
          <p className="text-[#6b7280] dark:text-[#9dabb9] text-sm mt-1">Record days spent outside Canada.</p>
        </div>
        
        <div className="mt-4 px-5">
           <label className="flex flex-col">
              <span className="text-[#6b7280] dark:text-[#9dabb9] text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Destination</span>
              <input 
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border-gray-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] text-[#111418] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent h-12 px-4 text-base font-normal placeholder:text-gray-400 dark:placeholder:text-[#586370] shadow-sm mb-2"
                placeholder="e.g. United States"
              />
            </label>
        </div>

        <div className="mt-4">
          <div className="px-5 pb-3">
            <h3 className="text-[#111418] dark:text-white text-sm font-bold uppercase tracking-wide opacity-80">Timeframe</h3>
          </div>
          
          <div className="bg-white dark:bg-[#1c2127] border-y border-[#e5e7eb] dark:border-[#293038] px-5 py-4 sm:rounded-xl sm:border sm:mx-5 sm:px-4 flex flex-col gap-4">
            
            {/* Start Date Field */}
            <div className="relative group">
              <label className="block text-[#6b7280] dark:text-[#9dabb9] text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Departure Date</label>
              <div 
                onClick={() => setShowCalendar(showCalendar === 'start' ? null : 'start')}
                className={`relative w-full rounded-xl border border-gray-200 dark:border-[#3b4754] bg-[#f9fafb] dark:bg-[#101922] h-12 pl-4 pr-10 flex items-center shadow-sm transition-all cursor-pointer ${showCalendar === 'start' ? 'ring-2 ring-primary border-transparent' : ''}`}>
                 <span className={`text-base font-medium ${startDate ? 'text-[#111418] dark:text-white' : 'text-gray-400'}`}>
                    {startDate ? formatDate(startDate) : 'Select Date'}
                 </span>
                 <span className="material-symbols-outlined absolute right-3 text-gray-400">calendar_month</span>
              </div>
              
              {showCalendar === 'start' && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Calendar 
                        selectedDate={startDate} 
                        onSelectDate={(d) => { setStartDate(d); setShowCalendar(null); }}
                        minYear={2000}
                        maxYear={2050}
                    />
                </div>
              )}
            </div>

            {/* End Date Field */}
            <div className="relative group">
              <label className="block text-[#6b7280] dark:text-[#9dabb9] text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Return Date</label>
              <div 
                onClick={() => setShowCalendar(showCalendar === 'end' ? null : 'end')}
                className={`relative w-full rounded-xl border border-gray-200 dark:border-[#3b4754] bg-[#f9fafb] dark:bg-[#101922] h-12 pl-4 pr-10 flex items-center shadow-sm transition-all cursor-pointer ${showCalendar === 'end' ? 'ring-2 ring-primary border-transparent' : ''}`}>
                 <span className={`text-base font-medium ${endDate ? 'text-[#111418] dark:text-white' : 'text-gray-400'}`}>
                    {endDate ? formatDate(endDate) : 'Select Date'}
                 </span>
                 <span className="material-symbols-outlined absolute right-3 text-gray-400">calendar_month</span>
              </div>
              
              {showCalendar === 'end' && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Calendar 
                        selectedDate={endDate} 
                        onSelectDate={(d) => { setEndDate(d); setShowCalendar(null); }}
                        minYear={2000}
                        maxYear={2050}
                    />
                </div>
              )}
            </div>
            
          </div>
          
          <div className="px-5 mt-4">
            <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-4 flex items-start gap-3 border border-primary/10 dark:border-primary/5">
              <div className="bg-primary/20 rounded-full p-1 shrink-0">
                <span className="material-symbols-outlined text-primary text-[20px] block">flight_takeoff</span>
              </div>
              <div className="flex flex-col">
                <p className="text-[#111418] dark:text-white text-sm font-bold">{duration > 0 ? duration : 0} Days Absent</p>
                <p className="text-[#4e7397] dark:text-[#aabacf] text-xs font-medium leading-relaxed mt-0.5">
                  These days will be subtracted from your physical presence count.
                </p>
              </div>
            </div>
          </div>
        </div>

        {id && (
            <div className="px-5 mt-10 mb-6">
            <button 
                onClick={handleDelete}
                className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold text-base hover:bg-red-100 dark:hover:bg-red-900/20 active:scale-[0.98] transition-all">
                <span className="material-symbols-outlined text-[20px]">delete</span>
                Delete Trip
            </button>
            </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default TravelEntryScreen;
