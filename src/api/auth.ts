import crypto from "crypto";
import querystring from "querystring";
import { AxiosHeaders } from "axios";

export interface SignParams {
    accessKey: string;
    secretKey: string;
    params?: Record<string, any>;
}

export function signRequest({ accessKey, secretKey, params = {} }: SignParams): Record<string, string> {
    const query = querystring.stringify(params);

    const queryHash = crypto.createHash("sha512").update(query, "utf-8").digest("hex");

    const payload = {
        access_key: accessKey,
        nonce: Date.now().toString(),
        query_hash: queryHash,
        query_hash_alg: "SHA512",
    };

    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64");

    const signature = crypto.createHmac("sha512", secretKey).update(encodedPayload).digest("hex");

    const headers = new AxiosHeaders();
    headers.set("Authorization", `Bearer ${encodedPayload}.${signature}`);

    return headers.toJSON() as Record<string, string>;
}
