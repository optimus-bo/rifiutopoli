import { backendClient } from './backendClient';
import { Rifiuto } from './rifiuti';

export type Raccolta = {
  id: number;
  codice_eer: string;
  rifiuto: Rifiuto;
  quantita: number;
  // ISO string
  data: string;
  esportato: boolean;
};

export type RaccoltaCreate = {
  codice_eer: string;
  quantita: number;
};

export type GetRaccolteParams = {
  aggrega?: boolean;
  esportato?: boolean;
};

export async function registraRaccolte(raccolte: RaccoltaCreate[]) {
  return backendClient.post('/raccolte', raccolte);
}

export async function registraSingolaRaccolta(raccolta: RaccoltaCreate) {
  return registraRaccolte([raccolta]);
}

export async function getRaccolte(params?: GetRaccolteParams): Promise<Raccolta[]> {
  return (await backendClient.get('/raccolte', { params: params })).data;
}
