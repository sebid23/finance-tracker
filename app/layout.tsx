import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
});

import Header from "@/app/components/layout/header";

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "Track your income and expenses in a simple dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1 min-h-0 bg-cyan-900/30">
            <div className="mx-auto max-w-6xl px-6">
              {children} 
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}