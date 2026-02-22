"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, Square, Volume2 } from "lucide-react";

interface TtsControlsProps {
  text: string;
}

type TtsState = "idle" | "playing" | "paused";

export function TtsControls({ text }: TtsControlsProps) {
  const [state, setState] = useState<TtsState>("idle");
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
    }
  }, []);

  // Stop speech when navigating away or unmounting
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Reset state when chapter text changes
  useEffect(() => {
    window.speechSynthesis?.cancel();
    setState("idle");
    utteranceRef.current = null;
  }, [text]);

  const handlePlay = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (state === "paused") {
      synth.resume();
      setState("playing");
      return;
    }

    // Start fresh
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;

    // Try to pick a good English voice
    const voices = synth.getVoices();
    const preferred = voices.find(
      (v) => v.lang.startsWith("en") && v.name.includes("Samantha")
    );
    const fallback = voices.find((v) => v.lang.startsWith("en") && v.default);
    const anyEnglish = voices.find((v) => v.lang.startsWith("en"));

    utterance.voice = preferred ?? fallback ?? anyEnglish ?? null;

    utterance.onend = () => setState("idle");
    utterance.onerror = () => setState("idle");

    utteranceRef.current = utterance;
    synth.speak(utterance);
    setState("playing");
  }, [state, text]);

  const handlePause = useCallback(() => {
    window.speechSynthesis?.pause();
    setState("paused");
  }, []);

  const handleStop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setState("idle");
    utteranceRef.current = null;
  }, []);

  if (!supported) return null;

  return (
    <div className="mb-8 flex items-center gap-2">
      <div className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1">
        {state === "playing" ? (
          <button
            onClick={handlePause}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            aria-label="Pause reading"
          >
            <Pause className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            aria-label={state === "paused" ? "Resume reading" : "Read aloud"}
          >
            <Play className="h-4 w-4" />
          </button>
        )}
        {state !== "idle" && (
          <button
            onClick={handleStop}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            aria-label="Stop reading"
          >
            <Square className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {state === "idle" && (
        <button
          onClick={handlePlay}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Volume2 className="h-3.5 w-3.5" />
          Listen to this chapter
        </button>
      )}
      {state === "playing" && (
        <span className="text-sm text-accent">Reading aloud...</span>
      )}
      {state === "paused" && (
        <span className="text-sm text-muted-foreground">Paused</span>
      )}
    </div>
  );
}
