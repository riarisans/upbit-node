import { UpbitHttpClient } from "../../shared/http-client";

export interface WithdrawalRequest {
    currency: string;
    amount: string;
    address?: string;
    secondaryAddress?: string;
    transactionType?: "default" | "internal";
}

export interface Withdrawal {
    type: string;
    uuid: string;
    currency: string;
    txid: string;
    state: string;
    created_at: string;
    done_at: string | null;
    amount: string;
    fee: string;
    transaction_type: string;
}

export class WithdrawalService {
    constructor(private readonly http: UpbitHttpClient) {}

    async list(params?: { currency?: string; state?: string; page?: number; limit?: number; order_by?: "asc" | "desc" }): Promise<Withdrawal[]> {
        return this.http.getPrivate<Withdrawal[]>("/withdraws", params);
    }

    async withdrawCoin(params: WithdrawalRequest): Promise<Withdrawal> {
        return this.http.postPrivate<Withdrawal>("/withdraws/coin", params);
    }

    async withdrawKrw(params: { amount: string }): Promise<Withdrawal> {
        return this.http.postPrivate<Withdrawal>("/withdraws/krw", params);
    }
}
