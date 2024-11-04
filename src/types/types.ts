export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  dealId: number;
}
export interface Deal {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  numberPhone: string;
  budget: number;
  fullName: string;
  comments: Comment[];
}

export interface DealState {
  deals: Deal[];
  currentDeal: Deal | null;
  loading: boolean;
  error: string | null;
}

export type StatusKey =
  | 'Новый'
  | 'В процессе'
  | 'Почти завершен'
  | 'Успешный'
  | 'Провал';

// Маппинг для статусов
export const statusMap: Record<StatusKey, string> = {
  'Новый': 'NEW',
  'В процессе': 'IN_PROGRESS',
  'Почти завершен': 'ALMOST_FINISHED',
  'Успешный': 'SUCCESSFUL',
  'Провал': 'FAILED',
};
