"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import Link from "next/link";
import Image from "next/image";

export default function DonatePage() {
  const [copyMessage, setCopyMessage] = useState("");

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyMessage(`Copied ${label}!`);
    setTimeout(() => setCopyMessage(""), 2500);
  };

  return (
    <div className="min-h-dvh w-full flex flex-col items-center gap-6 pb-16">
      <Header />

      <div className="w-full max-w-2xl px-4 mt-4">
        <Link
          href="/"
          className="text-gray-400 hover:text-pink-400 transition-colors underline text-sm"
        >
          ← Back to Home
        </Link>
      </div>

      <Card className="w-full max-w-2xl bg-black/40 border-white/10 shadow-xl overflow-hidden mx-4">
        <CardHeader className="text-center border-b border-white/5 pb-6">
          <CardTitle className="text-3xl font-bold text-pink-400">
            Support Nihongo Jav 💖
          </CardTitle>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            If you enjoy learning Japanese with us and want to support the project,
            you can send a tip using Crypto below. Every contribution helps keep the site running!
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-8 p-6 sm:p-8">
          {/* Main Image */}
          <div className="flex justify-center w-full">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-pink-500/20 group">
              <img
                src="/photo/nihongo_donate.jpg"
                alt="Support us"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-0 w-full text-center font-bold text-pink-300 tracking-widest pointer-events-none">
                THANK YOU SENPAI~ 💕
              </div>
            </div>
          </div>

          {/* Crypto Addresses */}
          <div className="space-y-4 w-full max-w-lg mx-auto">
            <h3 className="text-lg font-semibold text-center text-pink-300 mb-4 tracking-wide uppercase text-sm">
              Crypto Addresses
            </h3>

            <div className="flex flex-col gap-3">
              {/* USDT */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between hover:border-pink-500/40 hover:bg-pink-500/5 transition-all group">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left overflow-hidden w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-green-400 text-lg">USDT</span>
                    <span className="text-xs bg-green-400/10 text-green-400 px-2 py-0.5 rounded-md border border-green-400/20">BSC (BEP20)</span>
                  </div>
                  <span className="text-sm text-gray-400 break-all font-mono">0xc49ac95cea95a9937b1246ccc693dc91b7901ff8</span>
                </div>
                <button
                  onClick={() => copy("0xc49ac95cea95a9937b1246ccc693dc91b7901ff8", "USDT Address")}
                  className="w-full sm:w-auto px-5 py-2.5 shrink-0 rounded-xl bg-white/5 hover:bg-pink-600 hover:text-white border border-white/10 hover:border-pink-500 transition-all text-sm font-semibold whitespace-nowrap"
                >
                  Copy
                </button>
              </div>

              {/* ETH */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between hover:border-pink-500/40 hover:bg-pink-500/5 transition-all group">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left overflow-hidden w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-blue-400 text-lg">ETH</span>
                    <span className="text-xs bg-blue-400/10 text-blue-400 px-2 py-0.5 rounded-md border border-blue-400/20">ERC20</span>
                  </div>
                  <span className="text-sm text-gray-400 break-all font-mono">0xc49ac95cea95a9937b1246ccc693dc91b7901ff8</span>
                </div>
                <button
                  onClick={() => copy("0xc49ac95cea95a9937b1246ccc693dc91b7901ff8", "ETH Address")}
                  className="w-full sm:w-auto px-5 py-2.5 shrink-0 rounded-xl bg-white/5 hover:bg-pink-600 hover:text-white border border-white/10 hover:border-pink-500 transition-all text-sm font-semibold whitespace-nowrap"
                >
                  Copy
                </button>
              </div>

              {/* BTC */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between hover:border-pink-500/40 hover:bg-pink-500/5 transition-all group">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left overflow-hidden w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-orange-400 text-lg">BTC</span>
                    <span className="text-xs bg-orange-400/10 text-orange-400 px-2 py-0.5 rounded-md border border-orange-400/20">Bitcoin</span>
                  </div>
                  <span className="text-sm text-gray-400 break-all font-mono">1595QeWmBsyNmZVGJYNEDQZEabGtGdLkUL</span>
                </div>
                <button
                  onClick={() => copy("1595QeWmBsyNmZVGJYNEDQZEabGtGdLkUL", "BTC Address")}
                  className="w-full sm:w-auto px-5 py-2.5 shrink-0 rounded-xl bg-white/5 hover:bg-pink-600 hover:text-white border border-white/10 hover:border-pink-500 transition-all text-sm font-semibold whitespace-nowrap"
                >
                  Copy
                </button>
              </div>

              {/* Binance Pay */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between hover:border-pink-500/40 hover:bg-pink-500/5 transition-all group">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left overflow-hidden w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-yellow-500 text-lg">Binance Pay</span>
                    <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-md border border-yellow-500/20">App</span>
                  </div>
                  <span className="text-sm text-gray-400 break-all font-mono">User-aff4a</span>
                </div>
                <button
                  onClick={() => copy("User-aff4a", "Binance Pay ID")}
                  className="w-full sm:w-auto px-5 py-2.5 shrink-0 rounded-xl bg-white/5 hover:bg-pink-600 hover:text-white border border-white/10 hover:border-pink-500 transition-all text-sm font-semibold whitespace-nowrap"
                >
                  Copy ID
                </button>
              </div>

            </div>

            {/* Copy Notification Toast */}
            <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${copyMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
              <div className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-2xl shadow-pink-500/30 font-medium text-sm border border-pink-400 flex items-center gap-2">
                <span>📋</span> {copyMessage}
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
