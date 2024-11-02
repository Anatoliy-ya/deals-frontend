import { configureStore } from '@reduxjs/toolkit';
import { dealReducer } from '../features/deals/dealSlice';
import { uiReducer } from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    deals: dealReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
