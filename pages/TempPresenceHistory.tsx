import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

const TempPresenceHistoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { tempPresenceHistory } = useApp();

  let totalCredit = 0;
  tempPresenceHistory.forEach(r => totalCredit += Math.floor(r.days * 0.5));
  totalCredit = Math.min(totalCredit, 365); // Cap at 365

  const getIcon = (type: string) => {
    switch(type) {
        case 'Student': return 'school';
        case 'Worker': return 'work';
        case 'Visitor': return 'flight';
        case 'Claimant': return 'gavel';
        default: return 'help';
    }
  }

  const getColor = (type: string) => {
    switch(type) {
        case 'Student': return 'blue';
        case 'Worker': return 'purple';
        case 'Visitor': return 'orange';
        case 'Claimant': return 'red';
        default: return 'gray';
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display antialiased text-[#111418] dark:text-white overflow-x-hidden relative transition-colors">
      <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-[#e5e7eb] dark:border-[#293038] px-4 h-14 flex items-center justify-between transition-colors">
        <button 
          onClick={() => navigate('/')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors -ml-2 text-[#111418] dark:text-white">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-[#111418] dark:text-white text-[17px] font-bold leading-tight absolute left-1/2 -translate-x-1/2 w-max">Temporary Presence</h1>
        <button 
          onClick={() => navigate('/temporary-presence-entry')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors -mr-2 text-primary">
          <span className="material-symbols-outlined text-[28px]">add</span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="p-5">
          <div className="bg-gradient-to-br from-primary to-[#0f6ecd] rounded-2xl p-6 text-white shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Total Physical Presence Credit</p>
              <div className="flex items-baseline gap-2 mb-4">
                <h2 className="text-4xl font-bold">{totalCredit}</h2>
                <span className="text-lg font-medium opacity-80">Days</span>
              </div>
              <div className="flex items-start gap-2 text-xs bg-white/10 w-full p-3 rounded-lg backdrop-blur-sm border border-white/10">
                <span className="material-symbols-outlined text-[16px] shrink-0">info</span>
                <span className="leading-relaxed">Credit is calculated at 50% for each day of temporary presence, up to a maximum of 365 days. (Floored)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 pb-3 flex items-center justify-between">
          <h3 className="text-[#111418] dark:text-white text-lg font-bold">Recorded Entries</h3>
          <div className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
            <span>{tempPresenceHistory.length} Records</span>
          </div>
        </div>
        <div className="px-5 space-y-4">
          {tempPresenceHistory.map((item) => {
             const color = getColor(item.type);
             // Classes map
             const colorClasses = {
                 blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30',
                 purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/30',
                 orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900/30',
                 red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30',
                 gray: 'bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-900/30'
             }[color];

             const creditDays = Math.floor(item.days * 0.5);

             return (
                <div 
                  key={item.id} 
                  onClick={() => navigate(`/temporary-presence-entry/${item.id}`)}
                  className="group bg-white dark:bg-[#1c2127] rounded-xl p-4 border border-gray-100 dark:border-[#293038] shadow-sm flex flex-col gap-4 active:scale-[0.99] transition-all cursor-pointer hover:border-primary/30 relative overflow-hidden">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${colorClasses}`}>
                                <span className="material-symbols-outlined text-[24px]">{getIcon(item.type)}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#111418] dark:text-white text-[16px]">{item.type} Permit</h4>
                                <p className="text-xs text-[#6b7280] dark:text-[#9dabb9] uppercase tracking-wide font-semibold mt-0.5">{item.permitNumber || 'NO ID'}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-primary font-bold text-base">+{creditDays} Days</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#6b7280] dark:text-[#586370] mt-0.5">CREDIT</span>
                        </div>
                    </div>
                    
                    <div className="h-px bg-gray-100 dark:bg-[#293038] w-full"></div>
                    
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[#6b7280] dark:text-[#9dabb9]">
                            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                            <span className="text-sm font-medium">
                                {new Date(item.startDate).toISOString().slice(0, 10)} - {new Date(item.endDate).toISOString().slice(0, 10)}
                            </span>
                        </div>
                        <div className="px-3 py-1 rounded-lg border border-gray-200 dark:border-[#3b4754] bg-gray-50 dark:bg-[#252b32]">
                             <span className="text-[#111418] dark:text-white font-bold text-xs">{item.days} Days</span>
                        </div>
                    </div>
                </div>
             )
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default TempPresenceHistoryScreen;
