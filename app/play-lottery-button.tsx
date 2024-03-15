import { useConnection } from "@/hooks/useConnection";
import { useLotteryContract } from "@/hooks/useLotteryContract";
import { useMainButton } from "@tma.js/sdk-react";
import { useEffect } from "react";

function MainButton({
  sendInternalMessage,
}: {
  sendInternalMessage: () => Promise<void> | undefined;
}) {
  const mainButton = useMainButton();
  useEffect(() => {
    const onMainButtonClick = () => {
      console.debug("onMainButtonClick", sendInternalMessage);
      sendInternalMessage?.();
    };
    // console.debug("useEffect", sendInternalMessage);

    mainButton.setText("Send 1 TON to Play");
    mainButton.enable().show();
    mainButton.on("click", onMainButtonClick);

    return () => {
      // console.debug("useEffect unwatch", sendInternalMessage);
      mainButton.off("click", onMainButtonClick);
      mainButton.hide();
    };
  }, [sendInternalMessage]);
  return null;
}

export function PlayLotteryButton() {
  const { connected } = useConnection();
  const { number, sendInternalMessage } = useLotteryContract();

  return (
    connected && (
      <div className="flex flex-col gap-4">
        <div className="text-center">
          Wanna try some luck? deposit 1 TON for a chance to x5 instantly 😎
        </div>
        <div>
          <h2 className="text-lg font-bold">Rules:</h2>
          <ul>
            <li>Deposit 1 TON to participate</li>
            <li>Number &lt; 10 = JACKPOT!</li>
            <li>Number 10 ~ 999 = you get 2 TON back</li>
            <li>Number 1000 ~ 1999 = you get 5 TON back</li>
            <li>Number &gt; 2000 = you lose</li>
          </ul>
        </div>
        <div className="overflow-hidden text-ellipsis">
          Latest number: {number?.toLocaleString()}
        </div>
        {sendInternalMessage && (
          <MainButton sendInternalMessage={sendInternalMessage} />
        )}
      </div>
    )
  );
}
