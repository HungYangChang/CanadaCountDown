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
  days: number; // calculated duration
}

export interface AppState {
  prDate: Date | null;
  darkMode: boolean;
  travelHistory: TravelRecord[];
  tempPresenceHistory: TempPresenceRecord[];
}

export interface AppContextType extends AppState {
  setPrDate: (date: Date | null) => void;
  toggleDarkMode: () => void;
  addTravelRecord: (record: TravelRecord) => void;
  addTempPresenceRecord: (record: TempPresenceRecord) => void;
}
