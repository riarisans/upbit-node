import { UpbitHttpClient } from "../../shared/http-client";

export interface RecentTrade {
    market: string;
    trade_date_utc: string;
    trade_time_utc: string;
    timestamp: number;
    trade_price: number;
    trade_volume: number;
    prev_closing_price: number;
    change_price: number;
    ask_bid: "ASK" | "BID";
    sequential_id: number;
}

export class TradeService {
    constructor(private readonly http: UpbitHttpClient) {}

    async recent(params: { market: string; to?: string; count?: number; cursor?: string }): Promise<RecentTrade[]> {
        return this.http.getPublic<RecentTrade[]>("/trades/ticks", params);
    }
}
