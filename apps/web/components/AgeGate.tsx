"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getAppData, updateUser } from "@/lib/storage";

export default function AgeGate({ onVerified }: { onVerified: () => void }) {
  const [open, setOpen] = useState(true);
  const [stage, setStage] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    const data = getAppData();
    if (data.user.ageVerified) {
      setOpen(false); // skip age gate
    }
  }, []);

  // Prevent closing
  const preventClose = () => {};

  const handleNameSubmit = () => {
    if (!name.trim()) return;
    updateUser({ name });
    setStage(2);
  };

  const handleYes = () => {
    setStage(3);
  };

  const handleNo = () => {
    setStage(5); // angry girl
    setTimeout(() => {
      window.location.href = "https://www.google.com/search?q=shinchan+cartoon";
    }, 2000);
  };

  const images: Record<number, string> = {
    1: "/photo/1_heart.jpg",
    2: "/photo/1_heart.jpg",
    3: "/photo/2_hi.jpg",
    4: "/photo/3_happy.jpg",
    5: "/photo/4_angry.jpg",
  };

  const text: Record<number, string> = {
    1: "Hiii hajimemashite! Aww you look cute. Before we continue—what’s your name, dear?",
    2: `Hehe~ ${name || "dear"} san ... are you 18+? Be honest ne, otherwise you might get in trouble 😘`,
    3: "",
    4: ``,
    5: "Dame! You're not allowed here! Go watch some kids stuff 😡",
  };

  const titles: Record<number, string> = {
    1: "Konnichiwa~ 💕",
    2: "Ehh~? 💕",
    3: "Yay~! 💗",
    4: "Let's Go! 💕",
    5: "NO ENTRY!",
  };

  return (
    <Dialog open={open} onOpenChange={preventClose}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
        className="bg-background/80 backdrop-blur-xl border border-white/10"
      >
        <DialogHeader>
          <DialogTitle className="text-pink-400 text-xl">
            {titles[stage]}
          </DialogTitle>

          <DialogDescription className="text-gray-300">
            {text[stage]}
          </DialogDescription>
        </DialogHeader>
        <img src={images[stage]} className="w-full rounded-lg" />
        {/* Stage 1 → Name Input */}
        {stage === 1 && (
          <div className="pt-4 flex flex-col gap-3">
            <input
              className="w-full px-3 py-2 rounded-md bg-black/20 border border-white/10 text-white"
              placeholder="Type your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Button
              className="bg-pink-600 text-white"
              onClick={handleNameSubmit}
            >
              Continue
            </Button>
          </div>
        )}
        {stage === 2 && (
          <div className="flex gap-4 justify-end pt-4">
            <Button className="bg-pink-600 text-white" onClick={handleYes}>
              Yes, I am 18+
            </Button>

            <Button variant="secondary" onClick={handleNo}>
              No
            </Button>
          </div>
        )}
        {stage === 3 && (
          <div className="pt-4 flex flex-col gap-3 items-center">
            <div className="text-center text-pink-300">
              Yayyy~ now ready for some spicy Nihongo? do you love Japanese? 💕
            </div>

            <Button
              className="bg-pink-600 text-white px-6"
              onClick={() => setStage(4)}
            >
              Yes
            </Button>

            <Button variant="secondary" onClick={handleNo}>
              No
            </Button>
          </div>
        )}

        {stage === 4 && (
          <div className="pt-4 flex flex-col gap-3 items-center">
            <div className="text-center text-pink-300">
              {`hai! ${name || "dear"} san Let's study together, okay? 💗`}
            </div>

            <Button
              className="bg-pink-600 text-white px-6"
              onClick={() => {
                updateUser({ ageVerified: true });
                setOpen(false);
                onVerified?.();
              }}
            >
              Start Learning
            </Button>
          </div>
        )}
        {/* Stage 5 → Angry redirect message */}
        {stage === 5 && (
          <div className="text-center text-red-400 pt-3 font-semibold">
            lets go..
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
