import React from 'react';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

const TravelHistoryScreen: React.FC = () => {
  const { travelHistory } = useApp();
  const totalDays = travelHistory.reduce((acc, curr) => acc + curr.days, 0);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden transition-colors">
      <header className="sticky top-0 z-10 flex h-auto shrink-0 items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 pb-2 pt-12 border-b border-transparent dark:border-white/5">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Travel History</h1>
        <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30 active:scale-95">
          <span className="material-symbols-outlined text-2xl font-semibold">add</span>
        </button>
      </header>
      <main className="flex-1 px-4 pt-4 pb-28">
        <div className="mb-6 rounded-xl bg-gray-100 dark:bg-[#1A2532] p-4 shadow-sm">
          <div className="flex flex-col items-stretch justify-start">
            <div className="flex w-full grow flex-col items-stretch justify-center gap-1">
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Total Days Outside Canada</p>
              <div className="flex items-end justify-between gap-3">
                <p className="text-5xl font-bold text-primary">{totalDays}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {travelHistory.map((trip) => (
            <div key={trip.id} className="flex min-h-[72px] items-center justify-between gap-4 rounded-xl bg-gray-100 dark:bg-[#1A2532] p-4 border border-transparent dark:border-white/5">
              <div className="flex flex-1 items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="material-symbols-outlined transform rotate-45">flight</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-base font-bold text-gray-900 dark:text-slate-100">{trip.country}</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    {new Date(trip.startDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})} → {new Date(trip.endDate).toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-base font-bold text-gray-900 dark:text-slate-100">{trip.days} Days</p>
                <button className="mt-1 text-gray-500 dark:text-slate-400">
                  <span className="material-symbols-outlined text-xl">more_horiz</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default TravelHistoryScreen;
