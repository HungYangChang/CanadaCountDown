import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import { formatDate, getDaysDiff } from '../utils';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { prDate, travelHistory, tempPresenceHistory } = useApp();

  // Basic Calculation Logic (Simplified for demo)
  // 1. Calculate days since PR
  // 2. Add temporary residence credit (50% per day, max 365)
  // 3. Subtract days absent (travel)
  // 4. Target is 1095 days

  const today = new Date();
  
  // Days since PR (assuming present since then)
  let daysSincePr = 0;
  if (prDate) {
    daysSincePr = getDaysDiff(today, prDate);
  }

  // Temp Credit
  let tempCredit = 0;
  tempPresenceHistory.forEach(record => {
    // 50% credit
    tempCredit += record.days * 0.5;
  });
  // Max 365
  tempCredit = Math.min(tempCredit, 365);

  // Absence
  let daysAbsent = 0;
  travelHistory.forEach(trip => {
    daysAbsent += trip.days;
  });

  // Since PR calculation normally subtracts absences from the period.
  // We'll simplify: Total Credited = (Days Since PR - Days Absent AFTER PR) + Temp Credit
  // For this demo, assuming all travel is after PR for simplicity unless we check dates.
  
  const totalCredited = Math.max(0, Math.floor(daysSincePr - daysAbsent + tempCredit));
  const required = 1095;
  const daysRemaining = Math.max(0, required - totalCredited);
  const progressPercent = Math.min(100, (totalCredited / required) * 100);

  // Estimate eligibility date
  const eligibilityDate = new Date();
  eligibilityDate.setDate(today.getDate() + daysRemaining);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <div className="flex flex-col gap-2 bg-background-light dark:bg-background-dark p-4 pb-0 sticky top-0 z-10 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors">
        <div className="flex items-center h-12 justify-between">
          <div className="flex size-12 shrink-0 items-center text-gray-800 dark:text-white">
            <span className="material-symbols-outlined !text-3xl text-primary">energy_savings_leaf</span>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-gray-800 dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
              <span className="material-symbols-outlined !text-3xl">account_circle</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-6 pb-8 w-full">
          <div className="flex items-center justify-center">
            <span className="text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight transition-colors">
                {daysRemaining}
            </span>
          </div>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wide">days until eligibility</p>
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
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Eligibility in progress</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out" style={{width: `${progressPercent}%`}}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{totalCredited} days credited</span>
              <span>{required} days required</span>
            </div>
          </div>
          <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700/50">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Presences</span>
              <span className="font-medium text-gray-900 dark:text-white">{totalCredited}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Earliest Eligibility</span>
              <span className="font-medium text-gray-900 dark:text-white">{prDate ? formatDate(eligibilityDate) : '-- --, ----'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">PR Information</h2>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/pr-day-input')}
              className="w-full text-left flex items-center justify-between p-4 rounded-xl bg-gray-100/50 dark:bg-white/5 active:scale-[0.98] transition-all duration-100 ease-in-out cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 border border-transparent dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-300">
                  <span className="material-symbols-outlined">calendar_month</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-gray-900 dark:text-white">
                    {prDate ? formatDate(prDate) : 'Set PR Day'}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {prDate ? 'Date you became a PR' : 'Set the date you became a PR'}
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </button>
            <button 
              onClick={() => navigate('/temporary-presence-history')}
              className="w-full text-left flex items-center justify-between p-4 rounded-xl bg-gray-100/50 dark:bg-white/5 active:scale-[0.98] transition-all duration-100 ease-in-out cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 border border-transparent dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300">
                  <span className="material-symbols-outlined">history</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-gray-900 dark:text-white">Temporary Presence</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Time inside Canada before PR</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-gray-900 dark:text-white">{tempCredit} days</span>
                <span className="material-symbols-outlined text-gray-400">chevron_right</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Presence Calculation</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">Calculated over the last 5 years.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 rounded-xl bg-gray-100/50 dark:bg-white/5 p-4 border border-transparent dark:border-white/5">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="material-symbols-outlined !text-xl">flag</span>
                <span>Days in Canada</span>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{totalCredited}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Total days present</p>
            </div>
            <div className="flex flex-col gap-1 rounded-xl bg-gray-100/50 dark:bg-white/5 p-4 border border-transparent dark:border-white/5">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="material-symbols-outlined !text-xl">flight_takeoff</span>
                <span>Days Outside</span>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{daysAbsent}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Total days absent</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 gap-4 justify-between">
          <button 
            onClick={() => navigate('/travel-history')}
            className="flex flex-col gap-2 p-4 items-center justify-center overflow-hidden rounded-xl h-28 flex-1 bg-gray-100/50 dark:bg-white/5 text-gray-800 dark:text-white text-base font-bold leading-normal tracking-[0.015em] active:scale-[0.98] transition-all duration-100 ease-in-out cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 border border-transparent dark:border-white/5">
            <span className="material-symbols-outlined !text-3xl">history</span>
            <span className="truncate text-sm font-medium">Travel History</span>
          </button>
          <button className="flex flex-col gap-2 p-4 items-center justify-center overflow-hidden rounded-xl h-28 flex-1 bg-gray-100/50 dark:bg-white/5 text-gray-800 dark:text-white text-base font-bold leading-normal tracking-[0.015em] active:scale-[0.98] transition-all duration-100 ease-in-out cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/10 border border-transparent dark:border-white/5">
            <span className="material-symbols-outlined !text-3xl">add_location_alt</span>
            <span className="truncate text-sm font-medium">Add New Trip</span>
          </button>
        </div>
        
        <div className="flex-grow"></div>
        <div className="py-3 pb-24">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 w-full bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] active:scale-[0.98] transition-transform duration-100 ease-in-out shadow-lg shadow-blue-500/30">
                <span className="truncate">Tip James</span>
            </button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default HomeScreen;
