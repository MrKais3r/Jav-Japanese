"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import Link from "next/link";

export default function DonatePage() {
  const [copyMessage, setCopyMessage] = useState("");

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyMessage("Copied!");
    setTimeout(() => setCopyMessage(""), 1500);
  };

  return (
    <div className="min-h-dvh w-full flex flex-col items-center gap-10 py-10">
      <Header />

      <div className="pt-4">
        <Link
          href="/"
          className="text-black-400 hover:text-black-200 underline text-sm"
        >
          ← Back to Home
        </Link>
      </div>

      <Card className="border max-w-3xl w-full border-white/10 bg-background/60 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black-200">
            Support Nihongo Jav ❤️
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 p-6 text-gray-300 leading-relaxed text-sm">
          <p>
            If you enjoy <span className="text-pink-400">Nihongo Jav</span> and
            want to help keep this spicy, adult-friendly Japanese learning
            experience growing… you can support the project here.
          </p>

          {/* QR Section */}
          <div className="flex flex-col items-center gap-2">
            <img src="/photo/nihongo_donate.jpg" alt="donation squit" />
          </div>

          {/* Tiers */}
          <div className="space-y-4">
            <p className="font-semibold text-black-200">Buy A Sub</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                ☕ Coffee — $50
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                🍱 Bento Meal — $150
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                💖 Super Supporter — $500
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-semibold text-black-200">Donate Crypto</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center gap-2 flex justify-between items-center">
                <span>USDT (TRC20)</span>
                <button
                  onClick={() => copy("TRC20_ADDRESS_HERE")}
                  className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition"
                >
                  Copy
                </button>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center gap-2 flex justify-between items-center">
                <span>BTC</span>
                <button
                  onClick={() => copy("BTC_ADDRESS_HERE")}
                  className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition"
                >
                  Copy
                </button>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center gap-2 flex justify-between items-center">
                <span>ETH (ERC20)</span>
                <button
                  onClick={() => copy("ETH_ADDRESS_HERE")}
                  className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Crypto */}

          {copyMessage && (
            <div className="text-center text-pink-400 text-xs pt-2">
              {copyMessage}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
