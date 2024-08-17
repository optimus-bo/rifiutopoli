import { backendClient } from './backendClient';

export type Rifiuto = {
  codice_cer: string;
  nome: string;
  imgSrc: string;
};

export type RifiutoCreate = {
  codice_cer: string;
  nome: string;
  descrizione: string;
};

export async function registraRifiuto(rifiuto: RifiutoCreate) {
  return backendClient.post('/rifiuti', rifiuto);
}

export async function getRifiuti(): Promise<Rifiuto[]> {
  return (await backendClient.get('/rifiuti')).data;
}
