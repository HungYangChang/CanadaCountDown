import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { translations, Language } from '../translations';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode, language, setLanguage } = useApp();
  const t = translations[language];

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: 'CanadaCountDown',
      text: 'Track your Canadian citizenship eligibility!',
      url: url,
    };

    // Check if navigator.share is supported and URL is valid for sharing (http/https)
    // Some browsers throw "Invalid URL" for non-http protocols
    const canShare = navigator.share && (url.startsWith('http://') || url.startsWith('https://'));

    if (canShare) {
      try {
        await navigator.share(shareData);
        return; 
      } catch (err) {
        console.warn('Share API failed:', err);
        // If user cancelled (AbortError), stop here. Otherwise try fallback.
        if ((err as Error).name === 'AbortError') return;
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      {/* Standardized Header */}
      <div className="sticky top-0 z-10 flex h-auto shrink-0 items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 pb-4 pt-14 border-b border-transparent dark:border-white/5 transition-colors min-h-[88px]">
         <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">{t.settings}</h1>
         <div className="w-10 h-10"></div>
      </div>

      <main className="flex-grow flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">{t.preferences}</h3>
          <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-gray-100/50 dark:bg-white/5 overflow-hidden border border-transparent dark:border-white/5">
            <div className="flex items-center justify-between p-4 bg-gray-100/50 dark:bg-white/5 border-b border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                  <span className="material-symbols-outlined">dark_mode</span>
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-white">{t.darkMode}</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input checked={darkMode} onChange={toggleDarkMode} className="sr-only peer" type="checkbox" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            
            {/* Language Dropdown */}
            <div className="flex items-center justify-between p-4 w-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                  <span className="material-symbols-outlined">translate</span>
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-white">{t.language}</span>
              </div>
              
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="appearance-none bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm font-medium rounded-lg focus:ring-primary focus:border-primary block w-full pl-3 pr-8 py-2 cursor-pointer outline-none hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="zh_TW">繁體中文</option>
                  <option value="zh_CN">简体中文</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                   <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">{t.support}</h3>
          <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-gray-100/50 dark:bg-white/5 overflow-hidden border border-transparent dark:border-white/5">
            <button 
              onClick={() => navigate('/help')}
              className="flex items-center justify-between p-4 w-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors border-b border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <span className="material-symbols-outlined">help</span>
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-white">{t.helpCenter}</span>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center justify-between p-4 w-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                  <span className="material-symbols-outlined">ios_share</span>
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-white">{t.shareApp}</span>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">{t.about}</h3>
          <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-gray-100/50 dark:bg-white/5 overflow-hidden border border-transparent dark:border-white/5">
            <button 
              onClick={() => navigate('/about')}
              className="flex items-center justify-between p-4 w-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors border-b border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary">
                  <span className="material-symbols-outlined">info</span>
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-white">{t.aboutApp}</span>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </button>
            <button 
              onClick={() => navigate('/privacy')}
              className="flex items-center justify-between p-4 w-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-white">{t.privacyPolicy}</span>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="py-3 pb-24">
          <p className="text-center text-xs text-gray-400 mt-4">App Version 1.0.3</p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default SettingsScreen;