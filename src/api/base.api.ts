import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: false,
    timeout: 100000, // Set a timeout limit
});

export default axiosInstance;
