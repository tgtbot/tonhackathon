"use client";

import { useInitData } from "@tma.js/sdk-react";
import { useMemo } from "react";

export function Greeting() {
  const initData = useInitData();

  return useMemo(() => {
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
}
