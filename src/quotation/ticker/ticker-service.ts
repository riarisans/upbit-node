import { UpbitHttpClient } from "../../shared/http-client";

export interface Ticker {
    market: string;
    trade_date: string;
    trade_time: string;
    trade_date_kst: string;
    trade_time_kst: string;
    trade_timestamp: number;
    opening_price: number;
    high_price: number;
    low_price: number;
    trade_price: number;
    prev_closing_price: number;
    change: "RISE" | "EVEN" | "FALL";
    change_price: number;
    change_rate: number;
    signed_change_price: number;
    signed_change_rate: number;
    trade_volume: number;
    acc_trade_price: number;
    acc_trade_price_24h: number;
    acc_trade_volume: number;
    acc_trade_volume_24h: number;
    acc_ask_volume?: number;
    acc_bid_volume?: number;
    highest_52_week_price: number;
    highest_52_week_date: string;
    lowest_52_week_price: number;
    lowest_52_week_date: string;
    timestamp: number;
}

export class TickerService {
    constructor(private readonly http: UpbitHttpClient) {}

    async byMarkets(markets: string[]): Promise<Ticker[]> {
        return this.http.getPublic<Ticker[]>("/ticker", { markets: markets.join(",") });
    }
}
