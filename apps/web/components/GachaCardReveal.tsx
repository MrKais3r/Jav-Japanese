"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Star, Trophy, PartyPopper } from "lucide-react";

export type GachaRarity = "Common" | "Rare" | "Legendary";

interface GachaCard {
    src: string;
    title: string;
    rarity: GachaRarity;
}

export function GachaCardReveal({ 
    card, 
    onClose 
}: { 
    card: GachaCard; 
    onClose: () => void;
}) {
    const [revealed, setRevealed] = useState(false);
    const [flipped, setFlipped] = useState(false);

    const rarityColors = {
        Common: "from-zinc-400 to-zinc-600",
        Rare: "from-blue-400 to-indigo-600",
        Legendary: "from-amber-400 to-rose-600",
    };

    const rarityGlow = {
        Common: "shadow-zinc-500/20",
        Rare: "shadow-blue-500/40",
        Legendary: "shadow-pink-500/60",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 overflow-hidden">
            {/* Background Light Beam */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-linear-to-b ${rarityColors[card.rarity]} opacity-20 blur-[150px] animate-pulse`} />

            <div className="relative w-full max-w-sm flex flex-col items-center gap-8">
                {/* Announcement */}
                <div className={`transition-all duration-1000 transform ${revealed ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                    <h2 className="text-4xl font-black text-white italic tracking-tighter text-center flex items-center gap-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                        <PartyPopper className="text-pink-500" /> NEW REWARD!
                    </h2>
                    <p className="text-zinc-400 text-center font-bold mt-2 uppercase tracking-widest text-xs">
                        {card.rarity} Collectible Unlocked
                    </p>
                </div>

                {/* The Card */}
                <div 
                    className={`relative w-full aspect-3/4 cursor-pointer group transition-all duration-700 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
                    onClick={() => {
                        if (!flipped) {
                            setFlipped(true);
                            setRevealed(true);
                        }
                    }}
                >
                    {/* Front (Hidden) */}
                    <div className="absolute inset-0 backface-hidden z-20">
                        <div className="w-full h-full rounded-3xl bg-linear-to-br from-zinc-800 to-zinc-950 border-4 border-white/10 flex flex-col items-center justify-center gap-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent animate-pulse" />
                            <div className="relative z-10 p-6 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                                <Star className="w-16 h-16 text-pink-500 fill-pink-500" />
                            </div>
                            <div className="text-zinc-500 font-black tracking-widest uppercase text-lg group-hover:text-pink-400 transition-colors">
                                Tap to Reveal
                            </div>
                        </div>
                    </div>

                    {/* Back (The Reward) */}
                    <div className="absolute inset-0 rotate-y-180 backface-hidden z-10">
                        <div className={`w-full h-full rounded-3xl border-4 border-white/20 overflow-hidden shadow-2xl ${rarityGlow[card.rarity]} relative group`}>
                            <img src={card.src} className="w-full h-full object-cover" alt="Reward" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
                            
                            {/* Card Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                                <div className={`inline-block px-3 py-1 rounded-full bg-linear-to-r ${rarityColors[card.rarity]} text-white text-[10px] font-black uppercase tracking-wider`}>
                                    {card.rarity}
                                </div>
                                <h3 className="text-2xl font-black text-white italic tracking-tight uppercase">
                                    {card.title}
                                </h3>
                            </div>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                {revealed && (
                    <button
                        onClick={onClose}
                        className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl uppercase tracking-tighter"
                    >
                        Add to Collection
                    </button>
                )}
            </div>
        </div>
    );
}

// Add these to globals.css if not present, but for now we can simulate with tailwind
// .preserve-3d { transform-style: preserve-3d; }
// .backface-hidden { backface-visibility: hidden; }
// .rotate-y-180 { transform: rotateY(180deg); }
