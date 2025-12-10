import { QuotationAPI } from "../quotation/quotation-api";
import { ExchangeAPI } from "../exchange/exchange-api";
import { WebsocketAPI } from "../websocket/websocket-api";
import { UpbitClientConfig, UpbitHttpClient } from "../shared/http-client";

export class UpbitClient {
    quotation: QuotationAPI;
    exchange: ExchangeAPI;
    websocket: WebsocketAPI;

    constructor(config: UpbitClientConfig = {}) {
        const httpClient = new UpbitHttpClient(config);
        this.quotation = new QuotationAPI(httpClient);
        this.exchange = new ExchangeAPI(httpClient);
        this.websocket = new WebsocketAPI(config);
    }
}
