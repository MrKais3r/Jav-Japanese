"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import Link from "next/link";
import { Copy, CheckCircle, Heart, QrCode } from "lucide-react";

const CRYPTO_OPTIONS = [
    {
        name: "USDT",
        network: "BSC (BEP20)",
        address: "0xc49ac95cea95a9937b1246ccc693dc91b7901ff8",
        qrImage: "/qr-1.jpeg",
        color: "from-green-400 to-emerald-600",
        textColor: "text-green-400",
        bgColor: "bg-green-400/10",
        borderColor: "border-green-400/20",
    },
    {
        name: "ETH",
        network: "ERC20",
        address: "0xc49ac95cea95a9937b1246ccc693dc91b7901ff8",
        qrImage: "/qr-3.jpeg",
        color: "from-blue-400 to-indigo-600",
        textColor: "text-blue-400",
        bgColor: "bg-blue-400/10",
        borderColor: "border-blue-400/20",
    },
    {
        name: "BTC",
        network: "Bitcoin",
        address: "1595QeWmBsyNmZVGJYNEDQZEabGtGdLkUL",
        qrImage: "/qr-4.jpeg",
        color: "from-orange-400 to-amber-600",
        textColor: "text-orange-400",
        bgColor: "bg-orange-400/10",
        borderColor: "border-orange-400/20",
    },
    {
        name: "Binance Pay",
        network: "App",
        address: "User-aff4a",
        qrImage: "/qr-2.jpeg",
        color: "from-yellow-400 to-yellow-600",
        textColor: "text-yellow-400",
        bgColor: "bg-yellow-400/10",
        borderColor: "border-yellow-400/20",
    },
];

export default function DonatePage() {
    const [copyMessage, setCopyMessage] = useState("");
    const [activeQr, setActiveQr] = useState<number | null>(null);

    const copy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopyMessage(`Copied ${label}!`);
        setTimeout(() => setCopyMessage(""), 2500);
    };

    return (
        <div className="min-h-dvh w-full flex flex-col items-center justify-start gap-10 p-4 md:p-8 relative overflow-hidden bg-black text-white pb-24">
            {/* Background ambient effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-6xl z-10">
                <Header />
            </div>

            <div className="w-full max-w-4xl z-10 space-y-8">
                <Card className="border-0 bg-white/3 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden ring-1 ring-white/10 transition-all hover:ring-white/20 animate-shimmer">
                    <CardHeader className="text-center border-b border-white/5 pb-8 pt-10">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-3xl bg-linear-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.3)] animate-glow-pink">
                                <Heart className="w-8 h-8 text-white fill-white/20" />
                            </div>
                        </div>
                        <CardTitle className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-rose-400">
                                Nihongo Jav
                            </span>
                        </CardTitle>
                        <p className="text-gray-300 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                            If you enjoy learning Japanese with us and want to support the project,
                            you can send a tip using Crypto below. Every contribution helps keep the
                            site running!
                        </p>
                    </CardHeader>

                    <CardContent className="p-6 sm:p-10 flex flex-col items-center gap-10">
                        <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-pink-500/20 group mt-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/20 blur-xl group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
                            <img
                                src="/photo/nihongo_donate.jpg"
                                alt="Support us"
                                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105 relative z-10"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-20" />
                            <div className="absolute bottom-6 left-0 w-full text-center font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-rose-200 tracking-[0.2em] text-xl z-30 drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]">
                                THANK YOU SENPAI~ 💕
                            </div>
                        </div>

                        {/* Crypto Grid */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-6">
                            {CRYPTO_OPTIONS.map((crypto, index) => {
                                const isShowingQr = activeQr === index;

                                return (
                                    <div
                                        key={crypto.name}
                                        className="p-6 rounded-3xl bg-white/2 border border-white/5 hover:bg-white/5 hover:border-white/20 transition-all group overflow-hidden relative flex flex-col gap-4"
                                    >
                                        {/* Glow effect */}
                                        <div
                                            className={`absolute -right-20 -top-20 w-40 h-40 bg-linear-to-br ${crypto.color} opacity-10 blur-[50px] group-hover:opacity-20 transition-opacity pointer-events-none`}
                                        />

                                        <div className="flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`font-bold text-xl md:text-2xl ${crypto.textColor}`}
                                                >
                                                    {crypto.name}
                                                </span>
                                                <span
                                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${crypto.bgColor} ${crypto.textColor} ${crypto.borderColor} border`}
                                                >
                                                    {crypto.network}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    setActiveQr(isShowingQr ? null : index)
                                                }
                                                className={`p-2 rounded-full border transition-all ${isShowingQr ? "bg-pink-500/20 border-pink-500/50 text-pink-300" : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30"}`}
                                                title="Toggle QR Code"
                                            >
                                                <QrCode className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {isShowingQr && (
                                            <div className="relative w-full aspect-square mt-2 rounded-2xl overflow-hidden border-2 border-dashed border-white/10 flex items-center justify-center p-2 bg-white/5 mx-auto max-w-[500px] animate-in fade-in zoom-in duration-300">
                                                <img
                                                    src={crypto.qrImage}
                                                    alt={`${crypto.name} QR Code`}
                                                    className="w-full h-full object-contain rounded-xl"
                                                />
                                            </div>
                                        )}

                                        <div className="mt-auto pt-2">
                                            <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
                                                Address / ID
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-3 font-mono text-sm break-all text-gray-300 group-hover:text-white transition-colors">
                                                    {crypto.address}
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        copy(crypto.address, crypto.name)
                                                    }
                                                    className="shrink-0 p-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
                                                    title="Copy Address"
                                                >
                                                    <Copy className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Main Image Banner */}
                    </CardContent>
                </Card>
            </div>

            {/* Copy Notification Toast */}
            <div
                className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
                    copyMessage
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                }`}
            >
                <div className="bg-white/10 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl shadow-pk-500/20 border border-white/20 flex items-center gap-3 font-semibold text-sm">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    {copyMessage}
                </div>
            </div>
        </div>
    );
}
