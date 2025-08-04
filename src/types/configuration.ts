export interface ChargeConfig {
    is_active: boolean;
    config_details: Record<string, Record<string, number>>; // Example: { FP: { default: 10, modelA: 12 } }
}

export interface FeatureFlagResponse {
    'model charge': ChargeConfig;
    // May extend for other feature flags
}