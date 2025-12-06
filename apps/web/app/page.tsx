import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { data } from "@/data/mainLesson";

export default async function Home() {
  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-start gap-10">
      {/* Header */}
      <Header />

      {/* Intro */}
      <Card className="border max-w-6xl border-white/10 bg-background/60 backdrop-blur-md shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-muted-foreground">
            Welcome to the <span className="text-pink-400">adult</span> way of
            learning <span className="text-pink-400">Japanese</span>.
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 justify-between">
          <div className="text-sm leading-relaxed text-gray-300">
            Jav Nihongo is where Japanese learning meets a bold, grown-up vibe.
            No kiddie cartoons, no boring worksheets—just clean explanations,
            memorable examples, and a style made for adults who want their study
            time to feel… a little more{" "}
            <span className="text-pink-300">exciting</span>. Here, you’ll
            explore the language in a way that’s{" "}
            <span className="text-pink-300">fun, modern</span>, and just a bit
            seductive—because learning should feel good, not stressful. Each
            lesson guides you step by step, mixing real-world Japanese with
            playful humor and practical context. Click Quick Navigation to jump
            straight into the lesson you want. Whether you’re exploring your
            first kana or leveling up your conversation game, Jav Nihongo keeps
            things <span className="text-pink-300"> smooth, mature,</span>
            and seriously enjoyable. Learn at your pace. Savor each lesson. And
            enjoy the journey.
          </div>

          <img
            src={"/photo/learn_japanese_with_us.jpg"}
            alt="lesson visual"
            className="w-full rounded-lg"
          />
        </CardContent>
      </Card>

      {/* Quick Navigation */}
      <Card className="border max-w-6xl w-full border-white/10 bg-background/60 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle>Quick Navigation</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-2">
            {Object.keys(data).map((id) => {
              const lesson = data[parseInt(id)];
              return (
                <Link
                  key={id}
                  href={`/lesson/${id}`}
                  className="text-sm px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition border border-white/5"
                >
                  <span className="text-pink-300 font-semibold">
                    Lesson {id}
                  </span>{" "}
                  : <span>{lesson.title}</span>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
