import { UpbitClient } from "../src";

async function main() {
    const client = new UpbitClient();

    const result = await client.quotation.pair.listAll();

    console.log(result);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
