"use client";
import { Button } from "@/components/ui/button";
import { languages } from "@/lib/i18n/config";
import { Globe, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export async function Header() {
  const pathname = usePathname();
  const router = useRouter();

  function switchLang(newLang: string) {
    const segments = pathname.split("/");
    segments[1] = newLang; // Replace language segment
    router.push(segments.join("/"));
  }
  return (
    <div className="flex items-center justify-between">
      {/* LEFT SIDE — Name + Version */}
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-bold">{"Jav日本語"}</div>
        <span className="text-xs text-muted-foreground">{"v1.0"}</span>
      </div>

      {/* RIGHT SIDE — Action buttons */}
      <div className="flex gap-2">
        {languages.map((l) => (
          <Button
            key={l}
            variant="outline"
            size="sm"
            onClick={() => switchLang(l)}
          >
            <Globe className="w-4 h-4 mr-1" />
            {l.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  );
}
