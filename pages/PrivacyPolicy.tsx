import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { translations } from '../translations';

const PrivacyPolicyScreen: React.FC = () => {
    const navigate = useNavigate();
    const { language } = useApp();
    const t = translations[language];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden transition-colors">
             <header className="sticky top-0 z-10 flex h-auto shrink-0 items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-6 pb-4 pt-14 border-b border-transparent dark:border-white/5 min-h-[88px]">
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">{t.privacyPolicy}</h1>
                </div>
                <div className="h-10 w-10"></div>
            </header>
            <main className="flex-1 px-6 pt-4 pb-28">
                <div className="mb-6 rounded-xl bg-gray-100 dark:bg-[#1A2532] p-6 shadow-sm">
                    <div className="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">1. Data Storage</h3>
                        <p>
                            CanadaCountDown is a local-first application. All your data, including travel history, PR date, and temporary presence records, are stored locally on your device using your browser's LocalStorage API.
                        </p>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">2. Data Collection</h3>
                        <p>
                            We do not collect, transmit, or store any of your personal information on external servers. We do not use cookies for tracking purposes or third-party analytics services.
                        </p>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">3. Data Security</h3>
                        <p>
                            Since your data never leaves your device, it is as secure as your physical device. We recommend keeping your device secure with a passcode or biometric authentication.
                        </p>
                        
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">4. Your Rights</h3>
                        <p>
                            You have full control over your data. You can delete individual records or reset the application at any time, which will permanently erase all data stored by the application on your device.
                        </p>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
};

export default PrivacyPolicyScreen;