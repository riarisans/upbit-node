import { HttpClient } from "../api/http-client";

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
    change: "EVEN" | "RISE" | "FALL";
    change_price: number;
    change_rate: number;
    signed_change_price: number;
    signed_change_rate: number;
    trade_volume: number;
    acc_trade_price: number;
    acc_trade_price_24h: number;
    acc_trade_volume: number;
    acc_trade_volume_24h: number;
    highest_52_week_price: number;
    highest_52_week_date: string;
    lowest_52_week_price: number;
    lowest_52_week_date: string;
    timestamp: number;
}

export interface TradeTick {
    market: string;
    trade_date_utc: string;
    trade_time_utc: string;
    timestamp: number;
    trade_price: number;
    trade_volume: number;
    prev_closing_price: number;
    change: "RISE" | "FALL" | "EVEN";
    change_price: number;
    sequential_id: number;
}

export type TickerResponse = Ticker[];
export type TradeTicksResponse = TradeTick[];

export class TickerService {
    constructor(private http: HttpClient) {}

    getTicker(markets: string[]): Promise<TickerResponse> {
        return this.http.get<TickerResponse>("/v1/ticker", {
            markets: markets.join(","),
        });
    }

    getTrades(params: {
        market: string;
        to?: string;
        count?: number;
        cursor?: string;
        daysAgo?: number;
    }): Promise<TradeTicksResponse> {
        return this.http.get<TradeTicksResponse>("/v1/trades/ticks", params);
    }
}
