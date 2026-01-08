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
  const [showError, setShowError] = useState(false);
  
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

    // Validation: Start Date must be before or equal to End Date
    if (startDate > endDate) {
        setShowError(true);
        return;
    }

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

  const isValidSequence = startDate && endDate && startDate <= endDate;
  const duration = (startDate && endDate && isValidSequence) ? (getDaysDiff(startDate, endDate) + 1) : 0;

  return (
    <div className="bg-background-light dark:bg-black min-h-screen flex flex-col font-display antialiased overflow-x-hidden relative">
      {/* iOS Style Alert Modal */}
      {showError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-8 animate-in fade-in duration-200">
            <div className="bg-[#F2F2F2] dark:bg-[#1C1C1E] rounded-[14px] shadow-xl w-full max-w-[270px] overflow-hidden transform scale-100 flex flex-col">
                <div className="p-5 text-center flex flex-col gap-1">
                    <h3 className="text-[17px] font-semibold text-black dark:text-white leading-snug">Invalid Dates</h3>
                    <p className="text-[13px] text-black dark:text-white leading-snug">
                        The return date cannot be before the departure date.
                    </p>
                </div>
                <div className="border-t border-[#3F3F3F]/20 dark:border-[#545458]/60 flex">
                    <button 
                        onClick={() => setShowError(false)}
                        className="w-full py-3 text-[17px] font-semibold text-primary active:bg-gray-200 dark:active:bg-white/10 transition-colors"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
      )}

      <div className="sticky top-0 z-50 bg-background-light/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 pt-12 pb-3 flex items-center justify-between transition-colors">
        <button 
          onClick={() => navigate(-1)}
          className="text-primary text-[17px] cursor-pointer hover:opacity-70 transition-opacity active:opacity-50">Cancel</button>
        <h1 className="text-black dark:text-white text-[17px] font-semibold absolute left-1/2 -translate-x-1/2">
            {id ? 'Edit Trip' : 'New Trip'}
        </h1>
        <button 
          onClick={handleSave}
          disabled={!startDate || !endDate || !country.trim()}
          className="text-primary text-[17px] font-semibold cursor-pointer hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-default active:opacity-50">Done</button>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-32 pt-6 px-6">
        
        {/* Form Group */}
        <div className="bg-card-light dark:bg-card-dark rounded-xl overflow-hidden shadow-sm ring-1 ring-black/5 dark:ring-white/10 mb-6">
            
            {/* Country Input */}
            <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-white/10 bg-card-light dark:bg-card-dark">
                 <label className="text-[16px] text-black dark:text-white w-24 shrink-0">Destination</label>
                 <input 
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="flex-1 bg-transparent border-none text-right text-black dark:text-white placeholder-gray-400 focus:ring-0 p-0 text-[16px]"
                    placeholder="Required"
                  />
            </div>

            {/* Departure Date */}
            <div>
                <button 
                    onClick={() => setShowCalendar(showCalendar === 'start' ? null : 'start')}
                    className={`w-full flex items-center justify-between p-3 border-b border-gray-100 dark:border-white/10 active:bg-gray-50 dark:active:bg-white/5 transition-colors ${showCalendar === 'start' ? 'bg-gray-50 dark:bg-white/5' : ''}`}>
                    <span className="text-[16px] text-black dark:text-white">Departure</span>
                    <span className={`text-[16px] transition-colors ${startDate ? 'text-black dark:text-white' : 'text-gray-400'} ${showCalendar === 'start' ? 'text-primary dark:text-primary font-medium' : ''}`}>
                        {startDate ? formatDate(startDate) : 'Select'}
                    </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showCalendar === 'start' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-2 bg-gray-50 dark:bg-black/20 border-b border-gray-100 dark:border-white/10">
                        <Calendar 
                            selectedDate={startDate} 
                            onSelectDate={(d) => { setStartDate(d); setShowCalendar('end'); }} // Auto jump to end date
                        />
                    </div>
                </div>
            </div>

            {/* Return Date */}
            <div>
                <button 
                    onClick={() => setShowCalendar(showCalendar === 'end' ? null : 'end')}
                    className={`w-full flex items-center justify-between p-3 active:bg-gray-50 dark:active:bg-white/5 transition-colors ${showCalendar === 'end' ? 'bg-gray-50 dark:bg-white/5' : ''}`}>
                    <span className="text-[16px] text-black dark:text-white">Return</span>
                    <span className={`text-[16px] transition-colors ${endDate ? 'text-black dark:text-white' : 'text-gray-400'} ${showCalendar === 'end' ? 'text-primary dark:text-primary font-medium' : ''}`}>
                        {endDate ? formatDate(endDate) : 'Select'}
                    </span>
                </button>
                 <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showCalendar === 'end' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-2 bg-gray-50 dark:bg-black/20">
                        <Calendar 
                            selectedDate={endDate} 
                            onSelectDate={(d) => { setEndDate(d); setShowCalendar(null); }}
                            minDate={startDate || undefined}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Info Text */}
        <div className="px-4 mb-6">
            <p className="text-[12px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {!startDate || !endDate ? 'Total Absence: 0 Days' : 
                 isValidSequence ? `Total Absence: ${duration} Days` : 'Invalid Dates'}
            </p>
        </div>

        {id && (
            <button 
                onClick={handleDelete}
                className="w-full bg-card-light dark:bg-card-dark text-red-500 text-[17px] font-normal py-3 rounded-xl shadow-sm ring-1 ring-black/5 dark:ring-white/10 active:opacity-70 transition-opacity active:bg-gray-50 dark:active:bg-white/5">
                Delete Trip
            </button>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default TravelEntryScreen;