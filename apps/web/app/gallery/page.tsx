"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { getUnlockedRewards, getTotalRewards, REWARD_MAP, type RewardImage } from "@/lib/rewards";
import { transformSectionIdString } from "@/lib/utils";

export default function GalleryPage() {
    const [unlocked, setUnlocked] = useState<RewardImage[]>([]);
    const [selected, setSelected] = useState<RewardImage | null>(null);
    const [mounted, setMounted] = useState(false);
    const total = getTotalRewards();
    const allImages = Object.values(REWARD_MAP).flat();

    useEffect(() => {
        setMounted(true);
        setUnlocked(getUnlockedRewards());
    }, []);

    const unlockedSrcs = new Set(unlocked.map((r) => r.src));
    const unlockedCount = unlockedSrcs.size;

    if (!mounted) return null;

    return (
        <div className="min-h-dvh w-full flex flex-col items-center gap-6 text-gray-200 pb-16 px-4 md:px-8 relative bg-black pt-4 md:pt-8 overflow-hidden">
            {/* Background ambient effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="w-full max-w-6xl z-10 flex flex-col items-center gap-4">
                <Header />

                <div className="w-full max-w-5xl mx-auto pt-2">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-pink-400 mb-2">Reward Gallery</h1>
                    <p className="text-gray-400 text-sm">
                        Complete quiz sections to unlock your rewards~
                    </p>
                    {/* Progress bar */}
                    <div className="mt-4 max-w-sm mx-auto">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Unlocked</span>
                            <span>
                                {unlockedCount} / {total}
                            </span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-pink-600 to-pink-400 rounded-full transition-all duration-700"
                                style={{ width: `${(unlockedCount / total) * 100}%` }}
                            />
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="inline-block mt-4 text-xs text-gray-500 hover:text-pink-400 underline transition"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Section groups */}
                {Object.entries(REWARD_MAP).map(([sectionId, images]) => {
                    const sectionUnlocked = images.filter((img) => img.src && unlockedSrcs.has(img.src));
                    const label =
                        sectionId === "0-hiragana-1"
                            ? "Hiragana (ひらがな)"
                            : sectionId === "0-katakana-1"
                            ? "Katakana (カタカナ)"
                            : "Special Rewards";

                    return (
                        <div key={sectionId} className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-lg font-semibold text-pink-300">{label}</h2>
                                <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full border border-pink-500/30">
                                    {sectionUnlocked.length} / {images.length}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {images.map((img) => {
                                    if (!img.src) return null;
                                    const isUnlocked = unlockedSrcs.has(img.src);
                                    const unlockedData = unlocked.find((r) => r.src === img.src);

                                    return (
                                        <button
                                            key={img.src}
                                            onClick={() => isUnlocked && setSelected(unlockedData ?? null)}
                                            disabled={!isUnlocked}
                                            className={`relative aspect-3/4 rounded-xl overflow-hidden border transition-all duration-300 group ${
                                                isUnlocked
                                                    ? "border-pink-500/40 hover:border-pink-400 hover:scale-105 cursor-pointer shadow-lg shadow-pink-500/10"
                                                    : "border-white/5 cursor-default grayscale"
                                            }`}
                                        >
                                            {isUnlocked ? (
                                                <>
                                                    <Image
                                                        src={img.src}
                                                        alt={img.title || ""}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent p-3 pt-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                                        <div className="text-[10px] uppercase tracking-tighter text-pink-400 font-bold mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {img.rarity || "Common"}
                                                        </div>
                                                        <div className="text-white text-xs font-medium truncate">
                                                            {img.title || img.romaji}
                                                        </div>
                                                    </div>
                                                    {img.kana && (
                                                        <div className="absolute top-2 right-2 text-white text-sm font-bold drop-shadow-md bg-black/40 rounded-lg px-2 py-1 backdrop-blur-xs">
                                                            {img.kana}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 bg-white/5 flex flex-col items-center justify-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl opacity-20">
                                                        🔒
                                                    </div>
                                                    {img.kana && (
                                                        <span className="text-2xl font-bold text-white/5">
                                                            {img.kana}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {unlockedCount === 0 && (
                    <div className="text-center py-16 text-gray-500">
                        <div className="text-6xl mb-4">🔒</div>
                        <p className="text-lg">No rewards yet~</p>
                        <p className="text-sm mt-2">
                            Complete hiragana or katakana quizzes to unlock your first image!
                        </p>
                        <Link
                            href="/lesson/0"
                            className="inline-block mt-6 px-6 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold transition"
                        >
                            Start Lesson 0 →
                        </Link>
                    </div>
                )}
            </div>
        </div>

            {/* Lightbox */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selected.src}
                            alt={selected.title || "Reward"}
                            width={600}
                            height={800}
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/99 via-black/80 to-transparent p-8 text-center">
                            {selected.kana && (
                                <div className="text-7xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                    {selected.kana}
                                </div>
                            )}
                            <div className="text-pink-400 text-2xl font-bold tracking-tight mb-1">
                                {selected.title}
                            </div>
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-3 bg-white/5 py-1.5 px-3 rounded-full border border-white/10 w-fit mx-auto">
                                <span className="text-pink-500 font-bold">{selected.rarity}</span>
                                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                <span>Unlocked from {transformSectionIdString(selected.sectionId)}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white text-sm transition"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
