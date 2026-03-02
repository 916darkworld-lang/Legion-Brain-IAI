import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  isPro: boolean;
  autoMode: boolean;
  maxWindows: number;
  selectedAIs: string[];
  theme: 'dark' | 'light';
}

const initialState: SettingsState = {
  isPro: false,
  autoMode: false,
  maxWindows: 3,
  selectedAIs: [],
  theme: 'dark',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setProStatus(state, action: PayloadAction<boolean>) {
      state.isPro = action.payload;
      state.maxWindows = action.payload ? 8 : 3;
    },
    setAutoMode(state, action: PayloadAction<boolean>) {
      state.autoMode = action.payload;
    },
    setMaxWindows(state, action: PayloadAction<number>) {
      state.maxWindows = Math.min(action.payload, state.isPro ? 8 : 3);
    },
    setSelectedAIs(state, action: PayloadAction<string[]>) {
      state.selectedAIs = action.payload.slice(0, state.maxWindows);
    },
  },
});

export const { setProStatus, setAutoMode, setMaxWindows, setSelectedAIs } = settingsSlice.actions;
export default settingsSlice.reducer;
