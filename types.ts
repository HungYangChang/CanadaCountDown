import { Language } from './translations';

export interface TravelRecord {
  id: string;
  country: string;
  startDate: string;
  endDate: string;
  days: number;
}

export interface TempPresenceRecord {
  id: string;
  type: 'Student' | 'Worker' | 'Visitor' | 'Claimant';
  permitNumber?: string;
  startDate: string;
  endDate: string;
  notes?: string;
  days: number; // calculated duration
}

export interface AppState {
  prDate: Date | null;
  darkMode: boolean;
  language: Language;
  travelHistory: TravelRecord[];
  tempPresenceHistory: TempPresenceRecord[];
  includeFutureTravel: boolean;
}

export interface AppContextType extends AppState {
  setPrDate: (date: Date | null) => void;
  toggleDarkMode: () => void;
  setLanguage: (lang: Language) => void;
  addTravelRecord: (record: TravelRecord) => void;
  updateTravelRecord: (record: TravelRecord) => void;
  deleteTravelRecord: (id: string) => void;
  addTempPresenceRecord: (record: TempPresenceRecord) => void;
  updateTempPresenceRecord: (record: TempPresenceRecord) => void;
  deleteTempPresenceRecord: (id: string) => void;
  toggleFutureTravel: () => void;
}