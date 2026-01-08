import React from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { translations } from '../translations';

const AboutScreen: React.FC = () => {
    const { language } = useApp();
    const t = translations[language];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden transition-colors">
            <header className="sticky top-0 z-10 flex h-auto shrink-0 items-center justify-between bg-background-light dark:bg-background-dark px-6 pb-2 pt-12">
                <div className="flex items-center gap-2">
                    <Link to="/settings" className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">{t.aboutApp}</h1>
                </div>
                <div className="h-10 w-10"></div>
            </header>
            <main className="flex-1 px-6 pt-4 pb-28">
                <div className="mb-6 rounded-xl bg-gray-100 dark:bg-card-dark p-5 shadow-sm">
                    <div className="flex flex-col gap-4 text-gray-700 dark:text-slate-300 text-sm leading-relaxed">
                        <p>
                            {t.aboutText}
                        </p>
                        <p className="text-gray-500 dark:text-slate-400 italic text-xs">
                            {t.aboutNote}
                        </p>
                    </div>
                </div>
                <div className="rounded-xl bg-gray-100 dark:bg-card-dark p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t.features}</h2>
                    <ul className="flex flex-col gap-3">
                        <li className="flex gap-3 items-start">
                            <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
                            <span className="text-gray-700 dark:text-slate-300 text-sm">Physical presence record management</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="material-symbols-outlined text-primary text-xl mt-0.5">calendar_month</span>
                            <span className="text-gray-700 dark:text-slate-300 text-sm">Earliest eligibility for citizenship application</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="material-symbols-outlined text-primary text-xl mt-0.5">query_stats</span>
                            <span className="text-gray-700 dark:text-slate-300 text-sm">Statistics on presence records</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="material-symbols-outlined text-primary text-xl mt-0.5">widgets</span>
                            <span className="text-gray-700 dark:text-slate-300 text-sm">Countdown widget</span>
                        </li>
                    </ul>
                </div>
            </main>
            <BottomNav />
        </div>
    );
};

export default AboutScreen;