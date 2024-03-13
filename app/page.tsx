"use client";

import { useMemo } from "react";
import { useInitData, useThemeParams } from "@tma.js/sdk-react";
import {
  TonConnectUIProvider,
  TonConnectButton,
  THEME,
} from "@tonconnect/ui-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useContractWrapper } from "@/components/hooks/useContractWrapper";
import { useConnection } from "@/components/hooks/useConnection";
import Link from "next/link";

// function MainButtons() {
//   const mainButton = useMainButton();

//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const onMainButtonClick = () => setCount((prevCount) => prevCount + 1);

//     mainButton.enable().show();
//     mainButton.on("click", onMainButtonClick);

//     return () => {
//       mainButton.off("click", onMainButtonClick);
//       mainButton.hide();
//     };
//   }, []);

//   useEffect(() => {
//     mainButton.setText(`Count is ${count}`);
//   }, [mainButton, count]);

//   return null;
// }

const Tokens = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  },
  {
    name: "Tether USD",
    symbol: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  {
    name: "BNB",
    symbol: "BNB",
    address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
  },
  {
    name: "SHIBA INU",
    symbol: "SHIB",
    address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
  },
  {
    name: "ChainLink Token",
    symbol: "LINK",
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  },
  {
    name: "Render Token",
    symbol: "RNDR",
    address: "0x6De037ef9aD2725EB40118Bb1702EBb27e4Aeb24",
  },
  {
    name: "Arbitrum",
    symbol: "ARB",
    address: "0xaFBeC4D65BC7b116d85107FD05d912491029Bf46",
  },
];

/**
 * Displays current application init data.
 */
function InitData() {
  const router = useRouter();
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
        {Tokens.map((token) => (
          <div key={token.name} className="flex justify-between items-center">
            <div>{token.symbol}</div>
            <div>
              <Button asChild>
                <Link
                  target="_blank"
                  href={`https://t.me/BananaGunSniper_bot?start=snp_tinaleebot_${token.address}`}
                >
                  Trade
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const themeParams = useThemeParams();

  const { number, contract_address, sendInternalMessage } =
    useContractWrapper();
  const { connected } = useConnection();

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
      <b>Contract Address:</b>
      <div>{contract_address}</div>
      <b>Current number</b>
      <div>{number}</div>

      {connected && (
        <a
          onClick={() => {
            sendInternalMessage();
          }}
        >
          Send 1 TON to contract to start lottery
        </a>
      )}
    </TonConnectUIProvider>
  );
}
