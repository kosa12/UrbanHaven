import apiClient from './client';

export interface Ingatlan {
  id: number;
  cim: string;
  leiras: string;
  arPenz: number;
  feltoltesiDatum: string;
  allapot: string;
  tulajdonosId: number;
}

export const fetchIngatlanok = async (): Promise<Ingatlan[]> => {
  const response = await apiClient.get<Ingatlan[]>('/ingatlanok');
  return response.data;
};

export const fetchIngatlanById = async (id: number): Promise<Ingatlan> => {
  const response = await apiClient.get<Ingatlan>(`/ingatlanok/${id}`);
  return response.data;
};

export const createIngatlan = async (newIngatlan: Omit<Ingatlan, 'id'>): Promise<Ingatlan> => {
  const response = await apiClient.post<Ingatlan>('/ingatlanok', newIngatlan);
  return response.data;
};

export const updateIngatlan = async (id: number, updatedIngatlan: Partial<Ingatlan>): Promise<Ingatlan> => {
  const response = await apiClient.put<Ingatlan>(`/ingatlanok/${id}`, updatedIngatlan);
  return response.data;
};

export const deleteIngatlan = async (id: number): Promise<void> => {
  await apiClient.delete(`/ingatlanok/${id}`);
};
