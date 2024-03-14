import { useConnection } from "@/hooks/useConnection";
import { useLotteryContract } from "@/hooks/useLotteryContract";
import { Button } from "@/components/ui/button";

export function PlayLotteryButton() {
  const { connected } = useConnection();
  const { number, contract_address, sendInternalMessage } =
    useLotteryContract();

  return (
    connected && (
      <>
        <b>Contract Address:</b>
        <div className="overflow-hidden">{contract_address}</div>
        <b>Current number:</b>
        <div>{number}</div>

        <Button asChild>
          <a
            onClick={() => {
              sendInternalMessage();
            }}
          >
            Send 1 TON to contract to start lottery
          </a>
        </Button>
      </>
    )
  );
}
