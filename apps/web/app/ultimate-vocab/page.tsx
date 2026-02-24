"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Timer, Flame, CheckCircle, XCircle } from "lucide-react";
import { fisherYatesShuffle } from "@/lib/utils";
import { Header } from "@/components/header";

const VOCAB_DATA = [
    { word: "i", allowed: ["わたし", "ワタシ", "watashi"] },
    { word: "country", allowed: ["くに", "クニ", "kuni"] },
    { word: "office", allowed: ["かいしゃいん", "カイシャイン", "kaishain"] },
    { word: "mother", allowed: ["おかあさん", "オカアサン", "okaasan", "はは", "haha"] },
    { word: "father", allowed: ["おとうさん", "オトウサン", "otousan", "ちち", "chichi"] },
    { word: "sister", allowed: ["おねえさん", "オネエサン", "oneesan", "あね", "ane"] },
    { word: "brother", allowed: ["おにいさん", "オニイサン", "oniisan", "あに", "ani"] },
    { word: "bag", allowed: ["かばん", "カバン", "kaban"] },
    { word: "bank", allowed: ["ぎんこう", "ギンコウ", "ginkou"] },
    { word: "milk", allowed: ["みるく", "ミルク", "miruku", "ぎゅうにゅう", "gyuunyuu"] },
    { word: "breakfast", allowed: ["あさごはん", "アサゴハン", "asagohan", "朝ご飯"] },
    { word: "home", allowed: ["いえ", "イエ", "ie", "うち", "uchi", "家"] },
    { word: "tomorrow", allowed: ["あした", "アシタ", "ashita", "明日"] },
    { word: "today", allowed: ["きょう", "キョウ", "kyou", "今日"] },
    { word: "up", allowed: ["おきる", "オキル", "okiru", "起きる"] },
    { word: "good", allowed: ["いい", "イイ", "ii", "よい", "yoi"] },
    { word: "todrink", allowed: ["のむ", "ノム", "nomu", "飲む"] },
    { word: "person", allowed: ["ひと", "ヒト", "hito", "人"] },
    { word: "park", allowed: ["こうえん", "コウエン", "kouen", "公園"] },
    { word: "hotel", allowed: ["ほてる", "ホテル", "hoteru"] },
    { word: "restaurant", allowed: ["れすとらん", "レストラン", "resutoran"] },
    { word: "week", allowed: ["しゅう", "シュウ", "shuu", "せんしゅう", "senshuu", "こんしゅう", "konshuu", "らいしゅう", "raishuu"] },
    { word: "month", allowed: ["つき", "ツキ", "tsuki", "げつ", "getsu", "がつ", "gatsu"] },
    { word: "postoffice", allowed: ["ゆうびんきょく", "ユウビンキョク", "yuubinkyoku", "郵便局"] },
    { word: "hot", allowed: ["あつい", "アツイ", "atsui", "暑い"] },
    { word: "difficult", allowed: ["むずかしい", "ムズカシイ", "muzukashii", "難しい"] },
    { word: "fun", allowed: ["たのしい", "タノシイ", "tanoshii", "楽しい"] },
    { word: "night", allowed: ["よる", "ヨル", "yoru", "夜"] },
    { word: "goodnight", allowed: ["おやすみ", "おやすみなさい", "oyasumi", "oyasuminasai", "オヤスミ"] },
    { word: "kind", allowed: ["しんせつ", "シンセツ", "shinsetsu", "親切"] },
    { word: "car", allowed: ["くるま", "クルマ", "kuruma", "車"] },
    { word: "white", allowed: ["しろい", "シロイ", "shiroi", "白い"] },
    { word: "she", allowed: ["かのじょ", "カノジョ", "kanojo", "彼女"] },
    { word: "husband", allowed: ["ごしゅじん", "ゴシュジン", "goshujin", "ご主人"] },
    { word: "everyone", allowed: ["みなさん", "みんな", "minasan", "minna", "皆さん"] },
    { word: "big", allowed: ["おおきい", "オオキイ", "ookii", "大きい"] }
];

