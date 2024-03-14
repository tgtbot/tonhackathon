import { useEffect, useState } from "react";
import { Address, OpenedContract, toNano } from "ton-core";
import { useInit } from "./useInit";
import { Lottery } from "../contracts/lottery";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

export function useLotteryContract() {
  const { wallet, sender } = useTonConnect();
  const { client } = useTonClient();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const [contractData, setContractData] = useState<null | {
    number: number;
  }>();

  const mainContract = useInit(async () => {
    if (!client) return;
    const contract = new Lottery(
      Address.parse("UQBuCIH3AAwsCXmFFrHE04QseaBmuTXXRF6Bvb81vAzZLHp5")
    );
    return client.open(contract) as OpenedContract<Lottery>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;
      setContractData(null);
      const instack = await mainContract.getData();
      setContractData({
        number: instack,
      });
      await sleep(5000);
      getValue();
    }
    getValue();
  }, [mainContract]);

  return {
    contract_address: mainContract?.address.toString(),
    ...contractData,
    sendInternalMessage: () => {
      return mainContract?.sendInternalMessage(sender, toNano("1"));
    },
  };
}
