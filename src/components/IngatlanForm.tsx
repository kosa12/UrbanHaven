import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface Ingatlan {
  id?: number;
  cim: string;
  leiras: string;
  arPenz: number;
  feltoltesiDatum: string;
  allapot: string;
  tulajdonosId: number;
}

interface IngatlanFormProps {
  onSubmit: (ingatlan: Ingatlan) => void;
  initialData?: Ingatlan;
}

const IngatlanForm: React.FC<IngatlanFormProps> = ({ onSubmit, initialData = {} }) => {
  const [ingatlan, setIngatlan] = useState<Ingatlan>({
    cim: initialData.cim || '',
    leiras: initialData.leiras || '',
    arPenz: initialData.arPenz || 0,
    feltoltesiDatum: initialData.feltoltesiDatum || '',
    allapot: initialData.allapot || '',
    tulajdonosId: initialData.tulajdonosId || 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setIngatlan((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setIngatlan((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(ingatlan);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="cim" label="Cím" value={ingatlan.cim} onChange={handleChange} fullWidth margin="normal" />
      <TextField
        name="leiras"
        label="Leírás"
        value={ingatlan.leiras}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="arPenz"
        label="Ár"
        type="number"
        value={ingatlan.arPenz}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="feltoltesiDatum"
        label="Feltöltési dátum"
        type="date"
        value={ingatlan.feltoltesiDatum}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        name="allapot"
        label="Állapot"
        value={ingatlan.allapot}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="tulajdonos.nev"
        label="Tulajdonos neve"
        value={ingatlan.tulajdonosId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Mentés
      </Button>
    </form>
  );
};

export default IngatlanForm;
