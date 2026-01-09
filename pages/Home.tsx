import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import { formatDate, getDaysDiff } from '../utils';
import { translations } from '../translations';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { prDate, travelHistory, tempPresenceHistory, language } = useApp();
  const t = translations[language];

  // Basic Calculation Logic
  const today = new Date();
  
  // Days since PR
  let daysSincePr = 0;
  if (prDate) {
    daysSincePr = getDaysDiff(today, prDate);
  }

  // Temp Credit
  let rawTempDays = 0;
  tempPresenceHistory.forEach(record => {
    rawTempDays += record.days;
  });
  let tempCredit = Math.floor(rawTempDays * 0.5);
  const isCapped = tempCredit > 365;
  const finalTempCredit = Math.min(tempCredit, 365);
  const tempCreditProgress = Math.min(100, (finalTempCredit / 365) * 100);

  // Absence
  let daysAbsent = 0;
  travelHistory.forEach(trip => {
    daysAbsent += trip.days;
  });
  
  const totalCredited = Math.max(0, Math.floor(daysSincePr - daysAbsent + finalTempCredit));
  // Updated requirement to 1096 days as requested
  const required = 1096;
  const daysRemaining = Math.max(0, required - totalCredited);
  const progressPercent = Math.min(100, (totalCredited / required) * 100);

  // Estimate eligibility date
  const eligibilityDate = new Date();
  eligibilityDate.setDate(today.getDate() + daysRemaining);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      {/* Standardized Header */}
      <div className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-white/5 transition-colors">
        <div className="flex items-center justify-between px-6 pt-[calc(env(safe-area-inset-top)+24px)] pb-2 min-h-[70px]">
          {/* Left Anchor - App Icon */}
          <div className="flex w-16 justify-start shrink-0 items-center h-full">
             <div className="flex flex-col items-center justify-center size-9 rounded-[8px] bg-white dark:bg-[#1A2532] shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5 dark:ring-white/10 overflow-hidden shrink-0 group hover:scale-105 transition-transform duration-200">
                <img 
                    src="/icon.png" 
                    alt="App Icon" 
                    className="w-full h-full object-cover"
                />
             </div>
          </div>

          {/* Center Content - Countdown */}
          <div className="flex flex-1 flex-col items-center justify-center -mt-1">
            <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none transition-colors">
                {daysRemaining}
            </span>
            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mt-0.5 uppercase tracking-wider opacity-80 whitespace-nowrap">
              {t.daysUntil}
            </p>
          </div>

          {/* Right Anchor - Empty for Balance */}
          <div className="w-16 shrink-0"></div>
        </div>
      </div>
      
      <main className="flex-grow flex flex-col gap-5 p-6 pt-4">
        
        {/* Statistics Card */}
        <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-gray-100/50 dark:bg-white/5 p-4 gap-3 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-base font-bold text-gray-900 dark:text-white">Statistics</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-col gap-1 text-left">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-gray-400 !text-lg fill">timelapse</span>
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300">{t.eligibilityProgress}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" style={{width: `${progressPercent}%`}}></div>
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
              <span>{totalCredited} {t.daysCredited}</span>
              <span>{required} {t.daysRequired}</span>
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700/50">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400">{t.totalPresences}</span>
              <span className="font-medium text-gray-900 dark:text-white">{totalCredited}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400">{t.earliestEligibility}</span>
              <span className="font-medium text-gray-900 dark:text-white">{prDate ? formatDate(eligibilityDate) : '-- --, ----'}</span>
            </div>
          </div>
        </div>

        {/* Temporary Residence Summary Widget */}
        <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-white dark:bg-[#1A2532] p-4 gap-3 transition-colors border border-gray-100 dark:border-white/5">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                        <span className="material-symbols-outlined text-[18px]">history</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Temporary Residence Credit</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">Max 365 days credited (50% rule)</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{finalTempCredit}</p>
                </div>
             </div>
             
             <div className="flex flex-col gap-1">
                 <div className="flex justify-between text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">
                     <span>{rawTempDays} days present</span>
                     <span>{isCapped ? 'Capped at 365' : '50% Credit'}</span>
                 </div>
                 <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${isCapped ? 'bg-orange-500' : 'bg-blue-500'}`} 
                        style={{width: `${tempCreditProgress}%`}}
                    ></div>
                 </div>
             </div>
        </div>

        {/* NEW: Temporary Residence Actions */}
        <div className="flex flex-1 gap-4 justify-between">
          <button 
            onClick={() => navigate('/temporary-presence-history')}
            className="flex flex-col gap-1.5 p-3 items-center justify-center overflow-hidden rounded-xl h-24 flex-1 bg-gray-100/50 dark:bg-white/5 text-gray-800 dark:text-white active:scale-[0.98] transition-all duration-100 ease-in-out cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 border border-transparent dark:border-white/5">
            <span className="material-symbols-outlined !text-2xl">history_edu</span>
            <span className="truncate text-xs font-bold">{t.trHistory}</span>
          </button>
          <button 
            onClick={() => navigate('/temporary-presence-entry')}
            className="flex flex-col gap-1.5 p-3 items-center justify-center overflow-hidden rounded-xl h-24 flex-1 bg-gray-100/50 dark:bg-white/5 text-gray-800 dark:text-white active:scale-[0.98] transition-all duration-100 ease-in-out cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 border border-transparent dark:border-white/5">
            <span className="material-symbols-outlined !text-2xl">note_add</span>
            <span className="truncate text-xs font-bold">{t.addTr}</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">{t.prInfo}</h2>
          <div className="flex flex-col gap-3">
            {/* PR Date Card */}
            <button 
              onClick={() => navigate('/pr-day-input')}
              className="group relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-gray-100 dark:bg-[#1A2532] p-4 transition-all active:scale-[0.98] border border-transparent dark:border-white/5 hover:bg-gray-200 dark:hover:bg-[#233040]">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-200/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                   <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                </div>
                <div className="flex flex-col items-start text-left">
                   <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {t.setPrDay}
                   </span>
                   <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      {prDate ? formatDate(prDate) : t.prDateDesc}
                   </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 text-lg">chevron_right</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">{t.presenceCalc}</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 -mt-2">{t.calcDesc}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-0.5 rounded-xl bg-gray-100/50 dark:bg-white/5 p-4 border border-transparent dark:border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                <span className="material-symbols-outlined !text-lg">flag</span>
                <span>{t.daysIn}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalCredited}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-500">{t.totalDaysIn}</p>
            </div>
            <div className="flex flex-col gap-0.5 rounded-xl bg-gray-100/50 dark:bg-white/5 p-4 border border-transparent dark:border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                <span className="material-symbols-outlined !text-lg">flight_takeoff</span>
                <span>{t.daysOut}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{daysAbsent}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-500">{t.totalDaysOut}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 gap-4 justify-between">
          <button 
            onClick={() => navigate('/travel-history')}
            className="flex flex-col gap-1.5 p-3 items-center justify-center overflow-hidden rounded-xl h-24 flex-1 bg-gray-100/50 dark:bg-white/5 text-gray-800 dark:text-white active:scale-[0.98] transition-all duration-100 ease-in-out cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 border border-transparent dark:border-white/5">
            <span className="material-symbols-outlined !text-2xl">history</span>
            <span className="truncate text-xs font-bold">{t.travelHistory}</span>
          </button>
          <button 
            onClick={() => navigate('/travel-entry')}
            className="flex flex-col gap-1.5 p-3 items-center justify-center overflow-hidden rounded-xl h-24 flex-1 bg-gray-100/50 dark:bg-white/5 text-gray-800 dark:text-white active:scale-[0.98] transition-all duration-100 ease-in-out cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 border border-transparent dark:border-white/5">
            <span className="material-symbols-outlined !text-2xl">add_location_alt</span>
            <span className="truncate text-xs font-bold">{t.addTrip}</span>
          </button>
        </div>
        
        {/* Tip James Section */}
        <div className="py-6 pb-24 mt-2">
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 p-6 border border-yellow-100 dark:border-yellow-500/20">
                <div className="text-center space-y-1">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Enjoying CanadaCountDown?</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Support the development with a coffee!</p>
                </div>
                
                <a 
                   href="https://buymeacoffee.com/james.with.nani" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex w-full items-center justify-center gap-2 bg-[#FFDD00] text-black font-bold py-3 px-6 rounded-xl shadow-md hover:bg-[#ffea00] active:scale-95 transition-transform"
                >
                    <span className="text-xl">☕</span>
                    <span>Buy me a coffee</span>
                </a>
                
                <p className="text-[10px] text-gray-400 opacity-80">
                    Secure payment via Buy Me a Coffee
                </p>
            </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default HomeScreen;