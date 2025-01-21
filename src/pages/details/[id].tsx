import React from 'react';
import { useIngatlanById } from '../../hooks/useIngatlanok';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

const IngatlanDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: ingatlan, isLoading, isError } = useIngatlanById(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Hiba történt az adatok betöltése közben.</div>;
  if (!ingatlan) return <div>Az ingatlan nem található.</div>;

  return (
    <div>
      <Navbar />
      <h1>{ingatlan.cim}</h1>
      <p>{ingatlan.leiras}</p>
      <p>{ingatlan.arPenz} Ft</p>
      <p>{ingatlan.feltoltesiDatum}</p>
      <p>{ingatlan.allapot}</p>

      <button
        onClick={() => router.push(`/edit/${id}`)}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Módosítás
      </button>
    </div>
  );
};

export default IngatlanDetails;
