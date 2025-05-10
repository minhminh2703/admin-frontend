import apiClient from './base.api';
import { AvatarResponse, GetUserResponse, ListUser, UserUpdateData } from '../types/User';

export const getUser = async (userId: string): Promise<GetUserResponse> => {
    try {
        const response = await apiClient.get<GetUserResponse>(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch user data: ${error}`);
    }
};

export const getUserAvatar = async (userId: string): Promise<string> => {
    try {
        const response = await apiClient.get<AvatarResponse>(`/users/${userId}/avatar-download-url`);
        const avatarDownloadUrl = response.data.avatar_download_url;
        return avatarDownloadUrl.split('?X-Amz-Algorithm')[0];
    } catch (error) {
        throw new Error(`Failed to fetch user data: ${error}`);
    }
}

export const getAllUser = async() => {
    try {
        const response = await apiClient.get<ListUser>(`/users`);
        return response.data.users;
    } catch (error) {
        throw new Error(`Failed to fetch user data: ${error}`);
    }
}

export const updateUser = async (userId: string, updatedData: UserUpdateData) => {
    try {
        const response = await apiClient.put<string>(`/users/${userId}`, updatedData);
        return response;
    } catch (error) {
        throw new Error(`Failed to update user data: ${error}`);
    }
}

export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
    try {
        const response = await apiClient.put<string>(`/users/${userId}/change-password`, {
        old_password: oldPassword,
        new_password: newPassword,
        });
        return response;
    } catch (error) {
        throw new Error(`Failed to change password: ${error}`);
    }
}
