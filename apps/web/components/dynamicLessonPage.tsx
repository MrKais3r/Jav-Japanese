"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { data } from "@/data/mainLesson";
import SectionStatus from "./SectionStatus";
import { quizData } from "@/data/quizData";
import { vocabData } from "@/data/vocabData";

// Determine if a section ID has content available
function isSectionAvailable(sectionId: string | number | undefined): boolean {
    if (!sectionId) return false;
    const key = String(sectionId);
    // String ID (e.g. "1-vocab-1") → check vocabData
    if (isNaN(Number(key))) {
        return key in vocabData;
    }
    // Numeric ID → check quizData
    return false; // quizData check handled per lesson below
}

// Badge label for section type
function getSectionBadge(sectionId: string | number): string {
    const key = String(sectionId);
    if (key.includes("hiragana")) return "Hiragana";
    if (key.includes("katakana")) return "Katakana";
    if (key.includes("greetings")) return "Greetings";
    if (key.includes("numbers")) return "Numbers";
    if (key.includes("vocab")) return "Vocab";
    if (key.includes("grammar")) return "Grammar";
    return "Quiz";
}

export default function Lesson({ params }: { params: { lessonId: string } }) {
    const { lessonId } = params;
    const lesson = data[lessonId as keyof typeof data];

    return (
        <div className="min-h-dvh w-full flex flex-col items-center justify-start gap-10 p-4 md:p-8 relative bg-black text-white pb-24 overflow-x-hidden">
            {/* Background ambient effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-6xl z-10 flex flex-col items-center gap-6">
                <Header />
                <Link
                    href="/"
                    className="self-start flex items-center gap-2 text-gray-400 hover:text-pink-400 transition underline-offset-4 hover:underline text-sm"
                >
                    ← Back to Home
                </Link>

                <Card className="w-full max-w-5xl border-0 bg-white/[0.03] backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden ring-1 ring-white/10 transition-all hover:ring-white/20">
                    <CardHeader className="border-b border-white/5 pb-8 pt-10 px-8">
                        <CardTitle className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 drop-shadow-sm">
                            Lesson {lessonId}: <span className="text-white">{lesson?.title}</span>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-10 p-8 sm:p-10 text-sm text-gray-300 leading-relaxed">
                        {lesson?.sections?.map((sec, i) => {
                            return (
                                <div key={i} className="space-y-5">
                                    <h2 className="text-xl font-bold tracking-tight text-pink-300 flex items-center gap-3">
                                        <span className="w-8 h-px bg-pink-500/50"></span>
                                        {sec.header}
                                    </h2>

                                    <div className="flex flex-col gap-2">
                                        {sec.items.map((item, idx) => {
                                            const sectionId = (item as any).section;
                                            const sectionKey = String(sectionId);
                                            const isString = sectionId && isNaN(Number(sectionKey));
                                            const isNumeric =
                                                sectionId && !isNaN(Number(sectionKey));

                                            // For string IDs: check vocabData
                                            const strAvailable =
                                                isString && sectionKey in vocabData;
                                            // For numeric IDs: check quizData
                                            const numAvailable =
                                                isNumeric &&
                                                `lesson${lessonId}_section${sectionId}` in quizData;
                                            const isAvailable = strAvailable || numAvailable;
                                            const disabled = !isAvailable;

                                            return (
                                                <div key={idx} className="flex items-center gap-2">
                                                    {disabled ? (
                                                        <span className="flex items-center gap-3 text-sm px-5 py-4 rounded-2xl border border-white/5 bg-white/5 text-gray-500 cursor-not-allowed w-full">
                                                            <span className="whitespace-nowrap font-medium text-gray-400">
                                                                {item.label}
                                                            </span>
                                                            <span className="text-xs px-2 py-0.5 rounded-full border border-gray-500/20 bg-gray-500/10 opacity-70 ml-auto">
                                                                Coming soon
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <Link
                                                            href={`/lesson/${lessonId}/section/${sectionId}`}
                                                            className="flex items-center gap-3 text-sm px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-pink-500/30 transition-all duration-300 w-full group relative overflow-hidden"
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none" />
                                                            <span className="whitespace-nowrap flex-1 font-medium text-gray-300 group-hover:text-white transition-colors">
                                                                {item.label}
                                                            </span>
                                                            <span className="text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-300 px-3 py-1 rounded-full border border-pink-500/20 shrink-0 shadow-sm">
                                                                {getSectionBadge(sectionId)}
                                                            </span>
                                                            {isString && (
                                                                <SectionStatus
                                                                    lessonId={Number(lessonId)}
                                                                    sectionId={sectionKey as any}
                                                                />
                                                            )}
                                                            {isNumeric && (
                                                                <SectionStatus
                                                                    lessonId={Number(lessonId)}
                                                                    sectionId={Number(sectionId)}
                                                                />
                                                            )}
                                                        </Link>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
