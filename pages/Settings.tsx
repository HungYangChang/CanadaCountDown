import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useApp();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <div className="flex flex-col gap-2 bg-background-light dark:bg-background-dark p-4 pb-2 sticky top-0 z-10 transition-colors">
        <div className="flex items-center h-12 justify-between">
          <div className="flex size-12 shrink-0 items-center text-gray-800 dark:text-white">
            <span className="material-symbols-outlined !text-3xl text-primary">energy_savings_leaf</span>
          </div>
        </div>
        <p className="text-gray-900 dark:text-white tracking-light text-[28px] font-bold leading-tight">Settings</p>
      </div>
      <main className="flex-grow flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Preferences</h3>
          <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-gray-100/50 dark:bg-white/5 overflow-hidden border border-transparent dark:border-white/5">
            <div className="flex items-center justify-between p-4 bg-gray-100/50 dark:bg-white/5 border-b border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                  <span className="material-symbols-outlined">dark_mode</span>
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-white">Dark Mode</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input checked={darkMode} onChange={toggleDarkMode} className="sr-only peer" type="checkbox" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            <button className="flex items-center justify-between p-4 w-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                  <span className="material-symbols-outlined">translate</span>
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-white">Language</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">English</span>
                <span className="material-symbols-outlined text-gray-400">chevron_right</span>
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Support</h3>
          <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-gray-100/50 dark:bg-white/5 overflow-hidden border border-transparent dark:border-white/5">
            <button className="flex items-center justify-between p-4 w-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors border-b border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <span className="material-symbols-outlined">help</span>
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-white">Help Center</span>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </button>
            <button className="flex items-center justify-between p-4 w-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                  <span className="material-symbols-outlined">ios_share</span>
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-white">Share App</span>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">About</h3>
          <div className="flex flex-col items-stretch justify-start rounded-xl shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-gray-100/50 dark:bg-white/5 overflow-hidden border border-transparent dark:border-white/5">
            <button 
              onClick={() => navigate('/about')}
              className="flex items-center justify-between p-4 w-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors border-b border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary">
                  <span className="material-symbols-outlined">info</span>
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-white">About App</span>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </button>
            <button className="flex items-center justify-between p-4 w-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <span className="text-base font-medium text-gray-900 dark:text-white">Privacy Policy</span>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="py-3 pb-24">
          <p className="text-center text-xs text-gray-400 mt-4">App Version 1.0.2</p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default SettingsScreen;
