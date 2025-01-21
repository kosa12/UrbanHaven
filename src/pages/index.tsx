import React from 'react';
import { useIngatlanok } from '../hooks/useIngatlanok';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const { data: ingatlanok, isLoading, isError } = useIngatlanok();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Hiba történt az adatok betöltése közben.</div>;

  return (
    <div>
      <Navbar />
      <h1>Ingatlanok</h1>
      <ul>
        {ingatlanok?.map((ingatlan) => (
          <li key={ingatlan.id}>
            <a href={`/details/${ingatlan.id}`}>{ingatlan.cim}</a> - {ingatlan.arPenz} Ft
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
