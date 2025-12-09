import { HttpClient } from "../api/http-client";

export interface Withdraw {
    type: string;
    uuid: string;
    currency: string;
    net_type: string;
    txid: string | null;
    state: string;
    created_at: string;
    done_at: string | null;
    amount: string;
    fee: string;
    transaction_type: string;
}

export interface WithdrawChanceAccount {
    currency: string;
    balance: string;
    locked: string;
    avg_buy_price: string;
    avg_buy_price_modified: boolean;
    unit_currency: string;
}

export interface WithdrawChanceResponse {
    member_level: {
        security_level: number;
        fee_level: number;
        email_verified: boolean;
        identity_auth_verified: boolean;
        bank_account_verified: boolean;
        kakao_pay_auth_verified: boolean;
        locked: boolean;
        wallet_locked: boolean;
    };
    currency: {
        code: string;
        withdraw_fee: string;
        is_coin: boolean;
        wallet_state: string;
        wallet_support: string[];
    };
    account: WithdrawChanceAccount;
}

export interface WithdrawCoinResponse {
    type: string;
    uuid: string;
    currency: string;
    net_type: string;
    txid: string | null;
    state: string;
    created_at: string;
    done_at: string | null;
    amount: string;
    fee: string;
    krw_amount: string;
    transaction_type: string;
}

export interface WithdrawKrwResponse {
    type: string;
    uuid: string;
    currency: string;
    net_type: string;
    txid: string | null;
    state: string;
    created_at: string;
    done_at: string | null;
    amount: string;
    fee: string;
    transaction_type: string;
}

export class WithdrawService {
    constructor(private http: HttpClient) {}

    listWithdraws(params?: {
        currency?: string;
        state?: string;
        limit?: number;
        page?: number;
        order_by?: "asc" | "desc";
    }): Promise<Withdraw[]> {
        return this.http.get<Withdraw[]>("/v1/withdraws", params);
    }

    getWithdraw(uuid: string): Promise<Withdraw> {
        return this.http.get<Withdraw>("/v1/withdraw", { uuid });
    }

    getWithdrawByTxId(txid: string, currency: string): Promise<Withdraw> {
        return this.http.get<Withdraw>("/v1/withdraw", { txid, currency });
    }

    withdrawCoin(params: {
        currency: string;
        amount: string;
        address: string;
        secondary_address?: string;
        transaction_type?: "default" | "internal";
    }): Promise<WithdrawCoinResponse> {
        return this.http.post<WithdrawCoinResponse>("/v1/withdraws/coin", params);
    }

    withdrawKrw(amount: string): Promise<WithdrawKrwResponse> {
        return this.http.post<WithdrawKrwResponse>("/v1/withdraws/krw", { amount });
    }

    withdrawsChance(currency: string): Promise<WithdrawChanceResponse> {
        return this.http.get<WithdrawChanceResponse>("/v1/withdraws/chance", { currency });
    }
}
