"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // On every client-side mount (including refresh), redirect to "/"
    router.replace("/");
  }, [router]);

  return <>{children}</>;
}
