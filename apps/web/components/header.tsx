// apps/web/components/header.tsx (or wherever you keep it)
import { getHeaderData } from "@/lib/api";

export async function Header() {
  return (
    <div className="flex items-baseline gap-2">
      <div className="text-3xl font-bold">
        <span className="text-pink-400">Jav</span>日本語
      </div>
      <span className="text-xs text-muted-foreground">{"v1.0"}</span>
    </div>
  );
}
