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

export const createDeal = async (deal: { title: string; status: string }) => {
  const response = await apiClient.post('/deals', deal);
  console.log(response.data);
  return response.data;
};

export const updateDeal = async (id: number, deal: { title: string; status: string }) => {
  const response = await apiClient.put(`/deals/${id}`, deal);
  console.log(response.data);
  return response.data;
};

export const deleteDeal = async (id: number) => {
  const response = await apiClient.delete(`/deals/${id}`);
  console.log(response.data);
  return response.data;
};
