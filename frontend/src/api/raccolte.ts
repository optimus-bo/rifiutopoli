import { backendClient } from './backendClient';
import { Rifiuto } from './rifiuti';

export type Raccolta = {
  id: number;
  codice_eer: string;
  rifiuto: Rifiuto;
  contenitori: number;
  // ISO string
  data: string;
  id_operatore: number;
};

export type RaccoltaCreate = {
  codice_eer: string;
  contenitori: number;
  id_operatore: number;
};

export async function registraRaccolte(raccolte: RaccoltaCreate[]) {
  return backendClient.post('/raccolte', raccolte);
}

export async function registraSingolaRaccolta(raccolta: RaccoltaCreate) {
  return registraRaccolte([raccolta]);
}

export async function getRaccolte(): Promise<Raccolta[]> {
  return (await backendClient.get('/raccolte')).data;
}
