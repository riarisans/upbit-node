import { UpbitHttpClient } from "../../shared/http-client";

export type OrderSide = "ask" | "bid";
export type OrderType = "limit" | "price" | "market";
export type OrderState = "wait" | "done" | "cancel";

export interface PlaceOrderRequest {
    market: string;
    side: OrderSide;
    volume?: string;
    price?: string;
    ord_type: OrderType;
    identifier?: string;
}

export interface OrderDetail {
    uuid: string;
    side: OrderSide;
    ord_type: OrderType;
    state: OrderState;
    market: string;
    created_at: string;

    price: string | null;
    volume: string | null;
    remaining_volume: string;
    executed_volume: string;
    executed_funds?: string;

    reserved_fee: string;
    remaining_fee: string;
    paid_fee: string;
    locked: string;

    trades_count: number;
    avg_price?: string;
    identifier?: string;

    trades?: {
        market: string;
        uuid: string;
        price: string;
        volume: string;
        funds: string;
        side: OrderSide;
        created_at: string;
    }[];
}

export class OrderService {
    constructor(private readonly http: UpbitHttpClient) {}

    async placeOrder(request: PlaceOrderRequest): Promise<OrderDetail> {
        return this.http.postPrivate<OrderDetail>("/orders", request);
    }

    async getOrder(params: { uuid?: string; identifier?: string }): Promise<OrderDetail> {
        return this.http.getPrivate<OrderDetail>("/order", params);
    }

    async listOrders(params?: {
        market?: string;
        state?: string;
        page?: number;
        limit?: number;
        order_by?: "asc" | "desc";
    }): Promise<OrderDetail[]> {
        return this.http.getPrivate<OrderDetail[]>("/orders", params);
    }

    async cancelOrder(params: { uuid?: string; identifier?: string }): Promise<OrderDetail> {
        return this.http.deletePrivate<OrderDetail>("/order", params);
    }
}
