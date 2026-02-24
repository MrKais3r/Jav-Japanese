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
import { Heart, Sparkles, AlertCircle, PlayCircle, XCircle } from "lucide-react";

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
        }, 2500);
    };

    const images: Record<number, string> = {
        1: "/photo/1_heart.jpg",
        2: "/photo/1_heart.jpg",
        3: "/photo/2_hi.jpg",
        4: "/photo/3_happy.jpg",
        5: "/photo/4_angry.jpg",
    };

    const titles: Record<number, string> = {
        1: "Konnichiwa~ Darling! 💕",
        2: "Hold on, Hottie... 🔥",
        3: "Ara Ara~ 💗",
        4: "Ikimashou! 💕",
        5: "DAME! NO ENTRY! 😡",
    };

    const text: Record<number, string> = {
        1: "Hajimemashite! You look like you're ready for some fun. What should I call you, handsome?~",
        2: `Hehe~ ${name || "Darling"}-san... look at you blush. Before we play—are you legally 18+? Be honest or I'll have to punish you ne? 😘`,
        3: "Motto motto... ready to dive into the deep end of Japanese? It's going to be wet, wild, and very... educational. You ready? 💕",
        4: `Yatta! ${name || "Darling"}-san and I, together finally. Let's make this study session one you'll never forget~ 💗`,
        5: "Mou! You're just a little baby! Go watch some kids' cartoons before come back here, okay? Baka! 😡",
    };

    return (
        <Dialog open={open} onOpenChange={preventClose}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                showCloseButton={false}
                className="bg-zinc-950/90 backdrop-blur-2xl border border-pink-500/20 shadow-[0_0_50px_rgba(236,72,153,0.1)] p-0 overflow-hidden max-w-[90vw] sm:max-w-md rounded-3xl"
            >
                <div className="relative aspect-video w-full overflow-hidden">
                    <img 
                        src={images[stage]} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                        alt="waifu"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 animate-pulse">
                        <Heart className="text-pink-500 fill-pink-500 w-6 h-6 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                    </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6 relative">
                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-pink-500 text-2xl font-black italic flex items-center gap-2 tracking-tight">
                            {stage === 5 ? <AlertCircle className="text-red-500" /> : <Sparkles className="text-pink-400 w-5 h-5" />}
                            {titles[stage]}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 text-base leading-relaxed font-medium">
                            {text[stage]}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Stage 1 → Name Input */}
                    {stage === 1 && (
                        <div className="space-y-4 pt-2">
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all text-lg"
                                    placeholder="Enter your name..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <Button 
                                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-6 rounded-2xl shadow-xl shadow-pink-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-lg uppercase tracking-wider"
                                onClick={handleNameSubmit}
                            >
                                Meet Her
                            </Button>
                        </div>
                    )}

                    {/* Stage 2 → Age Check */}
                    {stage === 2 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <Button 
                                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-6 rounded-2xl shadow-xl shadow-pink-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-lg"
                                onClick={handleYes}
                            >
                                Yes, I'm 18+
                            </Button>
                            <Button 
                                variant="outline"
                                className="w-full border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 font-bold py-6 rounded-2xl transition-all text-lg"
                                onClick={handleNo}
                            >
                                Not yet...
                            </Button>
                        </div>
                    )}

                    {/* Stage 3 → Interest Check */}
                    {stage === 3 && (
                        <div className="space-y-4 pt-2">
                            <div className="bg-pink-500/5 border border-pink-500/10 rounded-2xl p-4 text-center">
                                <p className="text-pink-300 font-semibold italic text-lg">
                                    "Ready for some spicy Nihongo lessons together?~" 💕
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Button 
                                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-6 rounded-2xl shadow-xl shadow-pink-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-lg"
                                    onClick={() => setStage(4)}
                                >
                                    Hai! Teach Me
                                </Button>
                                <Button 
                                    variant="outline"
                                    className="w-full border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 font-bold py-6 rounded-2xl transition-all text-lg"
                                    onClick={handleNo}
                                >
                                    Too spicy...
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Stage 4 → Final Step */}
                    {stage === 4 && (
                        <div className="space-y-6 pt-2">
                            <div className="flex items-center justify-center">
                                <div className="p-3 rounded-full bg-pink-500/20 animate-pulse">
                                    <PlayCircle className="w-12 h-12 text-pink-500 fill-pink-500/20" />
                                </div>
                            </div>
                            <Button
                                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black py-7 rounded-22xl shadow-2xl shadow-pink-500/40 transition-all hover:scale-[1.05] active:scale-[0.95] text-xl tracking-tighter uppercase"
                                onClick={() => {
                                    updateUser({ ageVerified: true });
                                    setOpen(false);
                                    onVerified?.();
                                }}
                            >
                                Enter Paradise
                            </Button>
                        </div>
                    )}

                    {/* Stage 5 → No Access */}
                    {stage === 5 && (
                        <div className="pt-2 flex flex-col items-center gap-4">
                            <div className="p-4 rounded-full bg-red-500/20 text-red-500">
                                <XCircle className="w-16 h-16" />
                            </div>
                            <p className="text-zinc-500 text-sm animate-bounce">
                                Redirecting to something safer...
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
