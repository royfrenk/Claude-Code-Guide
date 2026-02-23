"use client";

import Link from "next/link";
import { Menu, Search, Download, Home, Mail, MessageSquare } from "lucide-react";

interface TopBarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export function TopBar({ onMenuClick, onSearchClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-4 lg:pl-[296px]">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="mr-3 rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Home */}
      <Link
        href="/"
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <button
        onClick={onSearchClick}
        className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-muted-foreground hover:border-accent/30 hover:text-foreground transition-all"
        aria-label="Search guide"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border bg-background px-1.5 text-[10px] font-mono text-muted-foreground">
          {"Ctrl K"}
        </kbd>
      </button>

      {/* PDF Download */}
      <a
        href="/guide.pdf"
        download
        className="ml-3 flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-accent/30 transition-all"
        aria-label="Download PDF guide"
      >
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">Download PDF</span>
      </a>

      {/* Feedback */}
      <a
        href="mailto:royfrenk@gmail.com?subject=Guide%20Feedback"
        className="ml-3 flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-accent/30 transition-all"
        aria-label="Send feedback"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="hidden sm:inline">Feedback</span>
      </a>
    </header>
  );
}
