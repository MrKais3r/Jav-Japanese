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

export default function AgeGate({ onVerified }: { onVerified: () => void }) {
  const [open, setOpen] = useState(true);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleYes = () => {
    setStage(3);
    setTimeout(() => {
      setOpen(false);
      onVerified();
    }, 1800);
  };

  const handleNo = () => {
    setStage(4);
  };

  const images: Record<number, string> = {
    1: "/photo/girl/1_heart.jpg",
    2: "/photo/girl/2_look.jpg",
    3: "/photo/girl/3_happy.jpg",
    4: "/photo/girl/4_angry.jpg",
  };

  const text: Record<number, string> = {
    1: "Hiii~ 💕 Welcome darling! Do you wanna learn Japanese with me?",
    2: "But first… are you 18+? Be honest, ne~?",
    3: "Yayyy~! Arigatou! Let's study together, okay?",
    4: "Dame! You're not allowed here! Get out! 😡",
  };

  return (
    <Dialog open={open}>
      <DialogContent className="bg-background/80 backdrop-blur-xl border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-pink-400 text-xl">
            {stage === 4 ? "NO ENTRY!" : "Konnichiwa~ 💕"}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {text[stage]}
          </DialogDescription>
        </DialogHeader>

        <img src={images[stage]} className="w-full rounded-lg" />

        {stage < 3 && (
          <div className="flex gap-4 justify-end pt-4">
            <Button className="bg-pink-600 text-white" onClick={handleYes}>
              Yes, I am 18+
            </Button>

            <Button variant="secondary" onClick={handleNo}>
              No
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
