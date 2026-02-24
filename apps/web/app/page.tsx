"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { data } from "@/data/mainLesson";
import { useEffect, useState } from "react";
import AgeGate from "@/components/AgeGate";
import { getAppData, getName } from "@/lib/storage";
import { Header } from "@/components/header";
import { BookOpen, Sparkles, Navigation, PlayCircle, Flame } from "lucide-react";

export default function Home() {
    const [verified, setVerified] = useState(false);
    const [appData, setAppData] = useState<any>(null); // SSR safe
    const [name, setName] = useState<string>("");

    useEffect(() => {
        // this runs only on client, so localStorage is available
        setAppData(getAppData());
        setName(getName());
    }, []);

    const isLessonTouched = (lessonId: number) => {
        if (!appData) return false; // SSR safe fallback
        const lessonKey = `lesson_${lessonId}`;
        return appData.progress?.[lessonKey]?.sectionsCompleted?.length > 0;
    };

    return (
        <div className="min-h-dvh w-full flex flex-col items-center justify-start gap-10 p-4 md:p-8 relative overflow-hidden bg-black text-white">
            {/* Background ambient effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

            {!verified && <AgeGate onVerified={() => setVerified(true)} />}

            <div className="w-full max-w-6xl z-10">
                <Header />
            </div>

            {/* Intro */}
            <div className="w-full max-w-6xl flex flex-col gap-8 relative z-10">
                {appData?.user?.streak?.count > 0 && (
                    <div className="w-full bg-linear-to-r from-orange-600/20 via-rose-600/20 to-transparent border border-orange-500/20 rounded-2xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-1000">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] animate-pulse">
                                <Flame className="w-6 h-6 text-white fill-white" />
                            </div>
                            <div>
                                <div className="text-xl font-black text-orange-400 italic uppercase tracking-tighter">
                                    {appData.user.streak.count} DAY STREAK! 🔥
                                </div>
                                <div className="text-xs text-orange-300/60 font-medium italic">
                                    You're on fire, {name || "Darling"}-san! Keep it up~
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:block text-[10px] font-black text-orange-400/40 uppercase tracking-[0.2em]">
                            Daily Study Heat Index
                        </div>
                    </div>
                )}

                <Card className="border-0 bg-white/[0.03] backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden ring-1 ring-white/10 transition-all hover:ring-white/20">
                    <CardHeader className="space-y-4 p-8 md:p-10 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <CardTitle className="text-gray-100 text-3xl md:text-4xl font-extrabold tracking-tight">
                                Hii{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 drop-shadow-sm">
                                    {name || "Guest"}
                                </span>
                                -san!
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="flex flex-col lg:flex-row gap-10 p-8 md:p-10 pt-2 items-center">
                        <div className="text-base md:text-lg leading-relaxed text-gray-300 flex-1 space-y-6">
                            <p>
                                Welcome back to{" "}
                                <span className="text-pink-400 font-semibold px-1 bg-pink-500/10 rounded-md">
                                    Jav Nihongo
                                </span>
                                . You've earned <span className="text-white font-bold">{appData?.user?.xp || 0} XP</span> so far. 
                                {appData?.user?.xp < 500 ? " Just getting started? Don't worry, I'll take good care of you~" : " You're becoming quite the regular, aren't you?"}
                            </p>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                                    <div className="text-2xl font-black text-white">{appData?.user?.streak?.count || 0}</div>
                                    <div className="text-[10px] uppercase text-zinc-500 font-bold">Streak</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                                    <div className="text-2xl font-black text-white">{appData?.user?.xp || 0}</div>
                                    <div className="text-[10px] uppercase text-zinc-500 font-bold">Total XP</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                                    <div className="text-2xl font-black text-white">{appData?.user?.inventory?.length || 0}</div>
                                    <div className="text-[10px] uppercase text-zinc-500 font-bold">Cards</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                                    <div className="text-2xl font-black text-white">Lv.{Math.floor((appData?.user?.xp || 0) / 1000) + 1}</div>
                                    <div className="text-[10px] uppercase text-zinc-500 font-bold">Level</div>
                                </div>
                            </div>

                            <p className="text-sm italic text-zinc-400">
                                Tip: Completing a lesson with 100% unlocks rare collectible cards in your Reward gallery!
                            </p>
                        </div>

                        <div className="relative w-full lg:w-[350px] shrink-0 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-rose-500/30 blur-2xl rounded-3xl group-hover:scale-105 transition-transform duration-500" />
                            <img
                                src={"/photo/learn_japanese_with_us.jpg"}
                                alt="lesson visual"
                                className="w-full h-auto object-cover rounded-3xl relative z-10 border border-white/10 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Navigation */}
                <div className="flex items-center gap-3 mt-4 mb-2">
                    <Navigation className="w-6 h-6 text-pink-400" />
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        Select a Lesson
                    </h2>
                    <div className="h-px bg-gradient-to-r from-pink-500/50 to-transparent flex-1 ml-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-20">
                    {Object.keys(data).map((id) => {
                        const lesson = data[id as keyof typeof data];
                        const touched = isLessonTouched(parseInt(id));

                        return (
                            <Link
                                key={id}
                                href={`/lesson/${id}`}
                                className="group relative flex flex-col p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-pink-500/30 transition-all duration-300 overflow-hidden"
                            >
                                {/* Background glow effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/0 group-hover:from-pink-500/5 group-hover:to-pink-600/5 transition-colors duration-500" />

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 group-hover:bg-white/10 transition-colors">
                                        <BookOpen className="w-3.5 h-3.5 text-pink-400" />
                                        Lesson {id}
                                    </div>
                                    {touched && (
                                        <div
                                            className="flex items-center gap-1 px-2 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.2)]"
                                            title="In Progress"
                                        >
                                            <Flame className="w-3 h-3" />
                                            In Progress
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-100 mb-2 relative z-10 group-hover:text-pink-100 transition-colors">
                                    {lesson.title}
                                </h3>

                                <div className="mt-auto pt-4 flex items-center text-sm font-medium text-pink-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 relative z-10">
                                    Start Learning <Navigation className="w-4 h-4 ml-1 rotate-90" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
