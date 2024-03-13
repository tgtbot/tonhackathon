import { useEffect, useState } from "react";
import { Address, OpenedContract, toNano } from "ton-core";
import { useInit } from "./useInit";
import { MainContract } from "../contracts/ContractWrapper";
import { useTonClient } from "./useTonClient";
import { useConnection } from "./useConnection";

export function useContractWrapper() {
  const client = useTonClient();
  const connection = useConnection();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const [contractData, setContractData] = useState<null | {
    number: number;
  }>();

  const mainContract = useInit(async () => {
    if (!client) return;
    const contract = new MainContract(
      Address.parse("UQBuCIH3AAwsCXmFFrHE04QseaBmuTXXRF6Bvb81vAzZLHp5")
    );
    return client.open(contract) as OpenedContract<MainContract>;
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
      return mainContract?.sendInternalMessage(connection.sender, toNano("1"));
    },
  };
}
