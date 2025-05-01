wimport baseApi from "./base.api";

export async function fetchMediaReport() {
  try {
    const response = await baseApi.get('/admin/2/monitor/media-report');
    console.log('Media report response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching media report:', error);
    throw error;
  }
}
