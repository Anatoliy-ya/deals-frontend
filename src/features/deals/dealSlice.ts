import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchDeals,
  fetchDealById,
  createDeal,
  updateDeal,
  deleteDeal,
  addComment,
  fetchCommentsByDealId,
} from '../../api/dealsApi';
import { Deal, DealState, Comment } from '../../types/types';

const initialState: DealState = {
  deals: [],
  currentDeal: null,
  loading: false,
  error: null,
};

// Async thunks для API-запросов
export const getDeals = createAsyncThunk('deals/getDeals', async () => {
  return await fetchDeals();
});

export const getDealById = createAsyncThunk(
  'deals/getDealById',
  async (id: number) => {
    return await fetchDealById(id);
  }
);

export const addDeal = createAsyncThunk(
  'deals/addDeal',
  async (deal: {
    title: string;
    status: string;
    createdAt: Date;
    numberPhone: string;
    budget: number;
    fullName: string;
  }) => {
    return await createDeal(deal);
  }
);

export const editDeal = createAsyncThunk(
  'deals/editDeal',
  async ({
    id,
    deal,
  }: {
    id: number;
    deal: {
      title: string;
      status: string;
      createdAt: Date;
      numberPhone: string;
      budget: number;
      fullName: string;
    };
  }) => {
    return await updateDeal(id, deal);
  }
);

export const removeDeal = createAsyncThunk(
  'deals/removeDeal',
  async (id: number) => {
    return await deleteDeal(id);
  }
);

export const addCommentToDeal = createAsyncThunk(
  'deals/addComment',
  async ({ dealId, content }: { dealId: number; content: string }) => {
    console.log('addCommentToDeal', dealId, content);
    return await addComment(dealId, content);
  }
);

export const getCommentsByDealId = createAsyncThunk(
  'deals/getCommentsByDealId',
  async (dealId: number) => {
    return await fetchCommentsByDealId(dealId);
  }
);

const dealSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    clearCurrentDeal: (state) => {
      state.currentDeal = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDeals.fulfilled, (state, action: PayloadAction<Deal[]>) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(getDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch deals';
      })
      .addCase(getDealById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDealById.fulfilled, (state, action: PayloadAction<Deal>) => {
        state.loading = false;
        state.currentDeal = action.payload;
      })
      .addCase(getDealById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch deal';
      })
      .addCase(addDeal.fulfilled, (state, action: PayloadAction<Deal>) => {
        const exists = state.deals.some(
          (deal) => deal.id === action.payload.id
        );
        if (!exists) {
          state.deals.push(action.payload);
        }
      })
      .addCase(editDeal.fulfilled, (state, action: PayloadAction<Deal>) => {
        const index = state.deals.findIndex(
          (deal) => deal.id === action.payload.id
        );
        if (index !== -1) state.deals[index] = action.payload;
      })
      .addCase(removeDeal.fulfilled, (state, action: PayloadAction<number>) => {
        state.deals = state.deals.filter((deal) => deal.id !== action.payload);
      })
      .addCase(
        addCommentToDeal.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          if (state.currentDeal) {
            state.currentDeal.comments.push(action.payload);
          }
        }
      )
      .addCase(
        getCommentsByDealId.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          if (state.currentDeal) {
            state.currentDeal.comments = action.payload;
          }
        }
      );
  },
});

export const dealReducer = dealSlice.reducer;
