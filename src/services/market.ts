import { HttpClient } from "../api/http-client";

export interface MarketInfo {
    market: string;
    korean_name: string;
    english_name: string;
    market_warning?: string;
}

export interface OrderBookUnit {
    ask_price: number;
    bid_price: number;
    ask_size: number;
    bid_size: number;
}

export interface OrderBook {
    market: string;
    timestamp: number;
    total_ask_size: number;
    total_bid_size: number;
    orderbook_units: OrderBookUnit[];
}

export class MarketService {
    constructor(private http: HttpClient) {}

    getAllMarkets(isDetails?: boolean): Promise<MarketInfo[]> {
        return this.http.get<MarketInfo[]>("/v1/market/all", isDetails ? { isDetails: true } : undefined);
    }

    getOrderBook(markets: string[]): Promise<OrderBook[]> {
        return this.http.get<OrderBook[]>("/v1/orderbook", {
            markets: markets.join(","),
        });
    }
}
