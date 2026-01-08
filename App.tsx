import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import HomeScreen from './pages/Home';
import SettingsScreen from './pages/Settings';
import AboutScreen from './pages/About';
import TravelHistoryScreen from './pages/TravelHistory';
import PrDayInputScreen from './pages/PrDayInput';
import TempPresenceHistoryScreen from './pages/TempPresenceHistory';
import TempPresenceEntryScreen from './pages/TempPresenceEntry';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/travel-history" element={<TravelHistoryScreen />} />
          <Route path="/pr-day-input" element={<PrDayInputScreen />} />
          <Route path="/temporary-presence-history" element={<TempPresenceHistoryScreen />} />
          <Route path="/temporary-presence-entry" element={<TempPresenceEntryScreen />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
