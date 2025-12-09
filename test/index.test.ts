import { UpbitClient } from "../src";

main().catch();

async function main() {
    let client = new UpbitClient({ accessKey: "", secretKey: "" });

    let result = await client.market.getAllMarkets(true);

    console.log(result);
}
