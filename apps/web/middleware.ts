import { NextResponse } from "next/server";
import { languages, defaultLang } from "./lib/i18n/config";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ❌ If URL already has /en or /ja — do nothing
  const isLangRoute = languages.some((lang) => pathname.startsWith(`/${lang}`));
  if (isLangRoute) return NextResponse.next();

  // ❌ Ignore static files and APIs
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // ✅ Redirect / → /en
  return NextResponse.redirect(
    `${request.nextUrl.origin}/${defaultLang}${pathname}`
  );
}
