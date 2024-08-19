import { backendClient } from './backendClient';
import { Rifiuto } from './rifiuti';

export type Raccolta = {
  id: number;
  codice_cer: string;
  peso: number;
  // ISO string
  data: string;
};

export type RaccoltaCreate = {
  rifiuto: Rifiuto;
  peso: number;
};

export async function registraRaccolte(raccolte: RaccoltaCreate[]) {
  return backendClient.post(
    '/raccolte',
    raccolte.map((raccolta) => ({ peso: raccolta.peso, codice_cer: raccolta.rifiuto.codice_cer }))
  );
}

export async function getRaccolte(): Promise<Raccolta[]> {
  return (await backendClient.get('/raccolte')).data;
}
