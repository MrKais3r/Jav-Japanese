"use client";

import { useEffect, useState } from "react";
import { getAppData } from "@/lib/storage";
import { MessageCircle, Heart, Star, Sparkles, Flame, X } from "lucide-react";

const SENSEI_MESSAGES = {
    idle: [
        "Are you here to study, or just to look at me?~",
        "Don't keep me waiting too long, Darling.",
        "Nihongo is easier when we're together, right?",
        "Have you practiced your Hiragana today?",
    ],
    correct: [
        "Sugoi! You're making me blush~",
        "Keep it up, and I might have a special reward for you.",
        "Perfect! Just like I taught you.",
        "You're getting so good at this!",
    ],
    wrong: [
        "Mou! Pay attention to me, not the distractions~",
        "That's not quite right... want me to punish you? Just kidding! 😉",
        "Don't give up now, I believe in you.",
        "Focus, Darling. I know you can do it.",
    ],
    levelUp: [
        "Ara ara~ Someone's all grown up now!",
        "A new rank? You're becoming a real master.",
        "I'm so proud of how far you've come.",
    ]
};

export function SenseiMascot({ state = "idle" }: { state?: "idle" | "correct" | "wrong" | "levelUp" }) {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [xp, setXp] = useState(0);

    useEffect(() => {
        const pool = SENSEI_MESSAGES[state];
        const randomMsg = pool[Math.floor(Math.random() * pool.length)];
        setMessage(randomMsg || "");
        
        const data = getAppData();
        setXp(data.user?.xp || 0);

        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
    }, [state]);

    return (
        <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform `}>
            <div className="relative group">
                {/* Speech Bubble */}
                <div className={`absolute bottom-full right-0 mb-4 w-48 p-4 bg-zinc-900/90 backdrop-blur-md border border-pink-500/30 rounded-2xl shadow-2xl transform transition-all group-hover:-translate-y-1 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    <button 
                        onClick={() => setVisible(false)}
                        className="absolute top-2 right-2 text-zinc-500 hover:text-pink-400 transition-colors"
                    >
                        <X size={14} />
                    </button>
                    <div className="text-xs font-bold text-pink-400 mb-1 flex items-center gap-1">
                        <MessageCircle size={12} /> Sensei
                    </div>
                    <p className="text-[13px] text-zinc-100 leading-tight italic">
                        "{message}"
                    </p>
                    {/* Tail */}
                    <div className="absolute top-full right-6 w-3 h-3 bg-zinc-900 border-r border-b border-pink-500/30 transform rotate-45 -mt-1.5" />
                </div>

                {/* The Mascot Avatar */}
                <div className="relative cursor-pointer" onClick={() => setVisible(!visible)}>
                    <div className="w-20 h-20 rounded-full border-2 border-pink-500 animate-pulse absolute inset-0 blur-md opacity-50" />
                    <div className="w-20 h-20 rounded-full border-2 border-pink-500/50 bg-zinc-950 overflow-hidden relative z-10 shadow-xl group-hover:scale-105 transition-transform">
                        <img 
                            src="/photo/2_hi.jpg" 
                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all"
                            alt="Sensei"
                        />
                    </div>
                    
                    {/* Level Badge */}
                    <div className="absolute -bottom-1 -right-1 bg-linear-to-br from-pink-500 to-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full z-20 shadow-lg border border-white/20">
                        LV.{Math.floor(xp / 1000) + 1}
                    </div>
                </div>
            </div>
        </div>
    );
}
