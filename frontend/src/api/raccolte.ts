import { backendClient } from './backendClient';
import { Rifiuto } from './rifiuti';

export type Raccolta = {
  id: number;
  codice_eer: string;
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
    raccolte.map((raccolta) => ({ peso: raccolta.peso, codice_eer: raccolta.rifiuto.codice_eer }))
  );
}

export async function registraSingolaRaccolta(raccolta: RaccoltaCreate) {
  return registraRaccolte([raccolta]);
}

export async function getRaccolte(): Promise<Raccolta[]> {
  return (await backendClient.get('/raccolte')).data;
}
