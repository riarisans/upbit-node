import { UpbitHttpClient } from "../../shared/http-client";

export interface OrderbookUnit {
    ask_price: number;
    bid_price: number;
    ask_size: number;
    bid_size: number;
}

export interface Orderbook {
    market: string;
    timestamp: number;
    total_ask_size: number;
    total_bid_size: number;
    orderbook_units: OrderbookUnit[];
}

export class OrderbookService {
    constructor(private readonly http: UpbitHttpClient) {}

    async byMarkets(markets: string[]): Promise<Orderbook[]> {
        return this.http.getPublic<Orderbook[]>("/orderbook", { markets: markets.join(",") });
    }
}
