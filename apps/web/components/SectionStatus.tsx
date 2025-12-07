import { isSectionDone } from "@/lib/storage";
import { useEffect, useState } from "react";

export default function SectionStatus({
  lessonId,
  sectionId,
}: {
  lessonId: number | string;
  sectionId: number | string;
}) {
  const [done, setDone] = useState<number>(0);

  useEffect(() => {
    const lesson = Number(lessonId);
    const section = Number(sectionId);

    // Only proceed if both are valid numbers
    if (!Number.isNaN(lesson) && !Number.isNaN(section)) {
      setDone(isSectionDone(lesson, section));
    }
  }, [lessonId, sectionId]);

  if (!done) return null;

  return (
    <>
      <span className="ml-2 text-pink-400 font-bold">✔</span>
      <span className="ml-2 text-ppink-300">
        {done}% {done === 100 ? "💦" : "👅"}
      </span>
    </>
  );
}