export default function UltimateVocabPage() {
    const [questions, setQuestions] = useState<typeof VOCAB_DATA>([]);
    const [index, setIndex] = useState(0);
    const [val, setVal] = useState("");
    const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [done, setDone] = useState(false);
    const [timer, setTimer] = useState(0);

    // Mascot logic & spicy text
    const [mascotImage, setMascotImage] = useState("/mascot/mascort_start.jpeg");
    const [message, setMessage] = useState("Ara ara~ Ready to test your limits, darling? Just type the translation in any script you like...");

    useEffect(() => {
        // init 10 random
        const shuffled = fisherYatesShuffle(VOCAB_DATA).slice(0, 10);
        setQuestions(shuffled);
    }, []);

    useEffect(() => {
        if (!done) {
            const t = setInterval(() => setTimer((x) => x + 1), 1000);
            return () => clearInterval(t);
        }
    }, [done]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userInput = val.trim().toLowerCase();
        if (!userInput || status !== "idle") return;

        const currentQ = questions[index];
        if (!currentQ) return;
        
        const isMatched = currentQ.allowed.includes(userInput);

        if (isMatched) {
            setStatus("correct");
            setCorrectCount((prev) => prev + 1);
            setMascotImage("/mascot/mascort_correct.png");
            window.dispatchEvent(new CustomEvent("mascot-state", { detail: "correct" }));
            
            if (correctCount + 1 === 10) {
                // Perfect 10 streak
                setMessage("Oh my~! 10 in a row?! You are so hard-working and perfect, darling~ I might just have to reward you properly... 💕");
            } else {
                setMessage("Mmm, yes! That's exactly right~ Give me more!");
            }
        } else {
            setStatus("wrong");
            setWrongCount((prev) => prev + 1);
            setMascotImage("/mascot/mascort_worng.jpeg");
            setMessage(`Wrong! The answer is one of: ${currentQ.allowed.join(", ")}. Do I need to punish you to make you remember?! 💢`);
            window.dispatchEvent(new CustomEvent("mascot-state", { detail: "wrong" }));
        }

        setTimeout(() => {
            if (index + 1 >= questions.length) {
                setDone(true);
            } else {
                setIndex(i => i + 1);
                setStatus("idle");
                setVal("");
                // keep the reward message if perfectly scored, else reset to tease after wrong
                if (isMatched && correctCount + 1 === 10) {
                    // keep
                } else if (!isMatched) {
                    setMessage("Don't make that mistake again, darling~ Next word!");
                    setMascotImage("/mascot/mascort_start.jpeg");
                } else {
                    setMessage("Good boy~ Keep going!");
                    setMascotImage("/mascot/mascort_start.jpeg");
                }
            }
        }, 3000);
    };

    const restart = () => {
        const shuffled = fisherYatesShuffle(VOCAB_DATA).slice(0, 10);
        setQuestions(shuffled);
        setIndex(0);
        setCorrectCount(0);
        setWrongCount(0);
        setTimer(0);
        setDone(false);
        setStatus("idle");
        setVal("");
        setMessage("Let's go again! Don't disappoint me this time~");
        setMascotImage("/mascot/mascort_start.jpeg");
    };

    if (questions.length === 0) return null;

    const currentWord = questions[index];
    const formatTime = (t: number) => `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;

    if (done) {
        const score = Math.round((correctCount / questions.length) * 100);
        return (
            <div className="min-h-dvh w-full flex flex-col items-center gap-6 text-gray-200 pb-16 px-4 md:px-8 relative bg-black pt-4 md:pt-8 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="w-full max-w-6xl z-10 flex flex-col items-center gap-4">
                    <Header />
                    <div className="w-full max-w-lg mt-8 text-center bg-black/50 border border-pink-500/30 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
                        <img src={score === 100 ? "/mascot/mascort_correct.png" : "/mascot/mascort_worng.jpeg"} alt="Result Output" className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-pink-500 mb-6 shadow-[0_0_20px_rgba(236,72,153,0.5)]" />
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-rose-400 mb-4">
                            {score === 100 ? "Perfect 100%!" : "Quiz Complete"}
                        </h1>
                        <p className="text-xl font-bold text-white mb-2">{score}% Score</p>
                        <p className="text-pink-300 italic mb-6">
                            {score === 100 
                                ? "Ara ara~ A perfect 10! You've been such a good student, Senpai. I think someone deserves a very special private lesson tonight... 😘💕" 
                                : score >= 70 
                                ? "Not bad, darling! But I know you can do better. Let's study harder next time~" 
                                : "Pathetic... Did you even study? Look at me when I'm talking to you! We're doing this again. 💢"}
                        </p>
                        <button onClick={restart} className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink-500/20 transition-all text-lg w-full">
                            {score === 100 ? "Play Again~" : "Accept Punishment & Retry"}
                        </button>
                        <Link href="/" className="block mt-4 text-sm text-gray-400 hover:text-pink-400 transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-dvh w-full flex flex-col items-center gap-6 text-gray-200 pb-16 px-4 md:px-8 relative bg-black pt-4 md:pt-8 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="w-full max-w-6xl z-10 flex flex-col items-center gap-4">
                <Header />
                <Link href="/" className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 transition underline-offset-4 hover:underline text-sm self-start sm:self-center">
                    <ArrowLeft size={16} /> Retreat to safety
                </Link>

                <div className="w-full max-w-2xl bg-black/60 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
                    {/* Header bar */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Flame className="w-6 h-6 text-pink-500 animate-pulse" />
                            <span className="font-bold text-pink-400 text-lg uppercase tracking-wider">Ultimate Trial</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
                            <span className="flex items-center gap-1"><Timer size={14} /> {formatTime(timer)}</span>
                            <span>{index + 1} / 10</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
                        <div className="h-full bg-linear-to-r from-pink-500 to-rose-500 transition-all duration-300" style={{ width: `${(index / 10) * 100}%` }} />
                    </div>

                    {/* Content area */}
                    <div className="flex flex-col md:flex-row gap-8 items-stretch">
                        
                        {/* Left Side: Mascot & Message */}
                        <div className="flex-1 flex flex-col justify-center items-center text-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 relative">
                            <div className="absolute inset-0 bg-linear-to-t from-pink-500/10 to-transparent pointer-events-none rounded-2xl" />
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)] relative">
                                <Image src={mascotImage} alt="Sensei" fill className="object-cover" />
                            </div>
                            <div className="text-pink-100 font-medium italic text-sm px-2 bg-black/50 p-3 rounded-xl border border-pink-500/20 w-full relative z-10">
                                "{message}"
                            </div>
                        </div>

                        {/* Right Side: Visual & Input */}
                        <div className="flex-[1.5] w-full flex flex-col gap-6">
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl bg-black">
                                {currentWord && <Image src={`/englishpics/${currentWord.word}.jpeg`} alt="Ultimate Visual" fill className="object-cover" priority />}
                            </div>

                            <form onSubmit={handleFormSubmit} className="relative">
                                <input
                                    type="text"
                                    value={val}
                                    onChange={(e) => setVal(e.target.value)}
                                    placeholder="Romaji, Hiragana, Kanja..."
                                    disabled={status !== "idle"}
                                    autoComplete="off"
                                    className={`w-full bg-black/50 border-2 rounded-xl px-4 py-4 text-center text-xl font-bold transition-all outline-hidden
                                        ${status === "correct" ? "border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]" : 
                                          status === "wrong" ? "border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]" : 
                                          "border-pink-500/30 focus:border-pink-500 text-white shadow-inner"}`}
                                />
                                {status === "correct" && <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 w-6 h-6 animate-in zoom-in" />}
                                {status === "wrong" && <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 w-6 h-6 animate-in zoom-in" />}
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
