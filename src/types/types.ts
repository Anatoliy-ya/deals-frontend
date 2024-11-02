export interface Deal {
  id: number;
  title: string;
  status: string;
  createdAt: string;
}

export interface DealState {
  deals: Deal[];
  currentDeal: Deal | null;
  loading: boolean;
  error: string | null;
}
