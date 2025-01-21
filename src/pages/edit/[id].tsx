import React from 'react';
import { useIngatlanById, useUpdateIngatlan } from '../../hooks/useIngatlanok';
import { useRouter } from 'next/router';
import IngatlanForm from '../../components/IngatlanForm';
import Navbar from '../../components/Navbar';
import { Ingatlan } from '../../api/ingatlanok';

const EditIngatlan = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: ingatlan, isLoading } = useIngatlanById(Number(id));
  const updateMutation = useUpdateIngatlan();

  const handleSubmit = (updatedIngatlan: Partial<Ingatlan>) => {
    updateMutation.mutate(
      { id: Number(id), updatedIngatlan },
      {
        onSuccess: () => {
          alert('Az ingatlan módosítása sikeres!');

          router.push(`/details/${id}`);
        },
        onError: (error) => {
          alert(`Hiba történt az ingatlan módosítása közben: ${error.message}`);
        },
      },
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <h1>Ingatlan Módosítása</h1>
      <IngatlanForm onSubmit={handleSubmit} initialData={ingatlan} />
    </div>
  );
};

export default EditIngatlan;
