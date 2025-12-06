import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";

// Example dynamic lesson structure
// You can later fetch this from Supabase or a local JSON file
const lessons = {
  0: {
    title: "Writing System, Greetings, and Numbers",
    sections: [
      {
        header: "Japanese Writing System",
        items: [
          { label: "Hiragana — Basics", section: 1 },
          { label: "Hiragana — Diacritical Marks", section: 2 },
          { label: "Hiragana — Combination Sounds", section: 3 },
          { label: "Katakana — Basics", section: 4 },
          { label: "Katakana — Diacritical Marks", section: 5 },
          { label: "Katakana — Combination Sounds", section: 6 },
          { label: "Katakana — Extra Combo Patterns", section: 7, done: true },
          { label: "Bonus Practice: Match Hiragana & Katakana", done: true },
        ],
      },
      {
        header: "Greetings",
        items: [
          { label: "Greetings — Part 1", section: 8 },
          { label: "Greetings — Part 2", section: 9 },
          { label: "Culture Note: Japanese Greetings & Bowing" },
          { label: "Practice: Greetings Drill" },
        ],
      },
      {
        header: "Numbers",
        items: [
          { label: "Vocabulary: Numbers 0–14", section: 10 },
          { label: "Vocabulary: Numbers 15–100", section: 11 },
          { label: "Practice: Reading Numbers — Drill A" },
          { label: "Practice: Reading Numbers — Drill B" },
          { label: "Practice: Reading Numbers — Drill C" },
        ],
      },
      {
        header: "Workbook Practice",
        items: [
          { label: "Workbook: Greetings — Exercises" },
          { label: "Workbook: Numbers — Exercises" },
        ],
      },
    ],
  },
};

export default function Lesson({ params }) {
  const { lessonId } = params;
  const lesson = lessons[lessonId];

  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-start gap-10 bg-gradient-to-b from-black-900/20 to-black text-black-300">
      <Header />

      <Card className="border max-w-5xl w-full border-black-500/30 bg-black-900/20 backdrop-blur-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-black-200 text-2xl font-bold">
            Lesson {lessonId}: {lesson?.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-8 p-6 text-sm text-black-200 leading-relaxed">
          {lesson?.sections?.map((sec, i) => (
            <div key={i} className="space-y-4">
              <h2 className="text-lg font-semibold text-black-100 drop-shadow">
                {sec.header}
              </h2>

              <ul className="space-y-2 pl-4 list-disc">
                {sec.items.map((item, idx) => (
                  <li key={idx}>
                    {item.section ? (
                      <Link
                        href={`/lesson/${lessonId}/section/${item.section}`}
                        className="hover:underline text-black-300 hover:text-black-100"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span>{item.label}</span>
                    )}

                    {item.done && (
                      <span className="ml-2 text-green-300">✔</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pt-4">
            <Link
              href="/"
              className="text-black-400 hover:text-black-200 underline text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
