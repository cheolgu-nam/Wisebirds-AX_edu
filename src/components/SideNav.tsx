"use client";

import { useState } from "react";
import type { SlideMeta } from "./Deck";
import { ACCENTS } from "@/lib/theme";

/** Right-side labeled TOC navigation (collapsible). */
export function SideNav({
  slides,
  active,
  showLabels,
  onJump,
}: {
  slides: SlideMeta[];
  active: number;
  showLabels: boolean;
  onJump: (i: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <nav
      aria-label="슬라이드 네비게이션"
      className="fixed right-[18px] top-[76px] bottom-4 z-40 hidden flex-col items-end gap-[7px] overflow-y-auto overflow-x-hidden py-1 md:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {slides.map((s, i) => {
        const on = i === active;
        const a = ACCENTS[s.accent];
        const label = showLabels || on || hover === i;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onJump(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            aria-current={on ? "true" : undefined}
            aria-label={`${s.nav} (${i + 1})`}
            className="flex items-center justify-end gap-2 border-0 bg-transparent p-0"
          >
            {label && (
              <span
                className="whitespace-nowrap rounded-full border border-line bg-white/92 px-2.5 py-0.5 text-[11.5px] font-bold shadow-sm backdrop-blur transition-colors"
                style={{ color: on ? a.deep : "#475569" }}
              >
                {s.nav}
              </span>
            )}
            <span
              aria-hidden
              className="block shrink-0 rounded-full transition-all duration-200 ease-out"
              style={{
                width: on ? 10 : 8,
                height: on ? 10 : 8,
                backgroundColor: on ? a.dot : "rgba(148,163,184,0.45)",
                boxShadow: on ? `0 0 0 3px ${a.ring}` : "none",
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
