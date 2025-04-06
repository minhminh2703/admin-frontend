import api from './base.api';
import { getEnvVars } from '../Environment';
const { apiUrl } = getEnvVars();
import { AxiosError } from 'axios';
import { LoginResponse } from '../types/responses/account.response';

export const loginAPI = async (username: string, password: string) => {
    try {
        const response = await api<LoginResponse>({
            method: 'POST',
            url: `${apiUrl}/users/login`,
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: username,
                password: password,
            },
        });
        return response.data;
    } catch (err: unknown) {
        const axiosError = err as AxiosError<any>;

        if (axiosError.response) {
            if (axiosError.response.status === 401) {
                throw new Error('Invalid credentials. Please try again.');
            } else if (axiosError.response.status === 400) {
                throw new Error('Validation error. Please check your inputs.');
            } else {
                throw new Error('Failed to login. Please try again.');
            }
        }

        throw new Error('Failed to login. Please check your connection');
    }
};
