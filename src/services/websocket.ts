import WebSocket from "ws";

export interface WebSocketPayload {
    type: string;
    codes?: string[];
    isOnlyRealtime?: boolean;
}

export class WebSocketService {
    private ws: WebSocket | null = null;
    private url = "wss://api.upbit.com/websocket/v1";
    private reconnectTimeout = 2000;
    private isManuallyClosed = false;
    private subscriptions: object[] = [];

    connect() {
        if (this.ws) return this.ws;

        this.isManuallyClosed = false;
        this.ws = new WebSocket(this.url);

        this.ws.on("open", () => {
            if (this.subscriptions.length > 0) {
                this.ws?.send(JSON.stringify(this.subscriptions));
            }
        });

        this.ws.on("error", () => {});

        this.ws.on("close", () => {
            this.ws = null;
            if (!this.isManuallyClosed) {
                setTimeout(() => this.connect(), this.reconnectTimeout);
            }
        });

        return this.ws;
    }

    subscribe(params: object[]) {
        this.subscriptions = params;

        if (!this.ws) throw new Error("WebSocket not connected");
        this.ws.send(JSON.stringify(params));
    }

    onMessage(callback: (data: any) => void) {
        if (!this.ws) throw new Error("WebSocket not connected");
        this.ws.on("message", (msg) => {
            try {
                callback(JSON.parse(msg.toString()));
            } catch {
                callback(msg);
            }
        });
    }

    onError(callback: (err: any) => void) {
        if (!this.ws) throw new Error("WebSocket not connected");
        this.ws.on("error", callback);
    }

    onClose(callback: () => void) {
        if (!this.ws) throw new Error("WebSocket not connected");
        this.ws.on("close", callback);
    }

    close() {
        this.isManuallyClosed = true;
        this.ws?.close();
        this.ws = null;
    }
}
