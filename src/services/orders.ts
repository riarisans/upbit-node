import { HttpClient } from "../api/http-client";

export interface Order {
    uuid: string;
    side: "bid" | "ask";
    ord_type: string;
    price: string;
    state: string;
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

export interface OrderChanceAccount {
    currency: string;
    balance: string;
    locked: string;
    avg_buy_price: string;
    avg_buy_price_modified: boolean;
    unit_currency: string;
}

export interface OrderChanceMarket {
    id: string;
    name: string;
    order_types: string[];
    order_sides: string[];
    bid: {
        currency: string;
        price_unit: string | null;
        min_total: number;
    };
    ask: {
        currency: string;
        price_unit: string | null;
        min_total: number;
    };
    max_total: string;
    state: string;
}

export interface OrderChanceResponse {
    bid_fee: string;
    ask_fee: string;
    market: OrderChanceMarket;
    bid_account: OrderChanceAccount;
    ask_account: OrderChanceAccount;
}

export interface PlaceOrderResponse {
    uuid: string;
    side: "bid" | "ask";
    ord_type: string;
    price: string;
    avg_price: string;
    state: string;
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

export class OrdersService {
    constructor(private http: HttpClient) {}

    getOrder(uuid: string): Promise<Order> {
        return this.http.get<Order>("/v1/order", { uuid });
    }

    listOrders(params: {
        state?: string;
        uuids?: string[];
        ids?: string[];
        page?: number;
        limit?: number;
        order_by?: "asc" | "desc";
    }): Promise<Order[]> {
        return this.http.get<Order[]>("/v1/orders", params);
    }

    orderChance(market: string): Promise<OrderChanceResponse> {
        return this.http.get<OrderChanceResponse>("/v1/orders/chance", { market });
    }

    placeOrder(params: {
        market: string;
        side: "bid" | "ask";
        volume?: string;
        price?: string;
        ord_type: "limit" | "price" | "market";
    }): Promise<PlaceOrderResponse> {
        return this.http.post<PlaceOrderResponse>("/v1/orders", params);
    }

    cancelOrder(uuid: string): Promise<Order> {
        return this.http.delete<Order>("/v1/order", { params: { uuid } });
    }
}
