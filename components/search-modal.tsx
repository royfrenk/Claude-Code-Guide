"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText } from "lucide-react";

interface SearchEntry {
  slug: string;
  title: string;
  content: string;
}

interface SearchResult {
  slug: string;
  title: string;
  section: string;
  snippet: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchData: SearchEntry[];
}

export function SearchModal({ isOpen, onClose, searchData }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const searchResults: SearchResult[] = [];
      const lowerQuery = query.toLowerCase();

      for (const entry of searchData) {
        const lines = entry.content.split("\n");
        let currentSection = entry.title;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          // Track current section
          const sectionMatch = line.match(/^###\s+(.+)/);
          if (sectionMatch) {
            currentSection = sectionMatch[1];
          }

          // Check for match
          if (line.toLowerCase().includes(lowerQuery)) {
            // Build snippet with context
            const start = Math.max(0, i - 1);
            const end = Math.min(lines.length, i + 2);
            const snippetLines = lines
              .slice(start, end)
              .map((l) => l.replace(/^#+\s+/, "").replace(/\*\*/g, ""))
              .filter((l) => l.trim());
            const snippet = snippetLines.join(" ").slice(0, 200);

            // Avoid duplicate sections
            const exists = searchResults.find(
              (r) => r.slug === entry.slug && r.section === currentSection
            );
            if (!exists) {
              searchResults.push({
                slug: entry.slug,
                title: entry.title,
                section: currentSection,
                snippet,
              });
            }

            if (searchResults.length >= 10) break;
          }
        }

        if (searchResults.length >= 10) break;
      }

      setResults(searchResults);
      setSelectedIndex(0);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchData]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const navigateToResult = useCallback(
    (result: SearchResult) => {
      const href =
        result.slug === "00-introduction" ? "/" : `/${result.slug}`;

      // Build section anchor
      const sectionId = result.section
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      onClose();
      router.push(`${href}#${sectionId}`);
    },
    [onClose, router]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        navigateToResult(results[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, results, selectedIndex, navigateToResult]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl mx-4 rounded-xl border border-border bg-background shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the guide..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
          />
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="max-h-[50vh] overflow-y-auto py-2">
            {results.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No results found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <ul>
                {results.map((result, i) => (
                  <li key={`${result.slug}-${result.section}-${i}`}>
                    <button
                      onClick={() => navigateToResult(result)}
                      className={`w-full text-left px-4 py-3 transition-colors ${
                        i === selectedIndex ? "bg-accent-muted" : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                        <span className="text-xs font-medium text-accent">
                          {result.title}
                        </span>
                        {result.section !== result.title && (
                          <>
                            <span className="text-xs text-muted-foreground">
                              /
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {result.section}
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed">
                        <HighlightText text={result.snippet} query={query} />
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border px-1 py-0.5 font-mono">{"Enter"}</kbd>
            to select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border px-1 py-0.5 font-mono">{"Esc"}</kbd>
            to close
          </span>
        </div>
      </div>
    </div>
  );
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const parts = text.split(new RegExp(`(${escapeRegex(query)})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-accent/20 text-foreground rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
