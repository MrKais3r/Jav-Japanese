"use client";

import { useEffect, useState } from "react";

// Read directly from localStorage to support both numeric and string section keys
function getSectionScore(lessonId: number | string, sectionId: number | string): number {
    if (typeof window === "undefined") return 0;
    try {
        const raw = localStorage.getItem("japanese_learning_app");
        if (!raw) return 0;
        const data = JSON.parse(raw);
        const lessonKey = `lesson_${lessonId}`;
        return data?.progress?.[lessonKey]?.sectionResults?.[String(sectionId)] ?? 0;
    } catch {
        return 0;
    }
}

export default function SectionStatus({
    lessonId,
    sectionId,
}: {
    lessonId: number | string;
    sectionId: number | string;
}) {
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        setScore(getSectionScore(lessonId, sectionId));
    }, [lessonId, sectionId]);

    if (!score) return null;

    return (
        <>
            <span className="ml-2 text-pink-400 font-bold">✔</span>
            <span className="ml-1 text-pink-300 text-xs">
                {Math.round(score)}%{Math.round(score) === 100 ? " 💦" : ""}
            </span>
        </>
    );
}
