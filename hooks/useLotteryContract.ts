import { useEffect, useState } from "react";
import { Address, OpenedContract, toNano } from "ton-core";
import { useInit } from "./useInit";
import { Lottery } from "../contracts/lottery";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

export function useLotteryContract() {
  const { sender } = useTonConnect();
  const { client } = useTonClient();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const [number, setNumber] = useState<number>();

  const lotteryContract = useInit(async () => {
    if (!client) return;

    const contract = new Lottery(
      Address.parse("UQBuCIH3AAwsCXmFFrHE04QseaBmuTXXRF6Bvb81vAzZLHp5")
    );
    return client.open(contract) as OpenedContract<Lottery>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!lotteryContract) return;
      setNumber(undefined);
      const number = await lotteryContract.getData();
      setNumber(number);
      await sleep(5000);
      getValue();
    }
    getValue();
  }, [lotteryContract]);

  return {
    contract_address: lotteryContract?.address.toString(),
    number,
    sendInternalMessage: () => {
      return lotteryContract?.sendInternalMessage(sender, toNano("1"));
    },
  };
}
