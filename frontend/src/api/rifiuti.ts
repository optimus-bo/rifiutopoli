import { backendClient } from './backendClient';

export type Rifiuto = {
  codice_cer: string;
  nome: string;
  img_src: string;
};

export type RifiutoCreate = {
  codice_cer: string;
  nome: string;
  descrizione: string;
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
