"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {
    Eye,
    EyeOff,
    BookOpen,
    Target,
    ArrowLeft,
    Check,
    X,
    PartyPopper,
    Gift,
    ImageIcon,
    Timer,
} from "lucide-react";
import { fisherYatesShuffle, transformSectionIdString } from "@/lib/utils";
import { markSectionComplete, saveSectionResult, isSectionDone } from "@/lib/storage";
import { unlockReward, type RewardImage } from "@/lib/rewards";
import { Header } from "./header";
import { GachaCardReveal } from "./GachaCardReveal";
import { vocabData, VocabEntry } from "@/data/vocabData";

/* ─── Types ─────────────────────────────────────────────────── */
type QuizCard = VocabEntry & { options: string[] };
type Phase = "study" | "quiz" | "done";

const STATE_COLORS = {
    default: "bg-white/5 border-white/10 hover:border-pink-400/50 hover:bg-pink-400/5",
    correct: "bg-green-500/20 border-green-500",
    wrong: "bg-red-500/20 border-red-500",
};

function isKanaSection(id: string) {
    return id.includes("hiragana") || id.includes("katakana") || id.includes("kana-match");
}

function getQuestionLabel(id: string) {
    if (id.includes("culture")) return "Select the correct answer:";
    if (id.includes("kana-match")) return "Which Hiragana matches this Katakana?";
    if (isKanaSection(id)) return "What is the romaji for this character?";
    if (id.includes("numbers") && id.includes("practice-2")) return "Solve the math problem:";
    if (id.includes("numbers") && id.includes("practice-3")) return "Convert to Arabic numerals:";
    if (id.includes("numbers") && id.includes("practice"))
        return "How do you read this number in Japanese?";
    if (id.includes("numbers")) return "What number is this?";
    if (id.includes("greetings") && id.includes("practice"))
        return "Choose the appropriate expression for this situation:";
    if (id.includes("greetings")) return "What does this expression mean?";
    return "What does this mean?";
}

/* ─── Kana chart grid ────────────────────────────────────────
   Hiragana / Katakana are displayed in a standard 5-column 
   あいうえお chart (a, i, u, e, o columns, one row per consonant).
   Each entry is placed by its romaji ending letter.            */
const VOWEL_ORDER = ["a", "i", "u", "e", "o"] as const;



function buildKanaChart(entries: VocabEntry[]): (VocabEntry | null)[][] {
    // Group entries into rows of 5 by their romaji vowel
    // Works for basic hiragana/katakana: each romaji ends in a vowel
    const rows: (VocabEntry | null)[][] = [];
    // Chunk into groups of 5 preserving original order (already in aiueo order per row)
    for (let i = 0; i < entries.length; i += 5) {
        const chunk = entries.slice(i, i + 5);
        // Pad to 5 if the last row is shorter (e.g. や ゆ よ row)
        const row: (VocabEntry | null)[] = [];
        let vowelIdx = 0;
        for (const vowel of VOWEL_ORDER) {
            const match = chunk.find((e) => e.english.endsWith(vowel));
            if (match) {
                row.push(match);
            } else if (chunk.length < 5) {
                // sparse row — put null for missing vowels
                row.push(null);
            } else {
                row.push(chunk[vowelIdx] ?? null);
            }
            vowelIdx++;
        }
        rows.push(row);
    }
    return rows;
}

