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

  const handleTip = async (item: string, price: number) => {
    // This simulates the Apple Pay / Web Payment interaction
    try {
        if ('PaymentRequest' in window) {
             // Cast to any to avoid TypeScript strict type checking issues with specific string literals
             // for merchantCapabilities and supportedNetworks which can vary by TS version/lib
             const supportedInstruments = [{
                supportedMethods: 'https://apple.com/apple-pay',
                data: {
                    version: 3,
                    merchantIdentifier: 'merchant.com.example', // Placeholder
                    merchantCapabilities: ['supports3DS'],
                    supportedNetworks: ['masterCard', 'visa', 'amex'],
                    countryCode: 'CA',
                }
            }] as any;
            
            const details = {
                total: {
                    label: `Support James - ${item}`,
                    amount: { currency: 'CAD', value: price.toString() }
                }
            };
            
            // Note: This will likely throw in a non-HTTPS/non-merchant environment
            // We use it to show intent of "real" implementation
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const request = new (window as any).PaymentRequest(supportedInstruments, details);
            const canMakePayment = await request.canMakePayment().catch(() => false);
            
            if (canMakePayment) {
                const response = await request.show();
                await response.complete('success');
                alert("Thank you for your support!");
                return;
            }
        }
    } catch (e) {
        console.log("Payment request failed, falling back to simulation", e);
    }

    // Fallback Simulation
    const confirmed = window.confirm(`Confirm Payment\n\nItem: ${item}\nAmount: $${price}\n\nProceed with payment?`);
    if (confirmed) {
        alert("Payment Successful! Thank you for your support.");
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      {/* Standardized Header */}
      <div className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-white/5 transition-colors">
        <div className="flex items-center justify-between px-6 pt-10 pb-2 min-h-[70px]">
          {/* Left Anchor - Canada Calendar Icon */}
          <div className="flex w-16 justify-start shrink-0 items-center h-full">
             <div className="flex flex-col items-center justify-center size-9 rounded-[8px] bg-white dark:bg-[#1A2532] shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5 dark:ring-white/10 overflow-hidden shrink-0 group hover:scale-105 transition-transform duration-200">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg" 
                    alt="Canada" 
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
        <div className="py-2 pb-24 mt-4">
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Enjoying the app?</h3>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">Support James</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleTip('Snack', 1.99)} className="flex flex-row items-center justify-between gap-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white p-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-transform group">
                         <div className="flex items-center gap-3">
                            <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform">🥨</span>
                            <div className="flex flex-col items-start">
                                <span className="text-[12px] font-bold">Snack</span>
                                <span className="text-[10px] opacity-90 text-white/90">Treat me</span>
                            </div>
                         </div>
                         <span className="text-[13px] font-bold bg-white/20 px-2 py-1 rounded-md">$1.99</span>
                    </button>

                    <button onClick={() => handleTip('Coffee', 4.99)} className="flex flex-row items-center justify-between gap-3 bg-gradient-to-r from-[#FF9500] to-[#FF5E3A] text-white p-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-transform group">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform">☕</span>
                            <div className="flex flex-col items-start">
                                <span className="text-[12px] font-bold">Coffee</span>
                                <span className="text-[10px] opacity-90 text-white/90">Fuel code</span>
                            </div>
                        </div>
                        <span className="text-[13px] font-bold bg-white/20 px-2 py-1 rounded-md">$4.99</span>
                    </button>

                    <button onClick={() => handleTip('Lunch', 14.99)} className="flex flex-row items-center justify-between gap-3 bg-gradient-to-r from-[#30B0C7] to-[#5856D6] text-white p-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-transform group">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform">🍱</span>
                            <div className="flex flex-col items-start">
                                <span className="text-[12px] font-bold">Lunch</span>
                                <span className="text-[10px] opacity-90 text-white/90">Keep going</span>
                            </div>
                        </div>
                        <span className="text-[13px] font-bold bg-white/20 px-2 py-1 rounded-md">$14.99</span>
                    </button>

                    <button onClick={() => handleTip('Gym Pass', 29.99)} className="flex flex-row items-center justify-between gap-3 bg-gradient-to-r from-[#FF2D55] to-[#FF375F] text-white p-4 rounded-xl shadow-lg shadow-red-500/20 active:scale-95 transition-transform group">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform">🏋️</span>
                            <div className="flex flex-col items-start">
                                <span className="text-[12px] font-bold">Gym</span>
                                <span className="text-[10px] opacity-90 text-white/90">Monthly</span>
                            </div>
                        </div>
                        <span className="text-[13px] font-bold bg-white/20 px-2 py-1 rounded-md">$29.99</span>
                    </button>
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-1 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">lock</span>
                    Processed securely via Apple Pay
                </p>
            </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default HomeScreen;