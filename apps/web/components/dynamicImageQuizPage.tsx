"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { fisherYatesShuffle } from "@/lib/utils";
import { markSectionComplete, saveSectionResult } from "@/lib/storage";
import { Header } from "./header";
import { quizData } from "@/data/quizData";

const availableSections = new Set(["1", "4"]); // only these sections exist

export default function QuizPage({ params }: any) {
  const { lessonId, sectionId } = params;

  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [saved, setSaved] = useState(false);

  // 🔥 Load data dynamically based on lesson/section
  useEffect(() => {
    async function loadData() {
      const sectionKey = `lesson${lessonId}_section${sectionId}`;

      const array = quizData[sectionKey as keyof typeof quizData];

      if (!array) {
        setQuestions([]);
        return;
      } else {
        const shuffled = fisherYatesShuffle(array).map((q) => ({
          ...q,
          options: fisherYatesShuffle(q.options),
        }));
        setQuestions(shuffled);
      }
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
    const isCorrect = option === q.answer;

    if (isCorrect) setCorrect((c) => c + 1);
    else setWrong((w) => w + 1);

    setSelected(option);

    setTimeout(() => {
      setSelected(null);
      setIndex((prev) => prev + 1);
    }, 500);
  }
  // Quiz complete

  useEffect(() => {
    if (questions.length > 0 && index >= questions.length && !saved) {
      const score = Math.round((correct / questions.length) * 100);

      saveSectionResult(lessonId, sectionId, score);
      markSectionComplete(lessonId, sectionId);
      setSaved(true);
    }
  }, [index, questions, saved]);

  if (!q)
    return (
      <div className="flex flex-col items-center justify-center h-dvh text-white text-center px-4">
        <h1 className="text-3xl mb-2 text-pink-400">Quiz Complete 🎉</h1>

        {/* Score summary */}
        <p className="text-lg text-gray-300 mb-4">
          You got <span className="text-green-400 font-bold">{correct}</span>{" "}
          right and <span className="text-red-400 font-bold">{wrong}</span>{" "}
          wrong.
        </p>

        {/* JAV-style playful result */}
        <div className="bg-black/40 border border-white/10 p-4 rounded-xl max-w-md">
          {correct >= wrong ? (
            <p className="text-pink-300 text-sm">
              Ara ara~ senpai… you did *so well*. Looks like someone’s been
              practicing 👀💕 Keep this up and I'll have to reward you~
            </p>
          ) : (
            <p className="text-red-300 text-sm">
              Ehh~? You made *that* many mistakes? Baka senpai… I guess I’ll
              have to train you… Slowly… patiently… one character at a time 😌🔥
            </p>
          )}
        </div>

        <Link
          href={`/lesson/${lessonId}`}
          className="underline text-blue-400 mt-6 text-lg"
        >
          Back to Lesson
        </Link>
      </div>
    );

  // Format timer
  const formatTime = (t: number) =>
    `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <div className="min-h-dvh w-full flex flex-col items-center  gap-10 text-gray-200">
      <Header />
      <Card className="w-full max-w-3xl bg-black/40 border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-pink-400">
            Section {sectionId}: Multiple Choice
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="w-full bg-pink-500/90 text-black text-sm p-3 rounded">
            Choose the correct Romaji for:
            <span className="text-white"> {q.character}</span>
          </div>

          <img
            src={q.imageSrc}
            alt="lesson visual"
            className="w-full rounded-lg"
          />

          <div className="space-y-3">
            {q.options.map((opt: string, i: number) => (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left px-4 py-3 rounded border border-white/10 transition ${
                  selected === opt ? "bg-pink-500 text-black" : "bg-black/40"
                }`}
              >
                <span className="font-bold">
                  {String.fromCharCode(65 + i)}:
                </span>{" "}
                {opt}
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
  );
}
