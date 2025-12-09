import { HttpClient } from "../api/http-client";

export interface CandleBase {
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
}

export interface MinuteCandle extends CandleBase {
    unit: number;
}

export type MinuteCandleResponse = MinuteCandle[];

export type DayCandleResponse = (CandleBase & {
    prev_closing_price: number;
    change_price: number;
    change_rate: number;
})[];

export type WeekCandleResponse = CandleBase[];

export type MonthCandleResponse = CandleBase[];

export class CandleService {
    constructor(private http: HttpClient) {}

    minutes(
        unit: 1 | 3 | 5 | 10 | 15 | 30 | 60 | 240,
        params: {
            market: string;
            to?: string;
            count?: number;
        }
    ): Promise<MinuteCandleResponse> {
        return this.http.get<MinuteCandleResponse>(`/v1/candles/minutes/${unit}`, params);
    }

    days(params: { market: string; to?: string; count?: number }): Promise<DayCandleResponse> {
        return this.http.get<DayCandleResponse>("/v1/candles/days", params);
    }

    weeks(params: { market: string; to?: string; count?: number }): Promise<WeekCandleResponse> {
        return this.http.get<WeekCandleResponse>("/v1/candles/weeks", params);
    }

    months(params: { market: string; to?: string; count?: number }): Promise<MonthCandleResponse> {
        return this.http.get<MonthCandleResponse>("/v1/candles/months", params);
    }
}
