"use client";

import {
  TonConnectUIProvider,
  TonConnectButton,
  THEME,
} from "@tonconnect/ui-react";

import { Greeting } from "./greeting";
import { TrendingTokens } from "./trending-tokens";
import { PlayLotteryButton } from "./play-lottery-button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useThemeParams } from "@tma.js/sdk-react";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

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
      <QueryClientProvider client={queryClient}>
        <main
          className="min-h-screen"
          style={{
            background: themeParams.backgroundColor,
            color: themeParams.textColor,
          }}
        >
          <div className="p-4 flex justify-center">
            <TonConnectButton />
          </div>

          <div className="p-4">
            <Greeting />
            <TrendingTokens />
            <hr className="my-4" />
            <PlayLotteryButton />
          </div>
        </main>
      </QueryClientProvider>
    </TonConnectUIProvider>
  );
}
