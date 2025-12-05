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
    </div>
  );
}
