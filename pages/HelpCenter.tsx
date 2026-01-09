import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { translations } from '../translations';

const HelpCenterScreen: React.FC = () => {
    const navigate = useNavigate();
    const { language } = useApp();
    const t = translations[language];

    const faqs = [
        {
            q: "How is physical presence calculated?",
            a: "Your physical presence is calculated based on the last 5 years from today (or from your estimated eligibility date). Each day physically present in Canada as a PR counts as 1 day. Time spent as a temporary resident before becoming a PR counts as 0.5 days, up to a maximum of 365 days."
        },
        {
            q: "What counts as a temporary resident?",
            a: "Temporary resident status includes time spent in Canada as a visitor, student, worker, or temporary resident permit holder. Time spent as a refugee claimant may also count under specific conditions."
        },
        {
            q: "How do I calculate travel days?",
            a: "When adding a trip, exclude the day you left Canada and the day you returned. These days count as days present in Canada. The app automatically calculates the days absent between these two dates."
        },
        {
            q: "Is this app official?",
            a: "No, CanadaCountDown is a third-party tool designed to help you track your days. Always verify your official eligibility using the IRCC Physical Presence Calculator before applying."
        }
    ];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden transition-colors">
             <header className="sticky top-0 z-10 flex h-auto shrink-0 items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-6 pb-4 pt-[calc(env(safe-area-inset-top)+32px)] border-b border-transparent dark:border-white/5 min-h-[88px]">
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">{t.helpCenter}</h1>
                </div>
                <div className="h-10 w-10"></div>
            </header>
            <main className="flex-1 px-6 pt-4 pb-28">
                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="rounded-xl bg-gray-100 dark:bg-[#1A2532] p-5 shadow-sm">
                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                    
                    <div className="mt-4 p-5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Still have questions?</p>
                        <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer" className="text-primary font-bold text-sm mt-1 inline-block">Visit Official IRCC Website</a>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
};

export default HelpCenterScreen;