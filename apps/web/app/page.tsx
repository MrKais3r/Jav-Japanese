import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

const backendApiCall = async () => {
  const res = await fetch("http://localhost:8080/hello", {
    cache: "no-store",
  });
  const text = await res.text();
  return text;
};

const lessons = [
  { id: 0, title: "Writing System, Greetings, and Numbers" },
  { id: 1, title: "New Friends" },
  { id: 2, title: "Shopping" },
  { id: 3, title: "Making a Date" },
  { id: 4, title: "The First Date" },
  { id: 5, title: "A Trip to Okinawa" },
  { id: 6, title: "A Day in Robert's Life" },
  { id: 7, title: "Family Picture" },
  { id: 8, title: "Barbecue" },
  { id: 9, title: "Kabuki" },
  { id: 10, title: "Winter Vacation Plans" },
  { id: 11, title: "After the Vacation" },
  { id: 12, title: "Feeling Ill" },
  { id: 13, title: "Looking for a Part-time Job" },
  { id: 14, title: "Valentine's Day" },
  { id: 15, title: "A Trip to Nagano" },
  { id: 16, title: "Lost and Found" },
  { id: 17, title: "Grumble and Gossip" },
  { id: 18, title: "John's Part-time Job" },
  { id: 19, title: "Meeting the Boss" },
  { id: 20, title: "Mary Goes Shopping" },
  { id: 21, title: "Burglar" },
  { id: 22, title: "Education in Japan" },
  { id: 23, title: "Good-bye" },
];

export default async function Home() {
  const message = await backendApiCall();

  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-start gap-10">
      {/* header */}
      <Header />

      {/* intro */}
      <Card className="border max-w-6xl border-white/10 bg-background/60 backdrop-blur-md shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className=" text-muted-foreground">
            Welcome to the adult way of learning Japanese.
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 justify-between">
          {/* Intro text */}
          <div className="text-sm  leading-relaxed text-gray-300">
            Jav Nihongo is where Japanese learning meets a bold, grown-up vibe.
            No kiddie cartoons, no boring worksheets—just clean explanations,
            memorable examples, and a style made for adults who want their study
            time to feel… a little more exciting. Here, you’ll explore the
            language in a way that’s fun, modern, and just a bit
            seductive—because learning should feel good, not stressful. Each
            lesson guides you step by step, mixing real-world Japanese with
            playful humor and practical context. Click Quick Navigation to jump
            straight into the lesson you want. Whether you’re exploring your
            first kana or leveling up your conversation game, Jav Nihongo keeps
            things smooth, mature, and seriously enjoyable. Learn at your pace.
            Savor each lesson. And enjoy the journey.
          </div>

          {/* Button */}

          <Button
            className="bg-black hover:bg-gray-600 w-fit self-center"
            asChild
          >
            <Link href="/quick-navigation">Quick Navigation →</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="border max-w-6xl w-full border-white/10 bg-background/60 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-muted-foreground">
            Quick Navigation
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 p-6">
          {/* Lessons */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lesson/${lesson.id}`}
                  className="text-sm px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition border border-white/5"
                >
                  Lesson {lesson.id}: {lesson.title}
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
