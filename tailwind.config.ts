import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-grad-violet",
    "bg-grad-blue",
    "bg-grad-teal",
    "bg-grad-coral",
    "bg-page-a",
    "bg-page-b",
    "bg-page-c",
    "bg-page-plain",
    "bg-page-alt",
  ],
  theme: {
    extend: {
      colors: {
        // ── Light violet tone-and-manner (ref: zqendix / stardive #8800ff) ──
        brand: {
          violet: "#7c3aed", // primary
          violetDeep: "#6d28d9",
          violet500: "#8b5cf6",
          violet400: "#a78bfa",
          indigo: "#4f46e5",
          // per-section supporting accents
          blue: "#2563eb", // B · iOS SKAN
          blueDeep: "#1d4ed8",
          teal: "#0d9488", // C · 웹투앱/앱투웹
          tealDeep: "#0f766e",
          coral: "#f0576d", // supporting / legacy Wisebirds
          amber: "#d97706",
          // text ramp
          ink: "#0f172a",
          sub: "#334155",
          mut: "#64748b",
          faint: "#94a3b8",
        },
        pos: "#16a34a",
        neg: "#dc2626",
        warn: "#d97706",
        line: "rgba(15,23,42,0.09)",
        surface: {
          base: "#f7f8fc",
          card: "#ffffff",
          soft: "#f4f6fb",
          mist: "#eef1f8",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        display: ["Space Grotesk", "Pretendard Variable", "Pretendard", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 2px 14px rgba(15,23,42,0.05)",
        cardHover: "0 16px 40px rgba(15,23,42,0.12)",
        float: "0 18px 44px rgba(15,23,42,0.16)",
        mock: "0 24px 60px rgba(15,23,42,0.22)",
        glowViolet: "0 8px 24px rgba(124,58,237,0.34)",
      },
      backgroundImage: {
        "grad-violet": "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)",
        "grad-blue": "linear-gradient(135deg,#60a5fa 0%,#2563eb 100%)",
        "grad-teal": "linear-gradient(135deg,#5eead4 0%,#0d9488 100%)",
        "grad-coral": "linear-gradient(135deg,#fbb18a 0%,#f0576d 100%)",
        "page-a": "linear-gradient(165deg,#ffffff 0%,#f5f3ff 100%)",
        "page-b": "linear-gradient(165deg,#ffffff 0%,#f0f5ff 100%)",
        "page-c": "linear-gradient(165deg,#ffffff 0%,#effcf9 100%)",
        "page-plain": "linear-gradient(165deg,#ffffff 0%,#f7f8fc 100%)",
        "page-alt": "linear-gradient(165deg,#f5f3ff 0%,#e9e4ff 100%)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        dash: { to: { strokeDashoffset: "-16" } },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        dash: "dash 0.9s linear infinite",
        bob: "bob 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
