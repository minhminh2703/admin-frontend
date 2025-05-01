import baseApi from './base.api';

export interface TrafficReportPayload {
  current_day: string;
  type: 'By Day' | 'By Week' | 'By Year' | string; 
}

export async function fetchTrafficReport(payload: TrafficReportPayload): Promise<any> {
  try {
    const response = await baseApi.post('/admin/2/monitor/traffic-report', payload);
    return response.data;
  } catch (error) {
    console.error('Error fetching traffic report:', error);
    throw error;
  }
}
