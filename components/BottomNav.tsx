import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sticky bottom-0 z-20 w-full border-t border-gray-200/80 bg-background-light/95 dark:border-white/5 dark:bg-background-dark/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background-light/80">
      <div className="grid grid-cols-3 px-2 pb-safe-bottom pt-2">
        <Link to="/" className={`flex flex-col items-center justify-center gap-1 group pb-5 pt-1`}>
          <div className={`flex h-8 w-16 items-center justify-center rounded-full transition-colors ${isActive('/') ? 'bg-primary/20 dark:bg-blue-900/50 text-primary dark:text-blue-200' : 'text-gray-500 dark:text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-white/5'}`}>
            <span className={`material-symbols-outlined !text-2xl ${isActive('/') ? 'fill' : ''}`}>home</span>
          </div>
          <p className={`text-[10px] font-medium transition-colors ${isActive('/') ? 'text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>Home</p>
        </Link>
        
        <Link to="/travel-history" className={`flex flex-col items-center justify-center gap-1 group pb-5 pt-1`}>
          <div className={`flex h-8 w-16 items-center justify-center rounded-full transition-colors ${isActive('/travel-history') ? 'bg-primary/20 dark:bg-blue-900/50 text-primary dark:text-blue-200' : 'text-gray-500 dark:text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-white/5'}`}>
            <span className={`material-symbols-outlined !text-2xl ${isActive('/travel-history') ? 'fill' : ''}`}>flight_takeoff</span>
          </div>
          <p className={`text-[10px] font-medium transition-colors ${isActive('/travel-history') ? 'text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>Travel</p>
        </Link>

        <Link to="/settings" className={`flex flex-col items-center justify-center gap-1 group pb-5 pt-1`}>
          <div className={`flex h-8 w-16 items-center justify-center rounded-full transition-colors ${isActive('/settings') ? 'bg-primary/20 dark:bg-blue-900/50 text-primary dark:text-blue-200' : 'text-gray-500 dark:text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-white/5'}`}>
            <span className={`material-symbols-outlined !text-2xl ${isActive('/settings') ? 'fill' : ''}`}>settings</span>
          </div>
          <p className={`text-[10px] font-medium transition-colors ${isActive('/settings') ? 'text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>Settings</p>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
