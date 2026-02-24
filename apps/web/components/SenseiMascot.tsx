"use client";

import { useEffect, useState } from "react";
import { getAppData } from "@/lib/storage";
import { MessageCircle, X } from "lucide-react";

const SENSEI_MESSAGES = {
    idle: [
        "Are you here to study, or just to look at me?~",
        "Don't keep me waiting too long, Darling. I might get lonely.",
        "Nihongo is easier when we're together, right?",
        "Have you practiced your Hiragana today? Or are you too distracted by me?",
        "Ara ara~ Someone looks like they need a private lesson.",
        "Darling, focus! I know I'm hard to resist, but your lessons come first~",
    ],
    correct: [
        "Sugoi! You're making me blush~",
        "Keep it up, and I might have a very special reward for you.",
        "Perfect! Just like I taught you. Maybe you deserve a treat?",
        "You're getting so good at this! It's almost... intoxicating.",
        "Yes! That's it! More! Give me more correct answers~",
    ],
    wrong: [
        "Mou! Pay attention to me, not the distractions~",
        "That's not quite right... want me to punish you? Just kidding! 😉",
        "Don't give up now, I believe in you. Even if you are a bit of a slow learner~",
        "Focus, Darling. I know you can do it. Or do you want me to sit closer?",
        "Incorrect~ Maybe you need some disciplining after all?",
    ],
    levelUp: [
        "Ara ara~ Someone's all grown up now!",
        "A new rank? You're becoming a real master. My master?~",
        "I'm so proud of how far you've come. I might have to reward you personally.",
        "Level up! You're getting stronger... I like that in a student.",
    ],
    tease: [
        "Kyaa! Don't touch me there unless you mean it~",
        "Darling, you're so bold! Save that energy for the quiz~",
        "Ara~ You're quite the hands-on student, aren't you?",
        "Stop teasing me and get back to work! Or... don't stop?",
    ]
};

export function SenseiMascot({ state = "idle" }: { state?: "idle" | "correct" | "wrong" | "levelUp" }) {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [isTeasing, setIsTeasing] = useState(false);
    const [xp, setXp] = useState(0);

    const showRandomMessage = (type: keyof typeof SENSEI_MESSAGES) => {
        const pool = SENSEI_MESSAGES[type];
        const randomMsg = pool[Math.floor(Math.random() * pool.length)];
        setMessage(randomMsg || "");
        setVisible(true);
    };

    useEffect(() => {
        showRandomMessage(state);
        const data = getAppData();
        setXp(data.user?.xp || 0);

        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
    }, [state]);

    const handleTease = () => {
        setIsTeasing(true);
        showRandomMessage("tease");
        setTimeout(() => setIsTeasing(false), 2000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-float translate-y-0 opacity-100 transition-opacity">
            <div className="relative group">
                {/* Speech Bubble */}
                <div className={`absolute bottom-full right-0 mb-4 w-48 p-4 bg-zinc-900/90 backdrop-blur-md border border-pink-500/30 rounded-2xl shadow-2xl transform transition-all group-hover:-translate-y-1 ${visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90 pointer-events-none'}`}>
                    <button 
                        onClick={() => setVisible(false)}
                        className="absolute top-2 right-2 text-zinc-500 hover:text-pink-400 transition-colors"
                        aria-label="Close message"
                    >
                        <X size={14} />
                    </button>
                    <div className="text-xs font-bold text-pink-400 mb-1 flex items-center gap-1">
                        <MessageCircle size={12} /> Sensei
                    </div>
                    <p className="text-[13px] text-zinc-100 leading-tight italic">
                        &quot;{message}&quot;
                    </p>
                    {/* Tail */}
                    <div className="absolute top-full right-6 w-3 h-3 bg-zinc-900 border-r border-b border-pink-500/30 transform rotate-45 -mt-1.5" />
                </div>

                {/* The Mascot Avatar */}
                <div 
                    className={`relative cursor-pointer transition-all duration-300 ${isTeasing ? 'scale-110' : 'hover:scale-105'}`}
                    onClick={handleTease}
                >
                    <div className={`w-20 h-20 rounded-full border-2 border-pink-500 absolute inset-0 blur-md opacity-50 ${isTeasing ? 'animate-naughty-pulse' : 'animate-pulse'}`} />
                    <div className="w-20 h-20 rounded-full border-2 border-pink-500/50 bg-zinc-950 overflow-hidden relative z-10 shadow-xl">
                        <img 
                            src="/photo/2_hi.jpg" 
                            className={`w-full h-full object-cover transition-all duration-500 ${isTeasing ? 'grayscale-0 saturate-200 contrast-125' : 'grayscale-[0.2] group-hover:grayscale-0'}`}
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
