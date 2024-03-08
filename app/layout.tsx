import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Inter } from "next/font/google";

import { TmaSDKLoader } from "@/components/TmaSDKLoader";

import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tinalee-verse",
  description: "Insights to the most up to date alphas",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TmaSDKLoader>{children}</TmaSDKLoader>
      </body>
    </html>
  );
}
