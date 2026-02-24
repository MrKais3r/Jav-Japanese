"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { fisherYatesShuffle } from "@/lib/utils";
import { markSectionComplete, saveSectionResult, isSectionDone } from "@/lib/storage";
import { unlockReward, type RewardImage } from "@/lib/rewards";
import { Target, Gift, ImageIcon, ArrowLeft, Timer } from "lucide-react";
import Image from "next/image";
import { Header } from "./header";
import { GachaCardReveal } from "./GachaCardReveal";
import { quizData, grammarQuizData } from "@/data/quizData";

interface Question {
    character: string;
    answer: string;
    options: string[];
    prompt?: string;
    imageSrc?: string;
    tableContext?: {
        headers: string[];
        rows: string[][];
    };
}

const selectedCssMap: { [key: string]: string } = {
    correct: "bg-green-500 text-black",
    wrong: "bg-red-500 text-black",
    select: "bg-pink-500 text-black",
};

export default function QuizPage({ params }: { params: { lessonId: string; sectionId: string } }) {
    const { lessonId, sectionId } = params;

    const [questions, setQuestions] = useState<Question[]>([]);
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [timer, setTimer] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [, setWrong] = useState(0);
    const [saved, setSaved] = useState(false);
    const [selectedCss, setSelectedCss] = useState(selectedCssMap["select"]);
    
    /* Reward Tracking */
    const [reward, setReward] = useState<RewardImage | null>(null);
    const [showReward, setShowReward] = useState(false);
    const [showFailImage, setShowFailImage] = useState(false);
    const [wasAlready100, setWasAlready100] = useState(false);

    // 🔥 Load data dynamically based on lesson/section
    useEffect(() => {
        async function loadData() {
            let array: any[] | undefined;

            // String section IDs (e.g. "1-grammar-1", "1-culture-1") → grammarQuizData
            if (isNaN(Number(sectionId))) {
                array = grammarQuizData[sectionId as keyof typeof grammarQuizData];
            } else {
                // Numeric IDs → legacy kana quizData
                const sectionKey = `lesson${lessonId}_section${sectionId}`;
                array = quizData[sectionKey as keyof typeof quizData];
            }

            if (!array) {
                setQuestions([]);
                return;
            }

            const shuffled = fisherYatesShuffle(array).map((q: any) => ({
                ...q,
                options: fisherYatesShuffle(q.options),
            })) as Question[];
            setQuestions(shuffled);
        }

        loadData();
    }, [lessonId, sectionId]);

    const q = questions[index];


    // Timer
    useEffect(() => {
        const t = setInterval(() => setTimer((t) => t + 1), 1000);
        return () => clearInterval(t);
    }, []);

    function handleSelect(option: string) {
        if (!q) return;
        setSelected(option);
        const isCorrect = option === q.answer;

        setTimeout(() => {
            if (isCorrect) {
                setCorrect((c) => c + 1);
                setSelectedCss(selectedCssMap["correct"]);
            } else {
                setWrong((w) => w + 1);
                setSelectedCss(selectedCssMap["wrong"]);
            }
        }, 200);

        setTimeout(() => {
            setSelected(null);
            setIndex((prev) => prev + 1);
            setSelectedCss(selectedCssMap["select"]);
        }, 600);
    }
    // Quiz complete
    useEffect(() => {
        if (questions.length > 0 && index >= questions.length && !saved) {
            const score = Math.round((correct / questions.length) * 100);
            const pastScore = isSectionDone(Number(lessonId), sectionId as any);

            saveSectionResult(Number(lessonId), sectionId as any, Math.max(score, pastScore));
            markSectionComplete(Number(lessonId), sectionId as any);

            if (pastScore === 100) {
                setWasAlready100(true);
            }

            // Only give reward if score is 100 AND it wasn't already 100
            if (score === 100 && pastScore < 100) {
                const r = unlockReward(sectionId);
                if (r) {
                    setReward(r);
                    setShowReward(true);
                }
            } else if (score < 100) {
                setShowFailImage(true);
            }

            setSaved(true);
        }
    }, [index, questions.length, saved, correct, lessonId, sectionId]);

    // Loading state
    if (questions.length === 0) {
        return <div className="min-h-dvh bg-black flex items-center justify-center text-white">Loading quiz...</div>;
    }

    // Format timer
    const formatTime = (t: number) =>
        `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;

    const resetAll = () => {
        setIndex(0);
        setCorrect(0);
        setWrong(0);
        setSaved(false);
        setTimer(0);
        setShowReward(false);
        setShowFailImage(false);
        setQuestions(fisherYatesShuffle([...questions]));
    };

    /* ── REWARD MODAL ─────────────────────────────────────────── */

    if (!q) {
        const score = Math.round((correct / questions.length) * 100);

        return (
            <div className="min-h-dvh w-full flex flex-col items-center gap-6 text-gray-200 pb-16 px-4 md:px-8 relative bg-black pt-4 md:pt-8 overflow-hidden">
                {/* Background ambient effects */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="w-full max-w-6xl z-10 flex flex-col items-center gap-4">
                    {showReward && reward && (
                        <GachaCardReveal 
                            card={{
                                src: reward.src,
                                title: reward.title || "Reward Unlocked",
                                rarity: reward.rarity || "Common"
                            }} 
                            onClose={() => setShowReward(false)} 
                        />
                    )}
                    <Header />

                    <div className="flex flex-col items-center justify-center w-full max-w-lg mt-8">
                        <div className="mb-6 flex flex-col items-center text-center">
                            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-rose-400 mb-2 flex items-center gap-2">
                                <span className="text-4xl">🎉</span> Perfect Score!
                            </h1>
                        </div>

                        <Card className="w-full bg-black/40 border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden relative">
                            <CardContent className="p-6 sm:p-10 flex flex-col items-center gap-8 relative z-10">
                                {showFailImage && (
                                    <div className="w-full relative aspect-video rounded-xl overflow-hidden shadow-2xl shadow-red-500/20 border border-red-500/30">
                                        <Image
                                            src="/photo/try_again.jpg"
                                            alt="Try Again"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-red-900/80 via-transparent to-transparent pointer-events-none" />
                                        <div className="absolute bottom-3 left-0 right-0 flex justify-center text-center">
                                            <span className="bg-red-950/80 text-red-100 text-xs font-bold px-3 py-1.5 rounded-full border border-red-500/50 backdrop-blur-sm">
                                                PUNISHMENT TIME? 💢
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-6xl font-bold text-white mb-2">
                                        {score}
                                        <span className="text-2xl text-gray-400">%</span>
                                    </div>
                                    <div className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                        {correct} / {questions.length} correct
                                    </div>
                                    <div className="flex justify-center items-center gap-1 text-xs text-gray-500 mt-2">
                                        <Timer size={14} /> {formatTime(timer)}
                                    </div>
                                </div>

                                <div
                                    className={`border rounded-xl p-4 transition-colors ${score === 100 ? "bg-pink-950/20 border-pink-500/30" : "bg-red-950/20 border-red-500/30"}`}
                                >
                                    {score === 100 ? (
                                        wasAlready100 ? (
                                            <p className="text-pink-300 text-sm font-medium">
                                                Ara ara~ 100% again? You&apos;ve already earned a reward here, but I love seeing you practice so hard! Keep it up, senpai~ 💕
                                            </p>
                                        ) : (
                                            <p className="text-pink-300 text-sm font-medium">
                                                Ara ara~ Perfect score?! Senpai clearly has been studying hard!!
                                                Here is your reward~ 👀💕
                                            </p>
                                        )
                                    ) : score >= 80 ? (
                                        <p className="text-red-300 text-sm font-medium">
                                            So close senpai... but I only reward perfection. You need 100%
                                            to earn my prize. Try again! 😌🔥
                                        </p>
                                    ) : score >= 50 ? (
                                        <p className="text-red-400 text-sm font-medium">
                                            Hmm~ not bad… but 100% is the rule! Baka senpai... do it again
                                            if you want the reward. 😏
                                        </p>
                                    ) : (
                                        <p className="text-red-500 text-sm font-bold animate-pulse">
                                            Ehh~? Only {score}%? Pathetic... Do you even want the reward,
                                            senpai?! Back to studying!! 💢
                                        </p>
                                    )}
                                </div>

                                {reward && score === 100 && (
                                    <button
                                        onClick={() => setShowReward(true)}
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-500 border border-pink-400 text-white shadow-[0_0_15px_rgba(219,39,119,0.5)] transition-all"
                                    >
                                        <Gift size={18} className="animate-bounce" /> Claim your reward!
                                    </button>
                                )}

                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={resetAll}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold transition"
                                    >
                                        <Target size={18} /> Retry Quiz
                                    </button>
                                </div>

                                <div className="flex flex-col items-center gap-3 pt-2">
                                    <Link
                                        href={`/lesson/${lessonId}`}
                                        className="flex items-center justify-center gap-1.5 text-gray-400 hover:text-pink-400 text-sm underline-offset-4 hover:underline transition"
                                    >
                                        <ArrowLeft size={16} /> Back to Lesson {lessonId}
                                    </Link>
                                    <Link
                                        href="/gallery"
                                        className="flex items-center justify-center gap-1.5 text-gray-500 hover:text-pink-400 text-xs underline-offset-4 hover:underline transition"
                                    >
                                        <ImageIcon size={14} /> Gallery
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-dvh w-full flex flex-col items-center gap-6 text-gray-200 pb-16 px-4 md:px-8 relative bg-black pt-4 md:pt-8 overflow-hidden">
            {/* Background ambient effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="w-full max-w-6xl z-10 flex flex-col items-center gap-4">
                <Header />
                <Link
                    href={`/lesson/${lessonId}`}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 transition underline-offset-4 hover:underline text-sm self-start sm:self-center"
                >
                    {`← Back to lesson ${lessonId} overview`}
                </Link>
            <Card className="w-full max-w-3xl bg-black/40 border-white/10 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-pink-400">
                        Section {sectionId}: Multiple Choice
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* Reference table shown as exercise context (e.g. character data table) */}
                    {q.tableContext && (
                        <div className="overflow-x-auto rounded-lg border border-white/10 text-sm">
                            <table className="w-full text-center">
                                <thead>
                                    <tr className="bg-pink-500/20 text-pink-300 font-bold">
                                        {q.tableContext.headers.map((h: string, i: number) => (
                                            <th key={i} className="px-3 py-2 border border-white/10" dangerouslySetInnerHTML={{ __html: h }} />
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {q.tableContext.rows.map((row: string[], ri: number) => (
                                        <tr key={ri} className={ri % 2 === 0 ? "bg-white/5" : "bg-white/2"}>
                                            {row.map((cell: string, ci: number) => (
                                                <td key={ci} className={`px-3 py-2 border border-white/10 ${ci === 0 ? "font-bold text-pink-300" : ""}`} dangerouslySetInnerHTML={{ __html: cell }} />
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="w-full bg-pink-500/90 text-black text-sm p-3 rounded text-center">
                        {q.prompt || "Choose the correct answer for:"}
                        <span className="text-white block mt-2 text-xl font-bold" dangerouslySetInnerHTML={{ __html: q.character }} />
                    </div>
                    {q.imageSrc && (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10">
                            <Image src={q.imageSrc} alt="lesson visual" fill className="object-cover" />
                        </div>
                    )}

                    <div className="space-y-3">
                        {q.options.map((opt: string, i: number) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(opt)}
                                disabled={!!selected}
                                className={`w-full text-left px-4 py-3 rounded border border-white/10 transition ${
                                    selected === opt ? selectedCss : "bg-black/40"
                                }`}
                            >
                                <span className="font-bold">{String.fromCharCode(65 + i)}:</span>
                                <span dangerouslySetInnerHTML={{ __html: opt }} />
                            </button>
                        ))}
                    </div>

                    <div className="w-full h-2 bg-white/10 rounded">
                        <div
                            className="h-full bg-pink-500 rounded"
                            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>

                    <div className="text-center text-sm text-gray-400">
                        {index + 1}/{questions.length}
                    </div>

                    <div className="text-center text-xs text-gray-400">
                        Time Elapsed: {formatTime(timer)}
                    </div>
                </CardContent>
                </Card>
            </div>
        </div>
    );
}
