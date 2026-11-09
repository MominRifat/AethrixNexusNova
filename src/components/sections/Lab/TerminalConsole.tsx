"use client";

import React, { useState } from "react";
import { Terminal, Sparkles, RefreshCw } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ArchitecturePlan, ArchitectureResponse } from "@/lib/architect/types";
import { generateMockArchitecture } from "@/lib/architect/mockProvider";
import { ArchitectureOutput } from "./ArchitectureOutput";
import { cn } from "@/lib/utils";

const EXAMPLE_PROMPTS = [
  "Multi-tenant healthcare SaaS with HIPAA compliance and voice-based clinical triage",
  "3D Spatial commerce platform with Gemini multi-modal vector search and 120 FPS WebGL models",
  "Offline-first industrial edge IoT with autonomous drone telemetry and on-device YOLO vision",
];

export function TerminalConsole() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ArchitecturePlan | null>(null);
  const [provider, setProvider] = useState<"live" | "demo">("demo");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async (customPrompt?: string) => {
    const textToQuery = (customPrompt || prompt).trim();
    if (!textToQuery || isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Call server-side API route
      const res = await fetch("/api/architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToQuery }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Rate limit exceeded (5 requests/minute). Please wait.");
        }
        throw new Error("Network request failed, falling back to local mock generator.");
      }

      const data: ArchitectureResponse = await res.json();
      setResult(data.plan);
      setProvider(data.provider || "demo");
    } catch {
      // Robust client-side fallback if route or network has issues
      const fallback = await generateMockArchitecture(textToQuery);
      setResult(fallback);
      setProvider("demo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (ex: string) => {
    setPrompt(ex);
    handleGenerate(ex);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-[#0e0b07] border border-white/[0.12] shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden">
      {/* Terminal Top Window Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#17120a] border-b border-white/[0.08] select-none">
        <div className="flex items-center gap-2">
          {/* macOS Terminal Dots */}
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]/90 border border-[#1aab29]" />
          <span className="ml-2 font-mono text-xs text-[#b7ae9c] hidden sm:inline">
            solution-architect.sh — zsh — 80×24
          </span>
        </div>

        {/* Status Chip */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span
            className={cn(
              "px-2.5 py-0.5 rounded-full text-[11px] font-semibold border flex items-center gap-1.5",
              provider === "live"
                ? "bg-[#34d399]/10 text-[#34d399] border-[#34d399]/30"
                : "bg-[#ffd426]/10 text-[#ffd426] border-[#ffd426]/30"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full animate-ping",
                provider === "live" ? "bg-[#34d399]" : "bg-[#ffd426]"
              )}
            />
            {provider === "live" ? "Live Gemini API" : "Demo Engine (Active)"}
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 sm:p-8">
        {/* Command Line Prompt Indicator */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#7d7566] mb-3">
          <Terminal className="h-4 w-4 text-[#ffd426]" />
          <span>aethrix-nexus@console:~$ ./architect --synthesize-blueprint</span>
        </div>

        {/* Input Textarea Container */}
        <div className="relative rounded-2xl bg-[#120e08] border border-white/[0.08] focus-within:border-[#ffd426]/50 transition-colors p-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, 600))}
            placeholder="e.g. Multi-tenant healthcare SaaS with HIPAA compliance and voice-based triage"
            rows={3}
            disabled={isLoading}
            className="w-full bg-transparent text-sm sm:text-base text-[#f5f3ee] placeholder-[#7d7566] focus:outline-none resize-none font-sans leading-relaxed"
          />

          {/* Bottom Bar inside Input: Character Counter + Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.05]">
            <span className="font-mono text-xs text-[#7d7566]">
              {prompt.length} / 600 characters max
            </span>

            <button
              onClick={() => handleGenerate()}
              disabled={isLoading || !prompt.trim()}
              aria-label="Generate software architecture plan"
              className={cn(
                "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-xs tracking-wider uppercase transition-all duration-200 select-none",
                isLoading || !prompt.trim()
                  ? "bg-white/[0.05] text-[#7d7566] border border-white/[0.08] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#ffd426] to-[#ff9f1c] text-[#0a0805] hover:shadow-[0_0_24px_rgba(255,212,38,0.4)] active:scale-95"
              )}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="xs" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-[#0a0805]" />
                  <span>Generate Architecture</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3 Clickable Example Chips */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 text-xs font-mono">
          <span className="text-[#7d7566] shrink-0">Try archetypes:</span>
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLE_PROMPTS.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => handleExampleClick(ex)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[#b7ae9c] hover:text-[#ffd426] hover:border-[#ffd426]/30 hover:bg-white/[0.06] transition-all text-[11px] truncate max-w-full text-left"
              >
                {ex.length > 46 ? `${ex.slice(0, 46)}...` : ex}
              </button>
            ))}
          </div>
        </div>

        {/* Error Notification (if any) */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-[#f87171]/10 border border-[#f87171]/20 font-mono text-xs text-[#f87171] flex items-center justify-between">
            <span>{errorMsg}</span>
            <button
              onClick={() => handleGenerate()}
              className="underline flex items-center gap-1 hover:text-white"
            >
              <RefreshCw className="h-3 w-3" /> Retry
            </button>
          </div>
        )}

        {/* Output Panel Rendered in Staged Streaming Steps */}
        {result && <ArchitectureOutput plan={result} provider={provider} />}
      </div>
    </div>
  );
}
