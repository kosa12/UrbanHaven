import React from 'react';
import { useRouter } from 'next/router';
import { useCreateIngatlan } from '../hooks/useIngatlanok';
import IngatlanForm from '../components/IngatlanForm';
import Navbar from '../components/Navbar';
import { Ingatlan } from '../api/ingatlanok';

function CreateIngatlan() {
  const router = useRouter();
  const createMutation = useCreateIngatlan();

  const handleSubmit = (newIngatlan: Omit<Ingatlan, 'id'>) => {
    createMutation.mutate(newIngatlan, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <div>
      <Navbar />
      <h1>Új Ingatlan Létrehozása</h1>
      <IngatlanForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateIngatlan;
