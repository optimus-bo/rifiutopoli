import { backendClient } from './backendClient';
import { Rifiuto } from './rifiuti';

export type Raccolta = {
  rifiuto: Rifiuto;
  peso: number;
};

export async function registraRaccolte(raccolte: Raccolta[]) {
  return backendClient.post(
    '/raccolte',
    raccolte.map((raccolta) => ({ peso: raccolta.peso, codice_cer: raccolta.rifiuto.codice_cer }))
  );
}
