"use client";

import { useState } from "react";

// <HintPanel /> — Progressive hints panel (Constructivism)
interface HintPanelProps {
  hints: string[];
  onHintUsed: () => void;
}

export default function HintPanel({ hints, onHintUsed }: HintPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (!hintUsed) {
        setHintUsed(true);
        onHintUsed();
      }
    } else {
      setIsOpen(false);
    }
  };

  const revealNextHint = () => {
    if (revealedCount < hints.length) {
      setRevealedCount((c) => c + 1);
    }
  };

  return (
    <div className="w-full">
      {/* Toggle button */}
      <button
        onClick={handleOpen}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border
                    transition-all duration-200 text-sm font-medium
                    ${isOpen
                      ? "bg-orange-500/10 border-orange-500/40 text-orange-300"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:border-orange-500/30 hover:text-orange-400"
                    }`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">💡</span>
          <span>Pedir Dica</span>
          {!hintUsed && (
            <span className="text-[10px] text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full">
              −5% proficiência
            </span>
          )}
        </div>
        <span className={`text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {/* Hints panel */}
      {isOpen && (
        <div className="mt-2 rounded-xl border border-orange-500/20 bg-orange-500/5 overflow-hidden animate-fade-in">
          <div className="p-4 space-y-3">
            <p className="text-xs text-slate-500 italic">
              As dicas revelam o caminho, não a resposta. Construa o raciocínio passo a passo.
            </p>

            {/* Revealed hints */}
            {hints.slice(0, revealedCount).map((hint, i) => (
              <div
                key={i}
                className="flex gap-3 animate-slide-up"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">{hint}</p>
              </div>
            ))}

            {/* Reveal next hint button */}
            {revealedCount < hints.length ? (
              <button
                onClick={revealNextHint}
                className="w-full text-xs font-medium text-orange-400 hover:text-orange-300
                           py-2 px-3 rounded-lg border border-orange-500/20 hover:border-orange-500/40
                           bg-orange-500/5 hover:bg-orange-500/10 transition-all duration-200"
              >
                {revealedCount === 0 ? "Mostrar primeira dica" : `Mostrar dica ${revealedCount + 1} de ${hints.length}`} →
              </button>
            ) : (
              <p className="text-xs text-slate-500 text-center py-1">
                Todas as dicas foram reveladas. Tente responder agora!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
