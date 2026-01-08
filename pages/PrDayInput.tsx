import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import Calendar from '../components/Calendar';
import { formatDate } from '../utils';

const PrDayInputScreen: React.FC = () => {
  const navigate = useNavigate();
  const { prDate, setPrDate } = useApp();
  const [selected, setSelected] = useState<Date | null>(prDate);
  const today = new Date();

  const handleSave = () => {
    setPrDate(selected);
    navigate('/');
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-black font-display antialiased">
      <header className="flex items-center bg-background-light/95 dark:bg-black/90 px-6 pt-12 pb-3 justify-between sticky top-0 z-20 backdrop-blur-md border-b border-gray-200/50 dark:border-white/5">
        <button 
          onClick={() => navigate('/')}
          className="text-primary flex items-center gap-1 -ml-2 px-2 py-1 rounded-lg active:opacity-50 transition-opacity">
          <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
          <span className="text-[17px] font-normal leading-none pb-0.5">Back</span>
        </button>
        <h2 className="text-black dark:text-white text-[17px] font-semibold leading-tight absolute left-1/2 -translate-x-1/2">PR Date</h2>
        <button 
          onClick={handleSave}
          disabled={!selected}
          className="text-primary text-[17px] font-semibold disabled:opacity-30 transition-opacity active:opacity-50">
          Save
        </button>
      </header>
      
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 pt-6">
        <div className="text-center mb-6">
            <h1 className="text-[22px] font-bold text-black dark:text-white tracking-tight mb-2">When did you become a PR?</h1>
            <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed max-w-xs mx-auto">
                This date determines when your citizenship eligibility calculation begins. Check your COPR document.
            </p>
        </div>

        <div className="overflow-hidden rounded-xl bg-card-light dark:bg-card-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 mb-6">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                <span className="text-[15px] text-gray-500 dark:text-gray-400 font-medium">Selected Date</span>
                <span className="text-[17px] font-semibold text-primary">
                    {selected ? formatDate(selected) : 'Not Set'}
                </span>
            </div>
            <div className="p-4 bg-white dark:bg-card-dark">
                 <Calendar 
                    selectedDate={selected} 
                    onSelectDate={setSelected} 
                    minYear={2000} 
                    maxYear={2050}
                    maxDate={today}
                  />
            </div>
        </div>
        
        {/* Helper Link */}
        <div className="rounded-xl bg-card-light dark:bg-card-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
             <button 
                onClick={() => navigate('/temporary-presence-history')}
                className="w-full flex items-center justify-between p-4 active:bg-gray-50 dark:active:bg-gray-800 transition-colors">
                <div className="flex flex-col items-start gap-0.5">
                    <span className="text-[17px] font-normal text-black dark:text-white">Temporary Presence</span>
                    <span className="text-[13px] text-gray-500">Did you live in Canada before becoming a PR?</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-[15px]">Optional</span>
                    <span className="material-symbols-outlined text-gray-300 text-xl">chevron_right</span>
                </div>
             </button>
        </div>
        
      </main>
      <BottomNav />
    </div>
  );
};

export default PrDayInputScreen;