import { notFound } from "next/navigation";
import { languages, Lang } from "@/lib/i18n/config";

import type { Metadata } from "next";
import { loadTranslations } from "@/lib/i18n/load";
import { TranslationProvider } from "@/components/translation-provider";

export async function generateMetadata({
  params,
}: {
  params: { lang: Lang };
}): Promise<Metadata> {
  return {
    alternates: {
      languages: {
        en: "/en",
        ja: "/ja",
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  const { lang } = params;

  if (!languages.includes(lang)) notFound();

  const t = await loadTranslations(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        {/* Translation context */}

        {children}
      </body>
    </html>
  );
}
