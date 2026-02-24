"use client";

import Link from "next/link";
import { LockOpen, Heart, Flame, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { getAppData, getRank, checkStreak, getLevelFromXP, getLevelProgress, type AppData } from "@/lib/storage";

export function Header() {
    const [stats, setStats] = useState<AppData["user"] | null>(null);

    useEffect(() => {
        const data = getAppData();
        const streak = checkStreak(); // pulse streak on mount
        setStats({ ...data.user, streak });
    }, []);

    if (!stats) return null;

    const currentRank = getRank(stats.xp);
    const level = getLevelFromXP(stats.xp);
    const progressPercent = getLevelProgress(stats.xp);

    return (
        <div className="flex flex-col gap-4 w-full max-w-6xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between py-4 px-4 sm:px-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl transition-all hover:border-pink-500/30 gap-4 sm:gap-0 animate-shimmer">
                {/* Logo & Rank */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="group flex flex-col items-center sm:items-baseline cursor-pointer">
                        <div className="text-3xl font-bold flex items-center align-middle gap-1 tracking-tight transition-transform group-hover:scale-[1.02]">
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-gray-100 to-gray-400">
                                日本語
                            </span>
                            <span className="text-transparent bg-clip-text bg-linear-to-br from-pink-400 to-rose-600 text-4xl mt-1 text-center font-extrabold drop-shadow-[0_0_15px_rgba(244,114,182,0.5)] animate-naughty-pulse">
                                Jav
                            </span>
                        </div>
                    </Link>

                    <div className="hidden md:flex flex-col gap-1">
                        <div className={`text-[10px] uppercase font-black tracking-widest ${currentRank?.color || "text-zinc-400"} flex items-center gap-1`}>
                            <Trophy size={10} className="animate-bounce" /> {currentRank?.name || "Newbie"}
                        </div>
                        <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
                            <div 
                                className="h-full bg-linear-to-r from-pink-500 to-rose-500 transition-all duration-1000 animate-shimmer"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">
                            {stats.xp} XP • Lv.{level}
                        </div>
                    </div>
                </div>

                {/* Navigation & Streaks */}
                <div className="flex items-center gap-3 sm:gap-4 text-sm font-medium w-full sm:w-auto justify-center sm:justify-end">
                    {/* Streak Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:scale-110 transition-transform cursor-default">
                        <Flame size={16} className={stats.streak.count > 0 ? "animate-bounce fill-orange-500/20" : ""} />
                        <span className="font-bold">{stats.streak.count}</span>
                    </div>

                    <Link
                        href="/gallery"
                        className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:border-pink-500/40 hover:bg-pink-500/10 transition-all duration-300"
                    >
                        <LockOpen className="w-4 h-4 text-pink-400 group-hover:text-pink-300 transition-colors animate-float" />
                        <span className="text-gray-300 group-hover:text-white transition-colors">
                            Rewards
                        </span>
                    </Link>
                    
                    <Link
                        href="/donate"
                        className="group flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 hover:-translate-y-0.5 animate-glow-pink"
                    >
                        <Heart className="w-4 h-4 animate-pulse group-hover:scale-125 transition-transform" />
                        <span className="hidden sm:inline">Support Us</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
