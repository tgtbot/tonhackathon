"use client";

import { useEffect, useMemo, useState } from "react";
import { useInitData, useMainButton, useThemeParams } from "@tma.js/sdk-react";
import {
  TonConnectUIProvider,
  TonConnectButton,
  THEME,
} from "@tonconnect/ui-react";
import { Button } from "@/components/ui/button";

function MainButtons() {
  const mainButton = useMainButton();

  const [count, setCount] = useState(0);

  useEffect(() => {
    const onMainButtonClick = () => setCount((prevCount) => prevCount + 1);

    mainButton.enable().show();
    mainButton.on("click", onMainButtonClick);

    return () => {
      mainButton.off("click", onMainButtonClick);
      mainButton.hide();
    };
  }, []);

  useEffect(() => {
    mainButton.setText(`Count is ${count}`);
  }, [mainButton, count]);

  return null;
}

/**
 * Displays current application init data.
 */
function InitData() {
  const initData = useInitData();

  const greeting = useMemo(() => {
    if (!initData) {
      return "Init data is empty.";
    }
    const {
      authDate,
      chat,
      hash,
      canSendAfter,
      queryId,
      receiver,
      user,
      startParam,
    } = initData;

    return <h1 className="text-xl">Hello {user?.username}</h1>;
  }, [initData]);

  return (
    <div className="p-4">
      {greeting}
      <p>Below are the trending cryptos:</p>
      <div className="flex flex-col gap-4">
        {["BTC", "ETH", "DOGE", "SOL", "ADA"].map((crypto) => (
          <div key={crypto} className="flex justify-between items-center">
            <div>{crypto}</div>
            <div>
              <Button>Trade</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const themeParams = useThemeParams();

  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "safepalwallet",
            name: "SafePal",
            imageUrl:
              "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
            aboutUrl: "https://www.safepal.com/download",
            jsBridgeKey: "safepalwallet",
            platforms: ["ios", "android", "chrome", "firefox"],
          },
          {
            appName: "tonwallet",
            name: "TON Wallet",
            imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
            aboutUrl:
              "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
            universalLink: "https://wallet.ton.org/ton-connect",
            jsBridgeKey: "tonwallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["chrome", "android"],
          },
        ],
      }}
      actionsConfiguration={{
        twaReturnUrl: "https://t.me/DemoDappWithTonConnectBot/demo",
      }}
    >
      <div className="p-4 flex justify-center">
        <TonConnectButton />
      </div>
      <InitData />
    </TonConnectUIProvider>
  );
}
