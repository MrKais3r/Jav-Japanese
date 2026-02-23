"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { getUnlockedRewards, getTotalRewards, REWARD_MAP, type RewardImage } from "@/lib/rewards";

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
        <div className="min-h-dvh text-white pb-16">
            <Header />

            <div className="max-w-5xl mx-auto px-4 pt-6">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-pink-400 mb-2">🖼️ Reward Gallery</h1>
                    <p className="text-gray-400 text-sm">
                        Complete quiz sections to unlock your rewards~
                    </p>
                    {/* Progress bar */}
                    <div className="mt-4 max-w-sm mx-auto">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Unlocked</span>
                            <span>{unlockedCount} / {total}</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-pink-600 to-pink-400 rounded-full transition-all duration-700"
                                style={{ width: `${(unlockedCount / total) * 100}%` }}
                            />
                        </div>
                    </div>
                    <Link href="/" className="inline-block mt-4 text-xs text-gray-500 hover:text-pink-400 underline transition">← Back to Home</Link>
                </div>

                {/* Section groups */}
                {Object.entries(REWARD_MAP).map(([sectionId, images]) => {
                    const sectionUnlocked = images.filter((img) => unlockedSrcs.has(img.src));
                    const label = sectionId === "0-hiragana-1" ? "Hiragana (ひらがな)" : "Katakana (カタカナ)";

                    return (
                        <div key={sectionId} className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-lg font-semibold text-pink-300">{label}</h2>
                                <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full border border-pink-500/30">
                                    {sectionUnlocked.length} / {images.length}
                                </span>
                            </div>

                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                                {images.map((img) => {
                                    const isUnlocked = unlockedSrcs.has(img.src);

                                    return (
                                        <button
                                            key={img.src}
                                            onClick={() => isUnlocked && setSelected(unlocked.find((r) => r.src === img.src) ?? null)}
                                            disabled={!isUnlocked}
                                            className={`relative aspect-square rounded-xl overflow-hidden border transition-all duration-200 group ${isUnlocked
                                                    ? "border-pink-500/40 hover:border-pink-400 hover:scale-105 cursor-pointer"
                                                    : "border-white/5 cursor-default"
                                                }`}
                                        >
                                            {isUnlocked ? (
                                                <>
                                                    <Image src={img.src} alt={img.kana} fill className="object-cover" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-1">
                                                        <span className="text-white text-xs font-bold">{img.romaji}</span>
                                                    </div>
                                                    <div className="absolute top-1 right-1 text-white text-xs font-bold drop-shadow bg-black/40 rounded px-0.5">
                                                        {img.kana}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 bg-white/3 flex flex-col items-center justify-center gap-1">
                                                    <span className="text-2xl grayscale opacity-30">{img.kana}</span>
                                                    <span className="text-gray-700 text-[10px]">🔒</span>
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
                        <p className="text-sm mt-2">Complete hiragana or katakana quizzes to unlock your first image!</p>
                        <Link href="/lesson/0" className="inline-block mt-6 px-6 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold transition">
                            Start Lesson 0 →
                        </Link>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setSelected(null)}>
                    <div className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <Image src={selected.src} alt={selected.kana} width={600} height={800} className="w-full h-auto object-cover" />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-center">
                            <div className="text-6xl font-bold text-white">{selected.kana}</div>
                            <div className="text-pink-300 text-xl mt-1">{selected.romaji}</div>
                            <div className="text-gray-500 text-xs mt-2">{selected.type} · unlocked from {selected.sectionId}</div>
                        </div>
                        <button onClick={() => setSelected(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white text-sm transition">✕</button>
                    </div>
                </div>
            )}
        </div>
    );
}
