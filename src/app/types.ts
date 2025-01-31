export interface Ingatlan {
  id: number;
  cim: string;
  leiras: string;
  arPenz: number;
  feltoltesiDatum: string;
  allapot: string;
  kepUrl: string;
}

export interface IngatlanImage {
  ingatlanId: number;
  kepUrl: string;
}
