import { FeatureFlagResponse } from "../types/configuration";
import apiClient from "./base.api";

export const GetAllConfiguration = async (): Promise<FeatureFlagResponse> => {
    try {
        const response = await apiClient.get<FeatureFlagResponse>('/feature-flag/get-all');
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch configuration: ${error.message}`);
        }
        throw new Error(`Failed to fetch configuration: ${String(error)}`);
    }
};


export const toggleModelCharge = async (is_active: boolean): Promise<void> => {
    await apiClient.put('/feature-flag/config', {
        flag_key: 'model charge',
        is_active,
    });
};

export const updateModelCost = async (pipeline: string, model: string, cost: number): Promise<void> => {
    await apiClient.patch('/feature-flag/pipeline-model', {
        pipeline,
        model,
        cost,
    });
};