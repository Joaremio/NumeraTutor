"use client";

import { useEffect } from "react";

// <FeedbackToast /> — Immediate feedback notification (Behaviorism)
export type FeedbackType = "correct" | "error" | "hint" | null;

interface FeedbackToastProps {
  type: FeedbackType;
  onClose: () => void;
}

const FEEDBACK_CONFIG = {
  correct: {
    icon: "✓",
    title: "Resposta correta!",
    subtitle: "+5% de proficiência adicionados.",
    bg: "bg-emerald-500/15 border-emerald-500/40",
    icon_bg: "bg-emerald-500/20",
    icon_color: "text-emerald-400",
    text: "text-emerald-300",
    bar: "bg-emerald-500",
  },
  error: {
    icon: "✕",
    title: "Resposta incorreta.",
    subtitle: "−5% de proficiência subtraídos. Tente novamente.",
    bg: "bg-red-500/15 border-red-500/40",
    icon_bg: "bg-red-500/20",
    icon_color: "text-red-400",
    text: "text-red-300",
    bar: "bg-red-500",
  },
  hint: {
    icon: "💡",
    title: "Dica utilizada.",
    subtitle: "−5% de proficiência subtraídos.",
    bg: "bg-orange-500/15 border-orange-500/40",
    icon_bg: "bg-orange-500/20",
    icon_color: "text-orange-400",
    text: "text-orange-300",
    bar: "bg-orange-500",
  },
};

export default function FeedbackToast({ type, onClose }: FeedbackToastProps) {
  useEffect(() => {
    if (!type) return;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [type, onClose]);

  if (!type) return null;

  const cfg = FEEDBACK_CONFIG[type];

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 p-4 rounded-2xl border
                  ${cfg.bg} backdrop-blur-sm shadow-2xl animate-slide-up max-w-sm`}
      role="alert"
    >
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cfg.icon_bg}`}>
        <span className={`text-sm font-bold ${cfg.icon_color}`}>{cfg.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${cfg.text}`}>{cfg.title}</p>
        <p className="text-xs text-slate-400 mt-0.5">{cfg.subtitle}</p>
        {/* Auto-close bar */}
        <div className="mt-2 h-0.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${cfg.bar} rounded-full`}
            style={{
              animation: "progressFill 3.5s linear forwards",
              "--progress-width": "100%",
            } as React.CSSProperties}
          />
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-slate-500 hover:text-slate-300 text-lg leading-none transition-colors"
        aria-label="Fechar"
      >
        ×
      </button>
    </div>
  );
}
