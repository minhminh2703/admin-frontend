import { Voucher } from '../types/Response/Vouchers';
import apiClient from './base.api';

export const getAllVouchersAPI = async (): Promise<Voucher[]> => {
    try {
        const response = await apiClient.get<Voucher[]>(`/voucher/get-all`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update user data: ${error}`);
    }
};

export const createVoucherAPI = async (voucher: {
    code: string;
    token: number;
    max_usage: number;
    expired_time: string;
}) => {
    try {
        const response = await apiClient.post(`/voucher/create`, {
            code: voucher.code,
            token: voucher.token,
            max_usage: voucher.max_usage,
            expired_time: voucher.expired_time,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create voucher:', error);
        throw error;
    }
};

export const editVoucherAPI = async (voucher: Voucher) => {
    try {
        const response = await apiClient.patch(`/voucher/${voucher.id}`, {
            code: voucher.code,
            token: voucher.token,
            max_usage: voucher.max_usage,
            expired_time: voucher.expired_time,
            used_count: voucher.used_count,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create voucher:', error);
        throw error;
    }
};
