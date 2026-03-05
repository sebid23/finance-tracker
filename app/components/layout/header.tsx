"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-cyan-900/50 text-sm text-white border-b border-cyan-900">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <h1 className="text-lg font-bold">Finance Tracker</h1>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-5 items-center">
          <Link href="/">Dashboard</Link>
          <Link href="/transactions">Transactions</Link>
        </nav>

        {/* Mobile button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            // X icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          ) : (
            /* Menu icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-700 bg-cyan-950">
          <nav className="flex flex-col px-6 py-4 gap-3">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
            <Link href="/transactions" onClick={() => setMenuOpen(false)} className="py-2">
              Transactions
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
