import { UpbitClient } from "../src";

async function main() {
    const client = new UpbitClient();

    client.websocket.ticker.subscribe(["KRW-BTC"], (payload) => {});
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
