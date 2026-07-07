"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { WisebirdsLogo } from "./Logo";
import { SideNav } from "./SideNav";
import { ACCENTS, type Accent } from "@/lib/theme";

export type GroupKey = "intro" | "A" | "B" | "C" | "close";

export type SlideMeta = {
  id: string;
  nav: string;
  group: GroupKey;
  accent: Accent;
  /** optional tailwind bg-* override */
  bg?: string;
};

export type SlideDef = SlideMeta & { node: ReactNode };

const GROUP_LABEL: Record<GroupKey, string> = {
  intro: "Introduction",
  A: "A. 앱 리타겟팅",
  B: "B. iOS SKAN",
  C: "C. 웹투앱 · 앱투웹",
  close: "Wrap-up",
};

export function Deck({ slides }: { slides: SlideDef[] }) {
  const [active, setActive] = useState(0);
  const [showLabels, setShowLabels] = useState(true);
  const lockRef = useRef(false);
  const total = slides.length;

  /* smooth one-section snap */
  const goTo = useCallback(
    (target: number) => {
      const c = document.getElementById("deck-scroll");
      if (!c || lockRef.current) return;
      const clamped = Math.max(0, Math.min(total - 1, target));
      const H = c.clientHeight;
      if (Math.round(c.scrollTop / H) === clamped) return;
      lockRef.current = true;
      c.scrollTo({ top: clamped * H, behavior: "smooth" });
      window.setTimeout(() => (lockRef.current = false), 520);
    },
    [total]
  );

  const jumpTo = useCallback(
    (i: number) => {
      const c = document.getElementById("deck-scroll");
      if (!c) return;
      const clamped = Math.max(0, Math.min(total - 1, i));
      lockRef.current = true;
      c.scrollTo({ top: clamped * c.clientHeight, behavior: "smooth" });
      setActive(clamped);
      window.setTimeout(() => (lockRef.current = false), 620);
    },
    [total]
  );

  /* active tracking via center-line IntersectionObserver + wheel/key/touch snap */
  useEffect(() => {
    const c = document.getElementById("deck-scroll");
    if (!c) return;
    const cur = () => Math.round(c.scrollTop / c.clientHeight);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = Number((e.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      { root: c, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    c.querySelectorAll<HTMLElement>("[data-index]").forEach((el) => io.observe(el));

    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      if (lockRef.current || Math.abs(e.deltaY) < 5) return;
      goTo(cur() + (e.deltaY > 0 ? 1 : -1));
    };
    const key = (e: KeyboardEvent) => {
      if (lockRef.current) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(cur() + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(cur() - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      }
    };
    let ty = 0;
    const ts = (e: TouchEvent) => (ty = e.touches[0].clientY);
    const te = (e: TouchEvent) => {
      if (lockRef.current) return;
      const d = ty - e.changedTouches[0].clientY;
      if (Math.abs(d) < 40) return;
      goTo(cur() + (d > 0 ? 1 : -1));
    };

    c.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", key);
    c.addEventListener("touchstart", ts, { passive: true });
    c.addEventListener("touchend", te, { passive: true });
    return () => {
      io.disconnect();
      c.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", key);
      c.removeEventListener("touchstart", ts);
      c.removeEventListener("touchend", te);
    };
  }, [goTo, total]);

  const current = slides[active] ?? slides[0];
  const curAccent = ACCENTS[current.accent];

  return (
    <div className="fixed inset-0 flex flex-col bg-surface-base font-sans text-brand-ink">
      {/* ── top bar ── */}
      <header className="relative z-30 flex flex-shrink-0 items-center justify-between gap-5 border-b border-line bg-white/85 px-7 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <WisebirdsLogo />
          <span aria-hidden className="h-4 w-px bg-line" />
          <span className="hidden text-[12px] font-bold tracking-wide text-brand-sub sm:inline">
            W-Insight · 앱 광고 교육
          </span>
          <span className="hidden rounded-md bg-brand-violet/10 px-2 py-0.5 text-[11px] font-bold text-brand-violet md:inline">
            중급편
          </span>
        </div>

        {/* deck nav */}
        <div className="flex items-center gap-3.5">
          <span className="max-w-[220px] truncate text-right text-[14px] font-extrabold tracking-tight text-brand-ink">
            {current.nav}
          </span>
          <span aria-hidden className="h-[18px] w-px bg-line" />
          <div className="flex items-center gap-1.5 font-display text-[12px] tracking-wide text-brand-sub">
            <span className="text-[14px] font-bold text-brand-ink">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="text-brand-faint">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowLabels((v) => !v)}
            title="목차 표시/숨기기"
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-display text-[12px] font-bold transition-colors ${
              showLabels
                ? "border-brand-violet/35 bg-brand-violet/10 text-brand-violet"
                : "border-line bg-white/80 text-brand-sub"
            }`}
          >
            ☰ {showLabels ? "목차 숨기기" : "목차 보기"}
          </button>
        </div>
      </header>

      {/* ── scroll container ── */}
      <main
        id="deck-scroll"
        tabIndex={-1}
        className="flex-1 overflow-y-auto overflow-x-hidden outline-none [overscroll-behavior:none]"
      >
        {slides.map((s, i) => {
          const a = ACCENTS[s.accent];
          return (
            <section
              key={s.id}
              id={s.id}
              data-index={i}
              className={`relative flex h-full min-h-full items-center justify-center border-b border-line ${
                s.bg ?? a.pageBg
              }`}
            >
              {/* PAGE marker */}
              <div
                className="pointer-events-none absolute left-10 top-8 font-display text-[11px] font-bold tracking-[0.22em]"
                style={{ color: a.main, opacity: 0.85 }}
              >
                PAGE {String(i + 1).padStart(2, "0")}
              </div>

              {s.node}

              {/* SCROLL button */}
              {i < total - 1 && (
                <button
                  type="button"
                  onClick={() => jumpTo(i + 1)}
                  aria-label="다음 슬라이드"
                  className="absolute bottom-7 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-white/85 px-4 py-2.5 font-display text-[11px] font-semibold tracking-[0.08em] text-brand-sub backdrop-blur transition-colors hover:text-brand-violet"
                >
                  SCROLL <span aria-hidden className="animate-bob">↓</span>
                </button>
              )}
            </section>
          );
        })}
      </main>

      {/* ── progress bar ── */}
      <div className="pointer-events-none absolute left-0 top-0 z-40 h-[3px] w-full">
        <div
          className="h-full transition-[width] duration-500 ease-out"
          style={{
            width: `${total > 1 ? (active / (total - 1)) * 100 : 0}%`,
            background: `linear-gradient(90deg, ${curAccent.deep}, ${curAccent.main})`,
          }}
        />
      </div>

      <SideNav
        slides={slides}
        active={active}
        showLabels={showLabels}
        onJump={jumpTo}
      />
    </div>
  );
}
