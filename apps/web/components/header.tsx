import Link from "next/link";
import { LockOpen, Heart } from "lucide-react";

export function Header() {
  return (
    <div className="flex items-center justify-between w-full max-w-6xl mx-auto py-4 px-6 mb-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl transition-all hover:border-pink-500/30">
      {/* Logo */}
      <Link href="/" className="group flex flex-col items-baseline cursor-pointer">
        <div className="text-3xl font-bold flex items-center align-middle gap-1 tracking-tight transition-transform group-hover:scale-[1.02]">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">日本語</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-rose-600 text-4xl mt-1 text-center font-extrabold drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]">Jav</span>
        </div>
        <span className="self-end text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 transition-colors group-hover:text-pink-400/80">v1.0</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-4 text-sm font-medium">
        <Link 
          href="/gallery" 
          className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:border-pink-500/40 hover:bg-pink-500/10 transition-all duration-300"
        >
          <LockOpen className="w-4 h-4 text-pink-400 group-hover:text-pink-300 transition-colors" />
          <span className="text-gray-300 group-hover:text-white transition-colors">Rewards</span>
          <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
        <Link 
          href="/donate" 
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 hover:-translate-y-0.5"
        >
          <Heart className="w-4 h-4" />
          <span>Support Us</span>
        </Link>
      </div>
    </div>
  );
}
