import { backendClient } from './backendClient';

export async function scaricaReportExcel(year: number, month: number): Promise<Blob> {
  const response = await backendClient.get(`/report-excel/${year}/${month}`, {
    responseType: 'blob', // Ensure the response is treated as binary
  });
  return new Blob([response.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}
