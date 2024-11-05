import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDeals = async () => {
  const response = await apiClient.get('/deals');
  return response.data;
};

export const fetchDealById = async (id: number) => {
  const response = await apiClient.get(`/deals/${id}`);
  return response.data;
};

export const createDeal = async (deal: {
  title: string;
  status: string;
  createdAt: Date;
}) => {
  const response = await apiClient.post('/deals', deal);
  return response.data;
};

export const updateDeal = async (
  id: number,
  deal: {
    title: string;
    status: string;
    createdAt: Date;
    numberPhone: string;
    budget: number;
    fullName: string;
  }
) => {
  const response = await apiClient.put(`/deals/${id}`, deal, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });
  return response.data;
};

export const deleteDeal = async (id: number) => {
  const response = await apiClient.delete(`/deals/${id}`);
  return response.data;
};

export const addComment = async (dealId: number, content: string) => {
  const response = await apiClient.post(`/deals/${dealId}/comments`, {
    content,
  });
  return response.data;
};

export const fetchCommentsByDealId = async (dealId: number) => {
  const response = await apiClient.get(`/deals/${dealId}/comments`);
  return response.data;
};
