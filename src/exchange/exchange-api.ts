import { AssetService } from "./asset/asset-service";
import { OrderService } from "./order/order-service";
import { WithdrawalService } from "./withdrawal/withdrawal-service";
import { DepositService } from "./deposit/deposit-service";
import { ServiceInfoService } from "./service/service-info-service";
import { UpbitHttpClient } from "../shared/http-client";

export class ExchangeAPI {
    asset: AssetService;
    order: OrderService;
    withdrawal: WithdrawalService;
    deposit: DepositService;
    service: ServiceInfoService;

    constructor(httpClient: UpbitHttpClient) {
        this.asset = new AssetService(httpClient);
        this.order = new OrderService(httpClient);
        this.withdrawal = new WithdrawalService(httpClient);
        this.deposit = new DepositService(httpClient);
        this.service = new ServiceInfoService(httpClient);
    }
}
