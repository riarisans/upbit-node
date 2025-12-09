import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import jwt from "jsonwebtoken";
import qs from "querystring";

export interface HttpClientConfig {
    baseURL: string;
    accessKey?: string;
    secretKey?: string;
    headers?: RawAxiosRequestHeaders;
}

export class HttpClient {
    private instance: AxiosInstance;
    private accessKey?: string;
    private secretKey?: string;

    constructor(config: HttpClientConfig) {
        this.accessKey = config.accessKey;
        this.secretKey = config.secretKey;

        this.instance = axios.create({
            baseURL: config.baseURL,
            headers: config.headers ?? {},
        });

        this.instance.interceptors.response.use(
            (res) => res,
            (err) => {
                if (err.response) throw err.response.data;
                throw err;
            }
        );
    }

    private sign(params?: Record<string, any>) {
        if (!this.accessKey || !this.secretKey) return undefined;

        const query = params ? qs.stringify(params) : "";
        const payload = query
            ? { access_key: this.accessKey, nonce: Date.now(), query }
            : { access_key: this.accessKey, nonce: Date.now() };

        const token = jwt.sign(payload, this.secretKey);
        return `Bearer ${token}`;
    }

    private buildConfig(config?: AxiosRequestConfig, params?: object): AxiosRequestConfig {
        const token = this.sign(params);
        return {
            ...config,
            headers: {
                ...(config?.headers ?? {}),
                ...(token ? { Authorization: token } : {}),
            },
        };
    }

    public async get<T>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
        const res: AxiosResponse<T> = await this.instance.get(url, {
            params,
            ...this.buildConfig(config, params),
        });
        return res.data;
    }

    public async post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        const res: AxiosResponse<T> = await this.instance.post(url, data, this.buildConfig(config, data));
        return res.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const res: AxiosResponse<T> = await this.instance.delete(url, this.buildConfig(config));
        return res.data;
    }
}
