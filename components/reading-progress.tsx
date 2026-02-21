"use client";

import { useEffect } from "react";

interface ReadingProgressProps {
  slug: string;
}

export function ReadingProgress({ slug }: ReadingProgressProps) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const progress = Math.min(
        100,
        Math.round((window.scrollY / scrollHeight) * 100)
      );

      try {
        const stored = localStorage.getItem("guide-progress");
        const data = stored ? JSON.parse(stored) : {};
        const current = data[slug] || 0;

        // Only update if progress increased
        if (progress > current) {
          data[slug] = progress;
          localStorage.setItem("guide-progress", JSON.stringify(data));
          window.dispatchEvent(new Event("progress-updated"));
        }
      } catch {
        // ignore storage errors
      }
    };

    // Throttle scroll handler
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
