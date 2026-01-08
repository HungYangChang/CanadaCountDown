import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const TempPresenceEntryScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display antialiased text-[#111418] dark:text-white overflow-x-hidden relative transition-colors">
      <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-[#e5e7eb] dark:border-[#293038] px-4 h-14 flex items-center justify-between transition-colors">
        <button 
          onClick={() => navigate(-1)}
          className="text-primary/80 dark:text-[#9dabb9] text-base font-medium leading-normal hover:opacity-70 transition-opacity">Cancel</button>
        <h1 className="text-[#111418] dark:text-white text-[17px] font-bold leading-tight absolute left-1/2 -translate-x-1/2 w-max">Temporary Presence</h1>
        <button 
          onClick={() => navigate('/temporary-presence-history')}
          className="text-primary text-base font-bold leading-normal hover:opacity-80 transition-opacity">Save</button>
      </div>
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-5 pt-6 pb-2">
          <h2 className="text-[#111418] dark:text-white text-2xl font-bold leading-tight tracking-tight">Add Status</h2>
          <p className="text-[#6b7280] dark:text-[#9dabb9] text-sm mt-1">Record your temporary status in Canada.</p>
        </div>
        <div className="mt-4">
          <div className="px-5 pb-3">
            <h3 className="text-[#111418] dark:text-white text-sm font-bold uppercase tracking-wide opacity-80">Timeframe</h3>
          </div>
          <div className="bg-white dark:bg-[#1c2127] border-y border-[#e5e7eb] dark:border-[#293038] px-5 py-4 sm:rounded-xl sm:border sm:mx-5 sm:px-4 flex flex-col gap-4">
            <div className="relative group">
              <label className="block text-[#6b7280] dark:text-[#9dabb9] text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Start Date</label>
              <div className="relative">
                <input type="date" className="appearance-none block w-full rounded-xl border-gray-200 dark:border-[#3b4754] bg-[#f9fafb] dark:bg-[#101922] text-[#111418] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent h-12 pl-4 pr-10 text-base font-medium shadow-sm transition-all cursor-pointer" />
              </div>
            </div>
            <div className="relative group">
              <label className="block text-[#6b7280] dark:text-[#9dabb9] text-xs font-semibold uppercase tracking-wider mb-2 ml-1">End Date</label>
              <div className="relative">
                <input type="date" className="appearance-none block w-full rounded-xl border-gray-200 dark:border-[#3b4754] bg-[#f9fafb] dark:bg-[#101922] text-[#111418] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent h-12 pl-4 pr-10 text-base font-medium shadow-sm transition-all cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="px-5 mt-4">
            <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-4 flex items-start gap-3 border border-primary/10 dark:border-primary/5">
              <div className="bg-primary/20 rounded-full p-1 shrink-0">
                <span className="material-symbols-outlined text-primary text-[20px] block">calculate</span>
              </div>
              <div className="flex flex-col">
                <p className="text-[#111418] dark:text-white text-sm font-bold">0 Days Duration</p>
                <p className="text-[#4e7397] dark:text-[#aabacf] text-xs font-medium leading-relaxed mt-0.5">
                  This period counts for 0.5 days per day towards citizenship. <br/>
                  <span className="text-primary font-bold">Total Credit: 0 days</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-6"></div>
        <div className="mt-2">
          <div className="px-5 pb-3">
            <h3 className="text-[#111418] dark:text-white text-sm font-bold uppercase tracking-wide opacity-80">Details</h3>
          </div>
          <div className="px-5 flex flex-col gap-6">
            <div className="flex flex-col">
              <span className="text-[#6b7280] dark:text-[#9dabb9] text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Purpose of Stay</span>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <button className="relative flex flex-col items-center justify-center p-3 bg-primary text-white rounded-xl border-2 border-primary shadow-md transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[24px] mb-1">school</span>
                  <span className="text-xs font-bold">Student</span>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-white dark:bg-[#1c2127] text-[#6b7280] dark:text-[#9dabb9] rounded-xl border border-gray-200 dark:border-[#3b4754] hover:bg-gray-50 dark:hover:bg-[#252b32] hover:border-primary/50 dark:hover:border-primary/50 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[24px] mb-1">work</span>
                  <span className="text-xs font-medium">Worker</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-white dark:bg-[#1c2127] text-[#6b7280] dark:text-[#9dabb9] rounded-xl border border-gray-200 dark:border-[#3b4754] hover:bg-gray-50 dark:hover:bg-[#252b32] hover:border-primary/50 dark:hover:border-primary/50 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[24px] mb-1">flight</span>
                  <span className="text-xs font-medium">Visitor</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-white dark:bg-[#1c2127] text-[#6b7280] dark:text-[#9dabb9] rounded-xl border border-gray-200 dark:border-[#3b4754] hover:bg-gray-50 dark:hover:bg-[#252b32] hover:border-primary/50 dark:hover:border-primary/50 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[24px] mb-1">gavel</span>
                  <span className="text-xs font-medium">Claimant</span>
                </button>
              </div>
            </div>
            <label className="flex flex-col">
              <span className="text-[#6b7280] dark:text-[#9dabb9] text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Notes &amp; Permit Details</span>
              <textarea className="form-textarea w-full rounded-xl border-gray-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127] text-[#111418] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent min-h-[140px] p-4 text-base font-normal leading-relaxed placeholder:text-gray-400 dark:placeholder:text-[#586370] resize-none shadow-sm" placeholder="Enter permit number (e.g., SP12345678) or description of stay..."></textarea>
            </label>
          </div>
        </div>
        <div className="px-5 mt-10 mb-6">
          <button className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold text-base hover:bg-red-100 dark:hover:bg-red-900/20 active:scale-[0.98] transition-all">
            <span className="material-symbols-outlined text-[20px]">delete</span>
            Delete Entry
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default TempPresenceEntryScreen;
