import { UpbitHttpClient } from "../../shared/http-client";

export interface Deposit {
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

export class DepositService {
    constructor(private readonly http: UpbitHttpClient) {}

    async list(params?: { currency?: string; state?: string; page?: number; limit?: number; order_by?: "asc" | "desc" }): Promise<Deposit[]> {
        return this.http.getPrivate<Deposit[]>("/deposits", params);
    }

    async getDeposit(params: { uuid?: string; txid?: string; currency?: string }): Promise<Deposit> {
        return this.http.getPrivate<Deposit>("/deposit", params);
    }

    async generateDepositAddress(params: { currency: string }): Promise<{ currency: string; deposit_address: string; secondary_address?: string }> {
        return this.http.postPrivate("/deposits/generate_coin_address", params);
    }
}
