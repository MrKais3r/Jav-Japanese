// apps/web/components/header.tsx (or wherever you keep it)
import { getHeaderData } from "@/lib/api";

export async function Header() {
  const data = await getHeaderData();

  return (
    <div className="flex items-baseline gap-2">
      <div className="text-3xl font-bold">{data.name ?? "Jav日本語"}</div>
      <span className="text-xs text-muted-foreground">
        {data.version ?? "v0.0"}
      </span>
    </div>
  );
}
