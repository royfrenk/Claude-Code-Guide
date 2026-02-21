"use client";

import { useState, useCallback, useEffect } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { SearchModal } from "./search-modal";

interface SidebarChapter {
  slug: string;
  number: number | null;
  shortTitle: string;
  sections: { id: string; title: string }[];
}

interface SearchEntry {
  slug: string;
  title: string;
  content: string;
}

interface GuideLayoutProps {
  chapters: SidebarChapter[];
  searchData?: SearchEntry[];
  children: React.ReactNode;
}

export function GuideLayout({
  chapters,
  searchData = [],
  children,
}: GuideLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleSearchClick = useCallback(() => {
    setSearchOpen(true);
  }, []);

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen">
      <Sidebar
        chapters={chapters}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <TopBar onMenuClick={handleMenuClick} onSearchClick={handleSearchClick} />
      <main className="lg:pl-[280px]">
        <div className="mx-auto max-w-[720px] px-5 py-10 sm:px-8 lg:px-10">
          {children}
        </div>
      </main>
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchData={searchData}
      />
    </div>
  );
}
