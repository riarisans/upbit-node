import { UpbitHttpClient } from "../../shared/http-client";

export interface WalletStatus {
    currency: string;
    wallet_state: string;
    wallet_support: "supported" | "unsupported";
}

export interface ApiKey {
    access_key: string;
    expire_at: string | null;
}

export class ServiceInfoService {
    constructor(private readonly http: UpbitHttpClient) {}

    async getWalletStatus(): Promise<WalletStatus[]> {
        return this.http.getPublic<WalletStatus[]>("/status/wallet");
    }

    async getApiKeys(): Promise<ApiKey[]> {
        return this.http.getPrivate<ApiKey[]>("/api_keys");
    }
}
