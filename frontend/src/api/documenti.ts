import { backendClient } from './backendClient';

export async function scaricaReportExcel(): Promise<Blob> {
  const response = await backendClient.get('/report-excel', {
    responseType: 'blob', // Ensure the response is treated as binary
  });
  return new Blob([response.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}
