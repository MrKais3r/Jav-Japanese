"use client";

import { useEffect, useState } from "react";
import { isSectionDone } from "@/lib/storage";

export default function SectionStatus({ lessonId, sectionId }) {
  const [done, setDone] = useState<number>(0);

  useEffect(() => {
    // Runs only on client
    setDone(isSectionDone(lessonId, sectionId));
  }, [lessonId, sectionId]);

  if (!done) return null;

  return (
    <>
      <span className="ml-2 text-pink-400 font-bold">✔</span>
      <span className="ml-2 text-pink-300">
        {done}% {done === 100 ? "💦" : "👅"}
      </span>
    </>
  );
}
