import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

const TravelHistoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { travelHistory } = useApp();
  const totalDays = travelHistory.reduce((acc, curr) => acc + curr.days, 0);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden transition-colors">
      <header className="sticky top-0 z-10 flex h-auto shrink-0 items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-6 pb-3 pt-12 border-b border-transparent dark:border-white/5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Travel History</h1>
        <button 
          onClick={() => navigate('/travel-entry')}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30 active:scale-95">
          <span className="material-symbols-outlined text-xl font-semibold">add</span>
        </button>
      </header>
      <main className="flex-1 px-6 pt-3 pb-24">
        <div className="mb-4 rounded-xl bg-gray-100 dark:bg-[#1A2532] p-4 shadow-sm">
          <div className="flex flex-col items-stretch justify-start">
            <div className="flex w-full grow flex-col items-stretch justify-center gap-1">
              <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide">Total Days Outside Canada</p>
              <div className="flex items-end justify-between gap-3">
                <p className="text-4xl font-bold text-primary">{totalDays}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {travelHistory.length === 0 ? (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">flight_takeoff</span>
              <p className="text-sm">No travel records found.</p>
              <p className="text-xs mt-1">Tap the + button to add a trip.</p>
            </div>
          ) : travelHistory.map((trip) => (
            <div 
              key={trip.id} 
              onClick={() => navigate(`/travel-entry/${trip.id}`)}
              className="flex min-h-[64px] items-center justify-between gap-3 rounded-xl bg-gray-100 dark:bg-[#1A2532] p-3 border border-transparent dark:border-white/5 cursor-pointer active:scale-[0.99] transition-all hover:bg-gray-200/50 dark:hover:bg-[#252b32]">
              <div className="flex flex-1 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="material-symbols-outlined transform rotate-45 text-lg">flight</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-bold text-gray-900 dark:text-slate-100">{trip.country}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                    {new Date(trip.startDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})} → {new Date(trip.endDate).toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-bold text-gray-900 dark:text-slate-100">{trip.days} Days</p>
                <button className="mt-0.5 text-gray-500 dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
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