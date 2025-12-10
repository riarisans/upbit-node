import { UpbitHttpClient } from "../../shared/http-client";

export interface CandleRequest {
    market: string;
    count?: number;
    to?: string;
}

export interface Candle {
    market: string;
    candle_date_time_utc: string;
    candle_date_time_kst: string;
    opening_price: number;
    high_price: number;
    low_price: number;
    trade_price: number;
    timestamp: number;
    candle_acc_trade_price: number;
    candle_acc_trade_volume: number;
    unit?: number;
    prev_closing_price?: number;
    change_price?: number;
    change_rate?: number;
    converted_trade_price?: number;
}

export class CandleService {
    constructor(private readonly http: UpbitHttpClient) {}

    async minutes(unit: 1 | 3 | 5 | 10 | 15 | 30 | 60 | 240, params: CandleRequest): Promise<Candle[]> {
        return this.http.getPublic<Candle[]>(`/candles/minutes/${unit}`, params);
    }

    async days(params: CandleRequest): Promise<Candle[]> {
        return this.http.getPublic<Candle[]>("/candles/days", params);
    }

    async weeks(params: CandleRequest): Promise<Candle[]> {
        return this.http.getPublic<Candle[]>("/candles/weeks", params);
    }

    async months(params: CandleRequest): Promise<Candle[]> {
        return this.http.getPublic<Candle[]>("/candles/months", params);
    }
}
