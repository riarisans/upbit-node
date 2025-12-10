import { UpbitHttpClient } from "../../shared/http-client";

export interface TradingPair {
    market: string;
    korean_name?: string;
    english_name?: string;
    market_warning?: "NONE" | "CAUTION";
    market_event?: {
        warning: boolean;
        caution?: Record<string, boolean>;
    };
}

export class PairService {
    constructor(private readonly http: UpbitHttpClient) {}

    async listAll(includeDetails = false): Promise<TradingPair[]> {
        return this.http.getPublic<TradingPair[]>("/market/all", { isDetails: includeDetails });
    }
}
