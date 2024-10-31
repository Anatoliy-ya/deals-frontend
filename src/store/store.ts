import { configureStore } from '@reduxjs/toolkit';
import { dealReducer } from '../features/deals/dealSlice';

export const store = configureStore({
  reducer: {
    deals: dealReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
