import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDeals = async () => {
  const response = await apiClient.get('/deals');
  console.log(response.data);
  return response.data;
};

export const fetchDealById = async (id: number) => {
  const response = await apiClient.get(`/deals/${id}`);
  console.log(response.data);
  return response.data;
};

export const createDeal = async (deal: {
  title: string;
  status: string;
  createdAt: Date;
}) => {
  const response = await apiClient.post('/deals', deal);
  console.log('createDeal', response.data);
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
  console.log('Data before sending to API:', deal);
  const response = await apiClient.put(`/deals/${id}`, deal, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });
  console.log('updateDeal', response.data);
  return response.data;
};

export const deleteDeal = async (id: number) => {
  const response = await apiClient.delete(`/deals/${id}`);
  console.log(response.data);
  return response.data;
};

export const addComment = async (dealId: number, content: string) => {
  const response = await apiClient.post(`/deals/${dealId}/comments`, {
    content,
  });
  console.log('addComment', response.data);
  return response.data;
};

export const fetchCommentsByDealId = async (dealId: number) => {
  const response = await apiClient.get(`/deals/${dealId}/comments`);
  console.log(response.data);
  return response.data;
};
