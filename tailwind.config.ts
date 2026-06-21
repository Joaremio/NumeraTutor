import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "#6366F1",
          violet: "#8B5CF6",
          green: "#22C55E",
          orange: "#F97316",
          red: "#EF4444",
          gray: "#94A3B8",
        },
        surface: {
          900: "#0F172A",
          800: "#1E293B",
          700: "#334155",
          600: "#475569",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "progress-fill": "progressFill 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        progressFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
