import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchIngatlanok,
  fetchIngatlanById,
  createIngatlan,
  updateIngatlan,
  deleteIngatlan,
  Ingatlan,
} from '../api/ingatlanok';

export const useIngatlanok = () => {
  return useQuery<Ingatlan[], Error>({
    queryKey: ['ingatlanok'],
    queryFn: fetchIngatlanok,
  });
};

export const useIngatlanById = (id: number) => {
  return useQuery<Ingatlan, Error>({
    queryKey: ['ingatlan', id],
    queryFn: () => fetchIngatlanById(id),
    enabled: !!id,
  });
};

export const useCreateIngatlan = () => {
  const queryClient = useQueryClient();
  return useMutation<Ingatlan, Error, Omit<Ingatlan, 'id'>>({
    mutationFn: createIngatlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingatlanok'] });
    },
  });
};

export const useUpdateIngatlan = () => {
  const queryClient = useQueryClient();
  return useMutation<Ingatlan, Error, { id: number; updatedIngatlan: Partial<Ingatlan> }>({
    mutationFn: ({ id, updatedIngatlan }) => updateIngatlan(id, updatedIngatlan),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ingatlanok'] });
      queryClient.setQueryData(['ingatlan', variables.id], data);
    },
  });
};

export const useDeleteIngatlan = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteIngatlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingatlanok'] });
    },
  });
};
