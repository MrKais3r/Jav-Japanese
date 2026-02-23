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
    <div className="min-h-dvh w-full flex flex-col items-center justify-start gap-10 bg-gradient-to-b from-black-900/20 to-black text-black-300">
      <Header />
      <div className="pt-4">
        <Link
          href="/"
          className="text-black-400 hover:text-black-200 underline text-sm"
        >
          ← Back to Home
        </Link>
      </div>

      <Card className="border max-w-5xl w-full border-black-500/30 bg-black-900/20 backdrop-blur-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-black-200 text-2xl font-bold">
            Lesson {lessonId}: {lesson?.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-8 p-6 text-sm text-black-200 leading-relaxed">
          {lesson?.sections?.map((sec, i) => {
            return (
              <div key={i} className="space-y-4">
                <h2 className="text-lg font-semibold text-black-100 drop-shadow text-pink-400">
                  {sec.header}
                </h2>

                <div className="flex flex-col gap-2">
                  {sec.items.map((item, idx) => {
                    const sectionId = (item as any).section;
                    const sectionKey = String(sectionId);
                    const isString = sectionId && isNaN(Number(sectionKey));
                    const isNumeric = sectionId && !isNaN(Number(sectionKey));

                    // For string IDs: check vocabData
                    const strAvailable = isString && (sectionKey in vocabData);
                    // For numeric IDs: check quizData
                    const numAvailable = isNumeric && (`lesson${lessonId}_section${sectionId}` in quizData);
                    const isAvailable = strAvailable || numAvailable;
                    const disabled = !isAvailable;

                    return (
                      <div key={idx} className="flex items-center gap-2">
                        {disabled ? (
                          <span className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-white/5 text-black-400/40 cursor-not-allowed w-full">
                            <span className="whitespace-nowrap">{item.label}</span>
                            <span className="text-xs opacity-50 ml-auto">😢 Coming soon</span>
                          </span>
                        ) : (
                          <Link
                            href={`/lesson/${lessonId}/section/${sectionId}`}
                            className="flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition border border-white/5 w-full group"
                          >
                            <span className="whitespace-nowrap flex-1">{item.label}</span>
                            <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full border border-pink-500/30 shrink-0">
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
  );
}
