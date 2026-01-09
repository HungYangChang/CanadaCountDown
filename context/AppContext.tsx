import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType, TravelRecord, TempPresenceRecord } from '../types';
import { Language } from '../translations';

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PR_DATE: 'ccd_pr_date',
  DARK_MODE: 'ccd_dark_mode',
  LANGUAGE: 'ccd_language',
  TRAVEL_HISTORY: 'ccd_travel_history',
  TEMP_PRESENCE: 'ccd_temp_presence',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Initialize State from LocalStorage (Lazy Initialization)
  
  const [prDate, setPrDate] = useState<Date | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PR_DATE);
      return saved ? new Date(saved) : null;
    } catch (e) {
      console.error("Failed to parse PR date", e);
      return null;
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
      return saved ? JSON.parse(saved) : true; // Default to true
    } catch (e) {
      return true;
    }
  });

  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      return (saved as Language) || 'en';
    } catch (e) {
      return 'en';
    }
  });

  const [travelHistory, setTravelHistory] = useState<TravelRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRAVEL_HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  
  const [tempPresenceHistory, setTempPresenceHistory] = useState<TempPresenceRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEMP_PRESENCE);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // 2. Effects to Save to LocalStorage whenever state changes

  useEffect(() => {
    if (prDate) {
      localStorage.setItem(STORAGE_KEYS.PR_DATE, prDate.toISOString());
    } else {
      localStorage.removeItem(STORAGE_KEYS.PR_DATE);
    }
  }, [prDate]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(darkMode));
    // Apply dark mode class to html element
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRAVEL_HISTORY, JSON.stringify(travelHistory));
  }, [travelHistory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEMP_PRESENCE, JSON.stringify(tempPresenceHistory));
  }, [tempPresenceHistory]);


  // 3. Actions

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  
  const addTravelRecord = (record: TravelRecord) => setTravelHistory(prev => [...prev, record]);
  
  const updateTravelRecord = (updatedRecord: TravelRecord) => {
    setTravelHistory(prev => prev.map(r => r.id === updatedRecord.id ? updatedRecord : r));
  };

  const deleteTravelRecord = (id: string) => {
    setTravelHistory(prev => prev.filter(r => r.id !== id));
  };

  const addTempPresenceRecord = (record: TempPresenceRecord) => setTempPresenceHistory(prev => [...prev, record]);
  
  const updateTempPresenceRecord = (updatedRecord: TempPresenceRecord) => {
    setTempPresenceHistory(prev => prev.map(r => r.id === updatedRecord.id ? updatedRecord : r));
  };

  const deleteTempPresenceRecord = (id: string) => {
    setTempPresenceHistory(prev => prev.filter(r => r.id !== id));
  };

  return (
    <AppContext.Provider value={{
      prDate,
      darkMode,
      language,
      travelHistory,
      tempPresenceHistory,
      setPrDate,
      toggleDarkMode,
      setLanguage,
      addTravelRecord,
      updateTravelRecord,
      deleteTravelRecord,
      addTempPresenceRecord,
      updateTempPresenceRecord,
      deleteTempPresenceRecord
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