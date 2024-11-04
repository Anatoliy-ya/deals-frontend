import { RootState } from '../../store/store';

import { createSelector } from '@reduxjs/toolkit';

const selectDeals = (state: RootState) => state.deals;

export const selectCompletedDeals = createSelector([selectDeals], (deals) =>
  deals.deals.filter(
    (deal) => deal.status === 'Успешно' || deal.status === 'Провал'
  )
);
