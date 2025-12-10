import { PairService } from "./pair/pair-service";
import { CandleService } from "./candle/candle-service";
import { TradeService } from "./trade/trade-service";
import { TickerService } from "./ticker/ticker-service";
import { OrderbookService } from "./orderbook/orderbook-service";
import { UpbitHttpClient } from "../shared/http-client";

export class QuotationAPI {
    pair: PairService;
    candle: CandleService;
    trade: TradeService;
    ticker: TickerService;
    orderbook: OrderbookService;

    constructor(httpClient: UpbitHttpClient) {
        this.pair = new PairService(httpClient);
        this.candle = new CandleService(httpClient);
        this.trade = new TradeService(httpClient);
        this.ticker = new TickerService(httpClient);
        this.orderbook = new OrderbookService(httpClient);
    }
}
