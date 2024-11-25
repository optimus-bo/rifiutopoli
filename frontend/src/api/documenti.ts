import { backendClient } from './backendClient';
import { GetRaccolteParams } from './raccolte';

export async function scaricaReportExcel(params?: GetRaccolteParams): Promise<Blob> {
  // let query = '';
  // if (params?.start_date) {
  //   query += `&start_date=${params.start_date.toISOString()}`;
  // }
  // if (params?.end_date) {
  //   query += `&end_date=${params.end_date.toISOString()}`;
  // }
  const response = await backendClient.get(`/report-excel`, {
    responseType: 'blob', // Ensure the response is treated as binary
    params: params,
  });
  return new Blob([response.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}
