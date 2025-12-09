# upbit-node

업비트 API를 TypeScript 기반으로 사용할 수 있도록 만든 간단한 클라이언트입니다.  
계정 정보, 주문, 시세 조회 등 기본적인 기능들을 쉽게 호출할 수 있도록 구성되어 있습니다.

---

## 설치

```bash
npm install https://github.com/riarisans/upbit-node
```

## 시작하기

```ts
import { UpbitClient } from "upbit-node";

const client = new UpbitClient({
    accessKey: process.env.UPBIT_ACCESS_KEY,
    secretKey: process.env.UPBIT_SECRET_KEY,
});

// 잔고 조회
const balances = await client.account.getBalances();

// 시세 조회
const ticker = await client.ticker.getTicker(["KRW-BTC"]);

console.log(balances);
console.log(ticker);
```
