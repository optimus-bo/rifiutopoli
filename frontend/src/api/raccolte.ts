import { backendClient } from './backendClient';
import { Rifiuto } from './rifiuti';

export type Raccolta = {
  id: number;
  codice_eer: string;
  contenitori: number;
  // ISO string
  data: string;
};

export type RaccoltaCreate = {
  rifiuto: Rifiuto;
  contenitori: number;
};

export async function registraRaccolte(raccolte: RaccoltaCreate[]) {
  return backendClient.post(
    '/raccolte',
    raccolte.map((raccolta) => ({ contenitori: raccolta.contenitori, codice_eer: raccolta.rifiuto.codice_eer }))
  );
}

export async function registraSingolaRaccolta(raccolta: RaccoltaCreate) {
  return registraRaccolte([raccolta]);
}

export async function getRaccolte(): Promise<Raccolta[]> {
  return (await backendClient.get('/raccolte')).data;
}
