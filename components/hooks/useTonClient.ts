import { TonClient } from "ton";
import { useInit } from "./useInit";

export function useTonClient() {
  return useInit(
    async () =>
      new TonClient({
        endpoint: "https://toncenter.com/api/v2/jsonRPC",
        // endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
      })
  );
}
