import { HttpClient } from "../api/http-client";

export interface AccountItem {
    currency: string;
    balance: string;
    locked: string;
    avg_buy_price: string;
    avg_buy_price_modified: boolean;
    unit_currency: string;
}

export type GetAccountsResponse = AccountItem[];

export interface WalletStatusResponse {
    is_active: boolean;
    reason: string | null;
}

export class AccountService {
    constructor(private http: HttpClient) {}

    getAccounts(): Promise<GetAccountsResponse> {
        return this.http.get<GetAccountsResponse>("/v1/accounts");
    }

    getWalletStatus(): Promise<WalletStatusResponse> {
        return this.http.get<WalletStatusResponse>("/v1/status/wallet");
    }
}
