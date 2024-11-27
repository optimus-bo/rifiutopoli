import { getYear, parseISO } from 'date-fns';
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

export type RaccolteAggregate = {
  codice_eer: string;
  quantita: number;
  um: string;
  codice_raggruppamento: string;
  codice_pittogramma?: string;
};

export type RaccoltaCreate = {
  codice_eer: string;
  quantita: number;
};

export type GetRaccolteParams = {
  esportato?: boolean;
  start_date?: string;
  end_date?: string;
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

export async function getRaccolteAggregate(params?: GetRaccolteParams): Promise<RaccolteAggregate[]> {
  return (await backendClient.get('/raccolte-aggregate', { params: params })).data;
}

export async function deleteRaccolta(id: number, data: string) {
  const anno = getYear(parseISO(data));
  return (await backendClient.delete(`/raccolte/${anno}/${id}`)).data;
}
