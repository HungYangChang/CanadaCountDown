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
  let tempCredit = 0;
  tempPresenceHistory.forEach(record => {
    tempCredit += record.days * 0.5;
  });
  tempCredit = Math.min(tempCredit, 365);

  // Absence
  let daysAbsent = 0;
  travelHistory.forEach(trip => {
    daysAbsent += trip.days;
  });
  
  const totalCredited = Math.max(0, Math.floor(daysSincePr - daysAbsent + tempCredit));
  const required = 1095;
  const daysRemaining = Math.max(0, required - totalCredited);
  const progressPercent = Math.min(100, (totalCredited / required) * 100);

  // Estimate eligibility date
  const eligibilityDate = new Date();
  eligibilityDate.setDate(today.getDate() + daysRemaining);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      {/* Standardized Header */}
      <div className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-white/5 transition-colors">
        <div className="flex items-center justify-between px-4 pt-14 pb-4 min-h-[88px]">
          {/* Left Anchor - Canada Calendar Icon */}
          <div className="flex w-16 justify-start shrink-0 items-center h-full">
             <div className="flex flex-col items-center justify-center size-10 rounded-[10px] bg-white dark:bg-[#1A2532] shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5 dark:ring-white/10 overflow-hidden shrink-0 group hover:scale-105 transition-transform duration-200">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg" 
                    alt="Canada" 
                    className="w-full h-full object-cover"
                />
             </div>
          </div>

          {/* Center Content - Countdown */}
          <div className="flex flex-1 flex-col items-center justify-center -mt-1">
            <span className="text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-none transition-colors">
                {daysRemaining}
            </span>
            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider opacity-80 whitespace-nowrap">
              {t.daysUntil}
            </p>
          </div>

          {/* Right Anchor - Empty for Balance */}
          <div className="w-16 shrink-0"></div>
        </div>
      </div>
      
      <main className="flex-grow flex flex-col gap-6 p-4 pt-4">
        <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-gray-100/50 dark:bg-white/5 p-4 gap-4 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">Statistics</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-gray-400 !text-xl fill">timelapse</span>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">{t.eligibilityProgress}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out" style={{width: `${progressPercent}%`}}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{totalCredited} {t.daysCredited}</span>
              <span>{required} {t.daysRequired}</span>
            </div>
          </div>
          <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700/50">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t.totalPresences}</span>
              <span className="font-medium text-gray-900 dark:text-white">{totalCredited}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t.earliestEligibility}</span>
              <span className="font-medium text-gray-900 dark:text-white">{prDate ? formatDate(eligibilityDate) : '-- --, ----'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t.prInfo}</h2>
          <div className="flex flex-col gap-3">
            {/* PR Date Card */}
            <button 
              onClick={() => navigate('/pr-day-input')}
              className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#1A2532] p-4 transition-all active:scale-[0.98] border border-transparent dark:border-white/5 hover:bg-gray-200 dark:hover:bg-[#233040]">
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-200/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                   <span className="material-symbols-outlined">calendar_month</span>
                </div>
                <div className="flex flex-col items-start text-left">
                   <span className="text-base font-bold text-gray-900 dark:text-white">
                      {t.setPrDay}
                   </span>
                   <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {prDate ? formatDate(prDate) : t.prDateDesc}
                   </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">chevron_right</span>
              </div>
            </button>

            {/* Temporary Presence Card */}
            <button 
              onClick={() => navigate('/temporary-presence-history')}
              className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#1A2532] p-4 transition-all active:scale-[0.98] border border-transparent dark:border-white/5 hover:bg-gray-200 dark:hover:bg-[#233040]">
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-200/50 dark:bg-[#3d2922] text-orange-600 dark:text-[#e88c5d]">
                   <span className="material-symbols-outlined">history</span>
                </div>
                <div className="flex flex-col items-start text-left">
                   <span className="text-base font-bold text-gray-900 dark:text-white">{t.tempPresence}</span>
                   <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t.tempPresenceDesc}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                   <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">{tempCredit}</span>
                   <span className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1">days</span>
                </div>
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">chevron_right</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t.presenceCalc}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">{t.calcDesc}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 rounded-xl bg-gray-100/50 dark:bg-white/5 p-4 border border-transparent dark:border-white/5">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="material-symbols-outlined !text-xl">flag</span>
                <span>{t.daysIn}</span>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{totalCredited}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{t.totalDaysIn}</p>
            </div>
            <div className="flex flex-col gap-1 rounded-xl bg-gray-100/50 dark:bg-white/5 p-4 border border-transparent dark:border-white/5">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="material-symbols-outlined !text-xl">flight_takeoff</span>
                <span>{t.daysOut}</span>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{daysAbsent}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{t.totalDaysOut}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 gap-4 justify-between">
          <button 
            onClick={() => navigate('/travel-history')}
            className="flex flex-col gap-2 p-4 items-center justify-center overflow-hidden rounded-xl h-28 flex-1 bg-gray-100/50 dark:bg-white/5 text-gray-800 dark:text-white text-base font-bold leading-normal tracking-[0.015em] active:scale-[0.98] transition-all duration-100 ease-in-out cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 border border-transparent dark:border-white/5">
            <span className="material-symbols-outlined !text-3xl">history</span>
            <span className="truncate text-sm font-medium">{t.travelHistory}</span>
          </button>
          <button 
            onClick={() => navigate('/travel-entry')}
            className="flex flex-col gap-2 p-4 items-center justify-center overflow-hidden rounded-xl h-28 flex-1 bg-gray-100/50 dark:bg-white/5 text-gray-800 dark:text-white text-base font-bold leading-normal tracking-[0.015em] active:scale-[0.98] transition-all duration-100 ease-in-out cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 border border-transparent dark:border-white/5">
            <span className="material-symbols-outlined !text-3xl">add_location_alt</span>
            <span className="truncate text-sm font-medium">{t.addTrip}</span>
          </button>
        </div>
        
        <div className="flex-grow"></div>
        <div className="py-3 pb-24">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 w-full bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] active:scale-[0.98] transition-transform duration-100 ease-in-out shadow-lg shadow-blue-500/30">
                <span className="truncate">{t.tip}</span>
            </button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default HomeScreen;