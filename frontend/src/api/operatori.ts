import { backendClient } from './backendClient';

export type Operatore = {
  id: number;
  nome: string;
};

export type OperatoreCreate = {
  nome: string;
};

export async function registraOperatore(operatore: OperatoreCreate) {
  return backendClient.post('/operatori', operatore);
}

export async function getOperatori(): Promise<Operatore[]> {
  return (await backendClient.get('/operatori')).data;
}
