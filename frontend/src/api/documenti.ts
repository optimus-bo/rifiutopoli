import { Dayjs } from 'dayjs';
import { backendClient } from './backendClient';

export async function scaricaReportExcel(startDate?: Dayjs, endDate?: Dayjs): Promise<Blob> {
  let query = '';
  if (startDate) {
    query += `&start_date=${startDate.toISOString()}`;
  }
  if (endDate) {
    query += `&end_date=${endDate.toISOString()}`;
  }
  const response = await backendClient.get(`/report-excel?${query}`, {
    responseType: 'blob', // Ensure the response is treated as binary
    // params: {
    //   start_date: start,
    //   end_date: end,
    // },
  });
  return new Blob([response.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}
