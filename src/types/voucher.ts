export interface Voucher {
    id: string;
    code: string;
    token: number;
    max_usage: number;
    used_count: number;
    expired_time: string;
    created_at: string;
    updated_at: string;
}

export interface GetAllVouchers {
    vouchers: Voucher[];
}
