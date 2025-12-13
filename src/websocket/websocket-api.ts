import WebSocket from "ws";
import { UpbitClientConfig } from "../shared/http-client";

export type WebsocketTopic = "ticker" | "trade" | "orderbook" | "candle" | "myOrder" | "myAsset";
export type WebsocketAskBid = "ASK" | "BID";
export type WebsocketChange = "RISE" | "EVEN" | "FALL";
export type WebsocketMarketState = "PREVIEW" | "ACTIVE" | "DELISTING";
export type WebsocketMarketWarning = "NONE" | "CAUTION";
export type WebsocketStreamType = "SNAPSHOT" | "REALTIME";

export interface WebsocketTickerPayload {
    type: "ticker";
    code: string;
    opening_price: number;
    high_price: number;
    low_price: number;
    trade_price: number;
    prev_closing_price: number;
    change: WebsocketChange;
    change_price: number;
    signed_change_price: number;
    change_rate: number;
    signed_change_rate: number;
    trade_volume: number;
    acc_trade_price: number;
    acc_trade_volume: number;
    trade_date: string;
    trade_time: string;
    trade_timestamp: number;
    acc_ask_volume: number;
    acc_bid_volume: number;
    highest_52_week_price: number;
    highest_52_week_date: string;
    lowest_52_week_price: number;
    lowest_52_week_date: string;
    market_state: WebsocketMarketState;
    is_trading_suspended: boolean;
    delisting_date: string | null;
    market_warning: WebsocketMarketWarning;
    timestamp: number;
    acc_trade_price_24h: number;
    acc_trade_volume_24h: number;
    stream_type: WebsocketStreamType;
}

export interface WebsocketTradePayload {
    type: "trade";
    code: string;
    timestamp: number;
    trade_date: string;
    trade_time: string;
    trade_timestamp: number;
    trade_price: number;
    trade_volume: number;
    ask_bid: WebsocketAskBid;
    prev_closing_price: number;
    change: WebsocketChange;
    change_price: number;
    sequential_id: number;
    stream_type: WebsocketStreamType;
}

export interface WebsocketOrderbookUnitPayload {
    ask_price: number;
    bid_price: number;
    ask_size: number;
    bid_size: number;
}

export interface WebsocketOrderbookPayload {
    type: "orderbook";
    code: string;
    timestamp: number;
    total_ask_size: number;
    total_bid_size: number;
    orderbook_units: WebsocketOrderbookUnitPayload[];
    stream_type: WebsocketStreamType;
}

export interface WebsocketCandlePayload {
    type: "candle";
    code: string;
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
    stream_type: WebsocketStreamType;
}

export interface WebsocketMyOrderPayload {
    type: "myOrder";
    code: string;
    uuid: string;
    side: "bid" | "ask";
    ord_type: "limit" | "price" | "market";
    price: string;
    avg_price: string;
    state: "wait" | "watch" | "done" | "cancel";
    market: string;
    created_at: string;
    volume: string;
    remaining_volume: string;
    reserved_fee: string;
    remaining_fee: string;
    paid_fee: string;
    locked: string;
    executed_volume: string;
    trades_count: number;
}

export interface WebsocketMyAssetPayload {
    type: "myAsset";
    assets: Array<{
        currency: string;
        balance: string;
        locked: string;
        avg_buy_price: string;
        avg_buy_price_modified: boolean;
        unit_currency: string;
    }>;
}

export type WebsocketPayloadMap = {
    ticker: WebsocketTickerPayload;
    trade: WebsocketTradePayload;
    orderbook: WebsocketOrderbookPayload;
    candle: WebsocketCandlePayload;
    myOrder: WebsocketMyOrderPayload;
    myAsset: WebsocketMyAssetPayload;
};

export type WebsocketPayload<TTopic extends WebsocketTopic> = WebsocketPayloadMap[TTopic];

type WebsocketFrame<TTopic extends WebsocketTopic> =
    | { ticket: string }
    | { type: TTopic; codes: string[] }
    | { authorization: string };

class WebsocketFeed<TTopic extends WebsocketTopic> {
    constructor(private readonly topic: TTopic, private readonly config: UpbitClientConfig = {}) {}

    subscribe(markets: string[], onMessage: (payload: WebsocketPayload<TTopic>) => void): WebSocket {
        const ws = new WebSocket("wss://api.upbit.com/websocket/v1");

        ws.on("open", () => {
            const ticket = `upbit-node-${Date.now()}`;
            const frame: Array<WebsocketFrame<TTopic>> = [{ ticket }, { type: this.topic, codes: markets }];

            if ((this.topic === "myOrder" || this.topic === "myAsset") && this.config.accessKey) {
                frame.push({ authorization: `Bearer ${this.config.accessKey}` });
            }

            ws.send(JSON.stringify(frame));
        });

        ws.on("message", (data) => {
            try {
                const text = typeof data === "string" ? data : data.toString();
                onMessage(JSON.parse(text) as WebsocketPayload<TTopic>);
            } catch {
                onMessage(data as unknown as WebsocketPayload<TTopic>);
            }
        });

        return ws;
    }
}

export class WebsocketAPI {
    ticker: WebsocketFeed<"ticker">;
    trade: WebsocketFeed<"trade">;
    orderbook: WebsocketFeed<"orderbook">;
    candle: WebsocketFeed<"candle">;
    myOrder: WebsocketFeed<"myOrder">;
    myAsset: WebsocketFeed<"myAsset">;

    constructor(config: UpbitClientConfig = {}) {
        this.ticker = new WebsocketFeed("ticker", config);
        this.trade = new WebsocketFeed("trade", config);
        this.orderbook = new WebsocketFeed("orderbook", config);
        this.candle = new WebsocketFeed("candle", config);
        this.myOrder = new WebsocketFeed("myOrder", config);
        this.myAsset = new WebsocketFeed("myAsset", config);
    }
}
