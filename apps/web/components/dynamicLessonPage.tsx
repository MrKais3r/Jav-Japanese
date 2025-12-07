"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { data } from "@/data/mainLesson";
import SectionStatus from "./SectionStatus";
import { quizData } from "@/data/quizData";

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

                <ul className="space-y-2 pl-4 list-disc">
                  {sec.items.map((item, idx) => {
                    const dataKey = `lesson${lessonId}_section${item.section}`;
                    const isDataAvailable =
                      quizData[dataKey as keyof typeof quizData];
                    const disabled = !isDataAvailable || !item.section;

                    return (
                      <li key={idx} className="flex items-center gap-2">
                        {disabled ? (
                          <span className="text-black-400/40 cursor-not-allowed whitespace-nowrap">
                            {item.label}{" "}
                            <span className="opacity-60">😢 Coming soon </span>
                          </span>
                        ) : (
                          <Link
                            href={`/lesson/${lessonId}/section/${item.section}`}
                            className="hover:underline text-black-300 hover:text-black-100 whitespace-nowrap"
                          >
                            {item.label}
                          </Link>
                        )}

                        {!disabled && item.section && (
                          <SectionStatus
                            lessonId={Number(lessonId)}
                            sectionId={item.section}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
