import { HttpClient } from "./api/http-client";
import { AccountService } from "./services/account";
import { CandleService } from "./services/candles";
import { DepositService } from "./services/deposit";
import { MarketService } from "./services/market";
import { OrdersService } from "./services/orders";
import { TickerService } from "./services/ticker";
import { WebSocketService } from "./services/websocket";
import { WithdrawService } from "./services/withdraw";

export class UpbitClient {
    private http: HttpClient;

    account: AccountService;
    candles: CandleService;
    deposit: DepositService;
    market: MarketService;
    orders: OrdersService;
    ticker: TickerService;
    websocket: WebSocketService;
    withdraw: WithdrawService;

    constructor(options: { accessKey?: string; secretKey?: string; baseURL?: string } = {}) {
        this.http = new HttpClient({
            baseURL: options.baseURL ?? "https://api.upbit.com",
            accessKey: options.accessKey,
            secretKey: options.secretKey,
        });

        this.account = new AccountService(this.http);
        this.candles = new CandleService(this.http);
        this.deposit = new DepositService(this.http);
        this.market = new MarketService(this.http);
        this.orders = new OrdersService(this.http);
        this.ticker = new TickerService(this.http);
        this.websocket = new WebSocketService();
        this.withdraw = new WithdrawService(this.http);
    }
}
