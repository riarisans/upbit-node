import { UpbitHttpClient } from "../../shared/http-client";

export interface AccountBalance {
    currency: string;
    balance: string;
    locked: string;
    avg_buy_price: string;
    avg_buy_price_modified: boolean;
    unit_currency: string;
}

export class AssetService {
    constructor(private readonly http: UpbitHttpClient) {}

    async getAccounts(): Promise<AccountBalance[]> {
        return this.http.getPrivate<AccountBalance[]>("/accounts");
    }
}
