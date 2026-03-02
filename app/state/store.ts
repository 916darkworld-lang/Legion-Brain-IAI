import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import projectsReducer from './slices/projectsSlice';
import settingsReducer from './slices/settingsSlice';
import windowsReducer from './slices/windowsSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    projects: projectsReducer,
    settings: settingsReducer,
    windows: windowsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
