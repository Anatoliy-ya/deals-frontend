// src/features/deals/dealSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Deal } from '../../types/types';

interface DealState {
  deals: Deal[];
}

const initialState: DealState = {
  deals: [],
};

const dealSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setDeals(state, action: PayloadAction<Deal[]>) {
      state.deals = action.payload;
    },
  },
});

export const { setDeals } = dealSlice.actions;
export const dealReducer = dealSlice.reducer;
