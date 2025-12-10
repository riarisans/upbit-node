import axios, { AxiosInstance } from "axios";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export interface UpbitClientConfig {
    accessKey?: string;
    secretKey?: string;
    baseUrl?: string;
}

export class UpbitHttpClient {
    private readonly http: AxiosInstance;
    private readonly accessKey?: string;
    private readonly secretKey?: string;

    constructor(config: UpbitClientConfig = {}) {
        this.accessKey = config.accessKey;
        this.secretKey = config.secretKey;
        this.http = axios.create({
            baseURL: config.baseUrl ?? "https://api.upbit.com/v1",
            timeout: 10_000,
        });
    }

    async getPublic<T>(path: string, params?: unknown): Promise<T> {
        const { data } = await this.http.get<T>(path, { params });
        return data;
    }

    async getPrivate<T>(path: string, params?: unknown): Promise<T> {
        const headers = this.buildAuthHeader(params);
        const { data } = await this.http.get<T>(path, { params, headers });
        return data;
    }

    async postPrivate<T>(path: string, body?: unknown): Promise<T> {
        const headers = this.buildAuthHeader(body);
        const { data } = await this.http.post<T>(path, body, { headers });
        return data;
    }

    async deletePrivate<T>(path: string, params?: unknown): Promise<T> {
        const headers = this.buildAuthHeader(params);
        const { data } = await this.http.delete<T>(path, { params, headers });
        return data;
    }

    private buildAuthHeader(payload?: unknown): Record<string, string> {
        if (!this.accessKey || !this.secretKey) {
            throw new Error("Private endpoints require accessKey and secretKey");
        }

        const query = new URLSearchParams();
        const entries = typeof payload === "object" && payload !== null ? Object.entries(payload as Record<string, unknown>) : [];
        const hasPayload = entries.length > 0;

        if (hasPayload) {
            entries.forEach(([key, value]) => {
                if (value === undefined || value === null) return;
                query.append(key, String(value));
            });
        }

        const jwtPayload: Record<string, string> = {
            access_key: this.accessKey,
            nonce: crypto.randomUUID(),
        };

        if (hasPayload) {
            const queryHash = crypto.createHash("sha512").update(query.toString()).digest("hex");
            jwtPayload.query_hash = queryHash;
            jwtPayload.query_hash_alg = "SHA512";
        }

        const token = jwt.sign(jwtPayload, this.secretKey);
        return { Authorization: `Bearer ${token}` };
    }
}
