import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, AppContextType, TravelRecord, TempPresenceRecord } from '../types';

const defaultState: AppState = {
  prDate: null,
  darkMode: true,
  travelHistory: [
    { id: '1', country: 'United States', startDate: '2024-01-10', endDate: '2024-01-20', days: 10 },
    { id: '2', country: 'Mexico', startDate: '2023-12-15', endDate: '2023-12-22', days: 7 },
    { id: '3', country: 'United Kingdom', startDate: '2023-11-01', endDate: '2023-11-10', days: 9 },
  ],
  tempPresenceHistory: [
     { id: '1', type: 'Student', permitNumber: 'SP123', startDate: '2022-01-15', endDate: '2023-01-15', days: 365 },
     { id: '2', type: 'Worker', permitNumber: 'WP456', startDate: '2023-02-01', endDate: '2023-08-02', days: 182 },
  ],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prDate, setPrDate] = useState<Date | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [travelHistory, setTravelHistory] = useState<TravelRecord[]>(defaultState.travelHistory);
  const [tempPresenceHistory, setTempPresenceHistory] = useState<TempPresenceRecord[]>(defaultState.tempPresenceHistory);

  useEffect(() => {
    // Apply dark mode class to html element
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const addTravelRecord = (record: TravelRecord) => setTravelHistory(prev => [...prev, record]);
  const addTempPresenceRecord = (record: TempPresenceRecord) => setTempPresenceHistory(prev => [...prev, record]);

  return (
    <AppContext.Provider value={{
      prDate,
      darkMode,
      travelHistory,
      tempPresenceHistory,
      setPrDate,
      toggleDarkMode,
      addTravelRecord,
      addTempPresenceRecord
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
