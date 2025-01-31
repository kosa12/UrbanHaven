export interface Tulajdonos {
  id: number;
  nev: string;
  cim: string;
  telefonszam: string;
}

export interface Ingatlan {
  id: number;
  cim: string;
  leiras: string;
  arPenz: number;
  feltoltesiDatum: string;
  allapot: string;
  kepUrl: string;
  tulajdonos: Tulajdonos;
  tulajdonosId: number;
}

export interface IngatlanImage {
  ingatlanId: number;
  kepUrl: string;
}
