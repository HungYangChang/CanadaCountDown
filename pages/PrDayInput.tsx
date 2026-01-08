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

  const handleSave = () => {
    setPrDate(selected);
    navigate('/');
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display antialiased text-[#111418] dark:text-white">
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <button 
          onClick={() => navigate('/')}
          className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-start rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Set PR Date</h2>
        <div className="flex w-12 items-center justify-end">
          <button 
            onClick={() => navigate('/')}
            className="text-[#9dabb9] text-base font-bold leading-normal tracking-[0.015em] shrink-0 hover:text-primary transition-colors">Skip</button>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <div className="px-4 pt-5 pb-2 text-center">
          <h2 className="text-[#111418] dark:text-white tracking-tight text-[28px] font-bold leading-tight">When did you become a PR?</h2>
        </div>
        <div className="px-6 pb-6 text-center">
          <p className="text-[#4e5d6d] dark:text-[#9dabb9] text-base font-normal leading-normal">
            This is usually the date found on your Confirmation of Permanent Residence (COPR) document.
          </p>
        </div>
        
        <div className="px-4 py-2">
          <label className="flex flex-col w-full">
            <p className="text-[#111418] dark:text-white text-base font-medium leading-normal pb-2 ml-1">PR Start Date</p>
            <div className="flex w-full items-stretch rounded-xl overflow-hidden shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#3b4754] bg-white dark:bg-[#1c2127] hover:ring-primary/50 transition-all">
              <div className="flex w-full min-w-0 flex-1 items-center h-14 px-4">
                 <span className="text-lg font-normal leading-normal text-[#111418] dark:text-white">
                    {selected ? formatDate(selected) : 'Select a date'}
                 </span>
              </div>
              <div className="text-[#9dabb9] flex items-center justify-center pr-4">
                <span className="material-symbols-outlined text-[24px]">calendar_month</span>
              </div>
            </div>
          </label>
        </div>
        
        <div className="flex flex-col items-center justify-center p-4">
          <Calendar 
            selectedDate={selected} 
            onSelectDate={setSelected} 
            minYear={2000} 
            maxYear={2050}
          />
        </div>
        
        <div className="px-4 pb-4">
          <button 
            onClick={() => navigate('/temporary-presence-history')}
            className="flex w-full items-center justify-between gap-3 rounded-xl bg-white dark:bg-[#1c2127] p-4 shadow-sm ring-1 ring-gray-200 dark:ring-[#3b4754] transition-colors hover:bg-gray-50 dark:hover:bg-[#252b32]">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <span className="material-symbols-outlined text-primary text-[24px]">history</span>
              </div>
              <div className="flex flex-col items-start text-left">
                <p className="text-[#111418] dark:text-white text-base font-bold leading-tight">View Temporary Presence History</p>
                <p className="text-[#4e5d6d] dark:text-[#9dabb9] text-sm font-normal leading-normal">Check your past records</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#9dabb9] text-[24px]">chevron_right</span>
          </button>
        </div>
        
        <div className="px-4 py-4 flex justify-center">
          <button 
            onClick={handleSave}
            disabled={!selected}
            className="flex w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
            <span className="truncate">Save PR Date</span>
          </button>
        </div>
        <div className="h-4"></div>
      </main>
      <BottomNav />
    </div>
  );
};

export default PrDayInputScreen;
