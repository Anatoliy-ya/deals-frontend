import { RootState } from '../../store/store';

export const selectCompletedDeals = (state: RootState) =>
  state.deals.deals.filter((deal) => deal.status === 'SUCCESSFUL' || deal.status === 'FAILED');
