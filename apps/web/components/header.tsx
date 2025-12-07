import Link from "next/link";

export function Header() {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Logo */}
      <Link href="/" className="flex flex-col items-baseline  cursor-pointer">
        <div className="text-3xl font-bold">
          <span className="text-pink-400">Jav</span>日本語
        </div>
        <span className="self-end text-xs text-muted-foreground">v1.0</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="/donate" className="hover:text-pink-400 transition-colors">
          Donation
        </Link>
      </div>
    </div>
  );
}
