import { HttpClient } from "../api/http-client";

export interface Deposit {
    type: string;
    uuid: string;
    currency: string;
    net_type: string;
    txid: string;
    state: string;
    created_at: string;
    done_at: string | null;
    amount: string;
    fee: string;
    transaction_type: string;
}

export interface DepositAddress {
    currency: string;
    deposit_address: string;
    secondary_address: string | null;
}

export interface GenerateDepositAddressResponse {
    success: boolean;
    currency: string;
    deposit_address: string;
    secondary_address: string | null;
}

export class DepositService {
    constructor(private http: HttpClient) {}

    listDeposits(params?: {
        currency?: string;
        state?: string;
        limit?: number;
        page?: number;
        order_by?: "asc" | "desc";
    }): Promise<Deposit[]> {
        return this.http.get<Deposit[]>("/v1/deposits", params);
    }

    getDeposit(uuid: string): Promise<Deposit> {
        return this.http.get<Deposit>("/v1/deposit", { uuid });
    }

    getDepositByTxId(txid: string, currency: string): Promise<Deposit> {
        return this.http.get<Deposit>("/v1/deposit", { txid, currency });
    }

    getDepositAddresses(): Promise<DepositAddress[]> {
        return this.http.get<DepositAddress[]>("/v1/deposits/coin_addresses");
    }

    getDepositAddress(currency: string): Promise<DepositAddress> {
        return this.http.get<DepositAddress>("/v1/deposits/coin_address", { currency });
    }

    generateDepositAddress(currency: string): Promise<GenerateDepositAddressResponse> {
        return this.http.post<GenerateDepositAddressResponse>("/v1/deposits/generate_coin_address", {
            currency,
        });
    }
}