/* ─── Component ─────────────────────────────────────────────── */
export default function VocabPage({ params }: { params: { lessonId: string; sectionId: string } }) {
    const { lessonId, sectionId } = params;
    const vocab = vocabData[sectionId];
    const isKana = isKanaSection(sectionId);
    const kanaChart = isKana && vocab ? buildKanaChart(vocab) : null;

    /* State */
    const [phase, setPhase] = useState<Phase>("study");
    const [cards, setCards] = useState<QuizCard[]>([]);
    const [studyIndex, setStudyIndex] = useState(0);

    /* Quiz */
    const [quizIndex, setQuizIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<Record<string, string>>({});
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [saved, setSaved] = useState(false);
    const [timer, setTimer] = useState(0);
    const [showHint, setShowHint] = useState(false); // quiz-only romaji hint

    /* Reward */
    const [reward, setReward] = useState<RewardImage | null>(null);
    const [showReward, setShowReward] = useState(false);
    const [showFailImage, setShowFailImage] = useState(false);
    const [wasAlready100, setWasAlready100] = useState(false);

    /* Build quiz cards */
    useEffect(() => {
        if (!vocab) return;
        const allAnswers = vocab.map((v) => v.english);
        const built: QuizCard[] = vocab.map((v) => {
            const distractors = fisherYatesShuffle(allAnswers.filter((e) => e !== v.english)).slice(
                0,
                3
            );
            return { ...v, options: fisherYatesShuffle([v.english, ...distractors]) };
        });
        setCards(fisherYatesShuffle(built));
    }, [sectionId, vocab]);

    /* Timer */
    useEffect(() => {
        if (phase !== "quiz") return;
        const t = setInterval(() => setTimer((s) => s + 1), 1000);
        return () => clearInterval(t);
    }, [phase]);

    /* Save + reward on done */
    useEffect(() => {
        if (phase === "done" && !saved && cards.length > 0) {
            const score = Math.round((correct / cards.length) * 100);
            const pastScore = isSectionDone(Number(lessonId), sectionId as any);

            saveSectionResult(Number(lessonId), sectionId as any, Math.max(score, pastScore));
            markSectionComplete(Number(lessonId), sectionId as any);

            if (pastScore === 100) {
                setWasAlready100(true);
            }

            // only give reward if score is 100 AND it wasn't already 100
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
    }, [phase, saved, cards.length, correct, lessonId, sectionId]);

    if (!vocab) {
        return (
            <div className="flex flex-col items-center justify-center h-dvh text-white text-center px-4">
                <h1 className="text-3xl mb-2 text-pink-400">Section Not Found</h1>
                <p className="text-gray-400 mb-6">
                    This section hasn&apos;t been added yet. Coming soon~
                </p>
                <Link href={`/lesson/${lessonId}`} className="underline text-pink-400">
                    ← Back to Lesson {lessonId}
                </Link>
            </div>
        );
    }

    const formatTime = (t: number) =>
        `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;

    const startQuiz = () => {
        setPhase("quiz");
        setShowHint(false);
    };

    const resetAll = () => {
        setPhase("study");
        setStudyIndex(0);
        setQuizIndex(0);
        setCorrect(0);
        setWrong(0);
        setSaved(false);
        setTimer(0);
        setShowReward(false);
        setShowFailImage(false);
    };


    /* ── STUDY PHASE ─────────────────────────────────────────── */
    if (phase === "study") {
        const word = vocab[studyIndex]!;

        return (
            <div className="min-h-dvh w-full flex flex-col items-center gap-6 text-gray-200 pb-16 px-4 md:px-8 relative bg-black pt-4 md:pt-8 overflow-hidden">
                {/* Background ambient effects */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="w-full max-w-6xl z-10 flex flex-col items-center gap-4">
                <Header />

                <Link
                    href={`/lesson/${lessonId}`}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 transition underline-offset-4 hover:underline text-sm"
                >
                    <ArrowLeft size={16} /> Back to Lesson {lessonId}
                </Link>

                {/* Progress bar */}
                <div className="w-full max-w-2xl px-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span className="flex items-center gap-1.5">
                            <BookOpen size={14} /> Study Mode
                        </span>
                       
                    </div>
                  
                </div>

                {/* Flashcard — all 3 rows always visible */}
                <Card className="w-full max-w-2xl bg-black/40 border-white/10 shadow-xl select-none">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center gap-2 text-pink-400 text-sm font-normal tracking-widest uppercase">
                            <BookOpen size={16} /> {transformSectionIdString(sectionId)} — Study Mode
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                        {/* Card face — always shows all 3 */}
                        <div className="flex flex-col items-center gap-3 py-10 min-h-[160px] justify-center text-center">
                            {/* Japanese character / expression */}
                            <div
                                className={`font-bold text-white tracking-wide ${
                                    isKana
                                        ? "text-9xl leading-none"
                                        : word.japanese.length > 20
                                          ? "text-xl leading-relaxed max-w-lg"
                                          : "text-4xl"
                                }`}
                            >
                                {word.japanese}
                            </div>
                            {/* Romaji — always visible */}
                            {word.romaji ? (
                                <div
                                    className={`text-pink-300/80 ${isKana ? "text-2xl tracking-widest" : "text-lg"}`}
                                >
                                    {word.romaji}
                                </div>
                            ) : (
                                /* For kana sections romaji="" but english IS the romaji */
                                <div className="text-pink-300/80 text-2xl tracking-widest">
                                    {word.english}
                                </div>
                            )}
                            {/* English meaning — always visible (for vocab/greetings/numbers) */}
                            {!isKana && (
                                <div className="text-green-300 text-xl font-semibold">
                                    {word.english}
                                </div>
                            )}
                        </div>

                        {/* Navigation — Prev | Start Quiz | Next */}

                          <div className="flex gap-2 items-center justify-center pt-2">

                            {/* Start Quiz — always in the middle */}
                            <button
                                onClick={startQuiz}
                                className="px-4 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-sm font-bold transition shrink-0 shadow-lg shadow-pink-500/20 flex justify-center items-center gap-2"
                            >
                                <Target size={18} /> Start Quiz
                            </button>

                        </div>
                       
                    </CardContent>
                </Card>

                {/* Kana chart / word grid */}
                <Card className="w-full max-w-2xl bg-black/40 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-sm text-gray-400 font-normal">
                            {isKana ? "Chart — click to jump" : `All ${vocab.length} items`}
                        </CardTitle>

                        
                    </CardHeader>
                    <CardContent>
                        {isKana && kanaChart ? (
                            /* ── 5-column kana chart layout ── */
                            <div className="overflow-x-auto">
                                {/* Header row: vowels */}
                                <div
                                    className="grid gap-1.5 mb-1.5"
                                    style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
                                >
                                    {["a", "i", "u", "e", "o"].map((v) => (
                                        <div
                                            key={v}
                                            className="text-center text-[10px] text-gray-600 uppercase tracking-widest py-0.5"
                                        >
                                            {v}
                                        </div>
                                    ))}
                                </div>
                                {/* Kana rows */}
                                {kanaChart.map((row, ri) => (
                                    <div
                                        key={ri}
                                        className="grid gap-1.5 mb-1.5"
                                        style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
                                    >
                                        {row.map((cell, ci) => {
                                            if (!cell)
                                                return <div key={ci} className="aspect-square" />;
                                            const idx = vocab.indexOf(cell);
                                            const isActive = idx === studyIndex;
                                            return (
                                                <button
                                                    key={ci}
                                                    onClick={() => setStudyIndex(idx)}
                                                    className={`aspect-square rounded-lg border flex flex-col items-center justify-center gap-0 transition-all group ${
                                                        isActive
                                                            ? "border-pink-500 bg-pink-500/20 scale-105 shadow-md shadow-pink-500/20"
                                                            : "border-white/5 bg-white/3 hover:border-pink-400/40 hover:bg-pink-400/5"
                                                    }`}
                                                >
                                                    <span
                                                        className={`font-bold leading-tight ${isActive ? "text-white" : "text-pink-200"} ${isKana ? "text-xl" : "text-base"}`}
                                                    >
                                                        {cell.japanese}
                                                    </span>
                                                    <span
                                                        className={`text-[9px] mt-0.5 ${isActive ? "text-pink-300" : "text-gray-600"}`}
                                                    >
                                                        {cell.english}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* ── Vocab list ── */
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {vocab.map((v, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setStudyIndex(i)}
                                        className={`text-left px-3 py-2 rounded-lg border text-sm transition gap-1 flex items-center ${
                                            i === studyIndex
                                                ? "border-pink-500 bg-pink-500/10 text-white"
                                                : "border-white/5 bg-white/3 text-gray-400 hover:border-white/20"
                                        }`}
                                    >
                                        <span className="text-pink-300 font-medium">
                                            {v.japanese}
                                        </span>
                                        {v.romaji && (
                                            <span className="text-gray-500 mx-1.5 text-xs">
                                                {v.romaji}
                                            </span>
                                        )}
                                        <span className="text-gray-400 text-xs">{v.english}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                    </CardContent>
                       
                </Card>
            </div>
        </div>
    );
    }

    /* ── QUIZ PHASE ──────────────────────────────────────────── */
    if (phase === "quiz" && quizIndex < cards.length) {
        const q = cards[quizIndex]!;

        const handleSelect = (opt: string) => {
            if (selected) return;
            setSelected(opt);
            const isCorrect = opt === q.english;
            const newState: Record<string, string> = {};
            newState[q.english] = STATE_COLORS.correct;
            if (!isCorrect) newState[opt] = STATE_COLORS.wrong;
            setBtnState(newState);
            if (isCorrect) setCorrect((c) => c + 1);
            else setWrong((w) => w + 1);
            setTimeout(() => {
                setSelected(null);
                setBtnState({});
                if (quizIndex + 1 >= cards.length) setPhase("done");
                else {
                    setQuizIndex((i) => i + 1);
                    setShowHint(false);
                }
            }, 900);
        };

        return (
                        <div className="min-h-dvh w-full flex flex-col items-center gap-6 text-gray-200 pb-16 px-4 md:px-8 relative bg-black pt-4 md:pt-8 overflow-hidden">
                                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
                <Header />
                <Link
                    href={`/lesson/${lessonId}`}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 transition underline-offset-4 hover:underline text-sm"
                >
                    <ArrowLeft size={16} /> Back to Lesson {lessonId}
                </Link>

                <Card className="w-full max-w-2xl bg-black/40 border-white/10 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center gap-2 text-pink-400">
                            <Target size={20} /> Quiz:{" "}
                            {transformSectionIdString(sectionId.toLocaleUpperCase())}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        {/* Progress */}
                        <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>
                                    {quizIndex + 1} / {cards.length}
                                </span>
                                <span className="flex justify-center items-center gap-1">
                                    <Timer size={14} /> {formatTime(timer)}
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full">
                                <div
                                    className="h-full bg-pink-500 rounded-full transition-all duration-500"
                                    style={{ width: `${((quizIndex + 1) / cards.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Question */}
                        <div className="text-center bg-pink-500/10 border border-pink-500/30 rounded-xl p-6 relative">
                            <div className="text-xs text-gray-500 mb-3 uppercase tracking-widest">
                                {getQuestionLabel(sectionId)}
                            </div>
                            <div
                                className={`font-bold text-white ${
                                    isKana
                                        ? "text-9xl leading-none"
                                        : q.japanese.length > 20
                                          ? "text-xl leading-relaxed my-2"
                                          : "text-4xl"
                                }`}
                            >
                                {q.japanese}
                            </div>

                            {/* Romaji hint (quiz only) */}
                            {q.romaji && (
                                <div className="mt-3 flex flex-col items-center justify-start gap-2 h-14">
                                    <button
                                        onClick={() => setShowHint((h) => !h)}
                                        className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition ${
                                            showHint
                                                ? "border-pink-500 bg-pink-500/20 text-pink-300"
                                                : "border-white/10 bg-white/5 text-gray-500 hover:text-pink-300 hover:border-pink-500/40"
                                        }`}
                                    >
                                        {showHint ? (
                                            <>
                                                <EyeOff size={14} /> Hide romaji
                                            </>
                                        ) : (
                                            <>
                                                <Eye size={14} /> show romaji
                                            </>
                                        )}
                                    </button>
                                    {showHint && (
                                        <span
                                            className={`text-pink-300/80 animate-pulse ${isKana ? "text-xl tracking-widest" : "text-sm"}`}
                                        >
                                            {isKana ? q.english : q.romaji}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-3">
                            {q.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(opt)}
                                    disabled={!!selected}
                                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${btnState[opt] ?? STATE_COLORS.default}`}
                                >
                                    <span className="font-bold text-pink-400 mr-2">
                                        {String.fromCharCode(65 + i)}.
                                    </span>
                                    {opt}
                                </button>
                            ))}
                        </div>

                        {/* Skip back to study */}
                        <div className="flex items-center justify-between text-xs text-gray-600">
                            <span className="flex items-center gap-3">
                                <span className="flex justify-center items-center gap-1">
                                    <Check size={14} className="text-green-500" /> {correct}
                                </span>
                                <span className="flex justify-center items-center gap-1">
                                    <X size={14} className="text-red-500" /> {wrong}
                                </span>
                            </span>
                            <button
                                onClick={() => {
                                    setPhase("study");
                                    setStudyIndex(0);
                                }}
                                className="flex justify-center items-center gap-1 underline-offset-4 hover:underline hover:text-pink-400 transition"
                            >
                                <ArrowLeft size={14} /> Study again
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    /* ── DONE PHASE ──────────────────────────────────────────── */
    const score = cards.length > 0 ? Math.round((correct / cards.length) * 100) : 0;
    return (
        <div className="min-h-dvh w-full flex flex-col items-center justify-center gap-6 p-4 md:p-8 bg-black text-white relative overflow-x-hidden pb-24 text-center">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-6xl z-10 flex flex-col items-center gap-6">
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

                <h1 className="flex justify-center items-center gap-3 text-3xl font-bold text-pink-400">
                    {score === 100 ? (
                        <>
                            <PartyPopper size={32} /> Perfect Score!
                        </>
                    ) : (
                        <>
                            <Target size={32} /> Quiz Complete!
                        </>
                    )}
                </h1>

                <Card className="w-full max-w-md bg-black/40 border-white/10 group">
                    <CardContent className="pt-6 space-y-4">
                        {showFailImage && (
                            <div className="relative w-full aspect-[5/4] rounded-xl overflow-hidden mb-4 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                <Image
                                    src="/photo/try_again.jpg"
                                    alt="Try again senpai"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent pointer-events-none" />
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
                                {correct} / {cards.length} correct
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
                                        Ara ara~ 100% again? You&apos;ve already earned this reward, but I love seeing you practice so hard! Keep it up, senpai~ 💕
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
                                    senpai?! Back to studying!! ��
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

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={resetAll}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm transition"
                            >
                                <BookOpen size={16} /> Study Again
                            </button>
                            <button
                                onClick={() => {
                                    setPhase("quiz");
                                    setQuizIndex(0);
                                    setCorrect(0);
                                    setWrong(0);
                                    setSaved(false);
                                    setTimer(0);
                                    setShowReward(false);
                                    setShowHint(false);
                                    setShowFailImage(false);
                                    setCards(fisherYatesShuffle([...cards]));
                                }}
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
    );
}
