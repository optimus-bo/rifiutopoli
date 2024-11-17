import { backendClient } from './backendClient';

export type Rifiuto = {
  codice_eer: string;
  um: string;
  conversione?: number;
  sfuso: boolean;
  codice_raggruppamento: string;
  img_src: string;
  codice_pittogramma?: string;
  codice_rdr: string;
  contenitore: string;
};

export type RifiutoCreate = {
  codice_eer: string;
  um: string;
  conversione?: number;
  sfuso: boolean;
  codice_raggruppamento: string;
  img_src: string;
  codice_pittogramma?: string;
  codice_rdr: string;
  contenitore: string;
};

export async function registraRifiuto(rifiuto: RifiutoCreate, immagine: File) {
  const formData = new FormData();
  formData.append('immagine', immagine);
  formData.append('rifiuto', JSON.stringify(rifiuto));
  return backendClient.post('/rifiuti', formData);
}

export async function getRifiuti(): Promise<Rifiuto[]> {
  return (await backendClient.get('/rifiuti')).data;
}
