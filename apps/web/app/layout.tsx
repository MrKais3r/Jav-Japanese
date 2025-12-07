import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RedirectToDashboard from "@/components/RedirectToDashboard";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Jav Nihongo",
  description: "Adult Japanese Learning App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RedirectToDashboard>{children}</RedirectToDashboard>
      </body>
    </html>
  );
}
