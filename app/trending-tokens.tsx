import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import rawTokenMap from "./tokens.json";
import axios from "axios";
import Link from "next/link";

// Define an interface for the tokenMap with an index signature
interface TokenMap {
  [key: string]: string;
}

// Cast the imported tokenMap to the new interface
const tokenMap: TokenMap = rawTokenMap as TokenMap;

async function getTrendingCryptos() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Format the date in 'year-month-date' format
  const formattedDate = yesterday.toISOString().split("T")[0];
  try {
    const response = await axios.post(
      `/api/trending_crypto`,
      { date: formattedDate },
      {
        timeout: 600000, // 10 minutes in milliseconds
      }
    );
    const result = response.data;
    if (result.length <= 0) {
      return [];
    }
    return result.split(",");
  } catch (e) {
    console.error("failed to get trending crypto");
  }

  return [];
}

export function TrendingTokens() {
  const [trendingData, setTrendingData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTrendingCryptos();
      setTrendingData(result);
    };

    fetchData();
  }, []);

  console.log(tokenMap);

  return (
    <div className="py-4">
      <h2 className="text-lg text-center pb-4">
        Trending cryptos from yesterday:
      </h2>
      <div className="flex flex-col gap-4">
        {trendingData.map((token) => {
          console.log(tokenMap["BNB"]);
          const t = token.trim();

          return (
            <div key={t} className="flex justify-between items-center">
              <div>{t}</div>
              <div>
                {tokenMap[t] && (
                  <Button asChild>
                    <Link
                      target="_blank"
                      href={`https://t.me/BananaGunSniper_bot?start=snp_tinaleebot_${tokenMap[t]}`}
                    >
                      Trade
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
