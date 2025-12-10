import WebSocket from "ws";
import { UpbitClientConfig } from "../shared/http-client";

export type WebsocketTopic = "ticker" | "trade" | "orderbook" | "candle" | "myOrder" | "myAsset";

class WebsocketFeed {
    constructor(private readonly topic: WebsocketTopic, private readonly config: UpbitClientConfig = {}) {}

    subscribe(markets: string[], onMessage: (payload: unknown) => void): WebSocket {
        const ws = new WebSocket("wss://api.upbit.com/websocket/v1");

        ws.on("open", () => {
            const ticket = `upbit-node-${Date.now()}`;
            const frame: Array<Record<string, unknown>> = [
                { ticket },
                { type: this.topic, codes: markets },
            ];

            if ((this.topic === "myOrder" || this.topic === "myAsset") && this.config.accessKey) {
                frame.push({ authorization: `Bearer ${this.config.accessKey}` });
            }

            ws.send(JSON.stringify(frame));
        });

        ws.on("message", (data) => {
            try {
                const text = typeof data === "string" ? data : data.toString();
                onMessage(JSON.parse(text));
            } catch {
                onMessage(data);
            }
        });

        return ws;
    }
}

export class WebsocketAPI {
    ticker: WebsocketFeed;
    trade: WebsocketFeed;
    orderbook: WebsocketFeed;
    candle: WebsocketFeed;
    myOrder: WebsocketFeed;
    myAsset: WebsocketFeed;

    constructor(config: UpbitClientConfig = {}) {
        this.ticker = new WebsocketFeed("ticker", config);
        this.trade = new WebsocketFeed("trade", config);
        this.orderbook = new WebsocketFeed("orderbook", config);
        this.candle = new WebsocketFeed("candle", config);
        this.myOrder = new WebsocketFeed("myOrder", config);
        this.myAsset = new WebsocketFeed("myAsset", config);
    }
}
