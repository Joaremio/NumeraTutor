"use client";

import { useState } from "react";
import Link from "next/link";
import AppHeader from "@/components/layout/AppHeader";
import { EXAM_QUESTIONS } from "@/lib/domain";

type ExamPhase = "intro" | "question" | "result";

// <ExamPage /> — Module completion exam with focused interface
export default function ExamPage() {
  const [phase, setPhase] = useState<ExamPhase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);

  const total = EXAM_QUESTIONS.length;
  const current = EXAM_QUESTIONS[currentIndex];
  const isLast = currentIndex === total - 1;

  const correctCount = Object.entries(answers).filter(
    ([id, ans]) => EXAM_QUESTIONS.find((q) => q.id === id)?.answer === ans
  ).length;
  const scorePercent = Math.round((correctCount / total) * 100);
  const passed = scorePercent >= 70;

  const handleConfirmAnswer = () => {
    if (!selected) return;
    setAnswers((prev) => ({ ...prev, [current.id]: selected }));
    setConfirmed(true);
  };

  const handleNext = () => {
    if (isLast) {
      setPhase("result");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setConfirmed(false);
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrentIndex(0);
    setSelected(null);
    setAnswers({});
    setConfirmed(false);
  };

  // ── INTRO ──────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-[#0F172A]">
        <AppHeader />
        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <div className="card p-8 text-center space-y-6 animate-slide-up">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-xl shadow-violet-500/30 text-3xl">
                ◈
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-2">
                Exame de Conclusão
              </p>
              <h1 className="text-2xl font-bold text-slate-100">Módulo 2 — Sistema Binário</h1>
              <p className="text-slate-400 text-sm mt-2">
                Você atingiu 80% de proficiência. Está pronto para avançar?
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Questões", value: total },
                { label: "Mínimo para passar", value: "70%" },
                { label: "Sem dicas", value: "⚡" },
              ].map((item) => (
                <div key={item.label} className="bg-slate-800/60 rounded-xl p-3 border border-slate-700">
                  <p className="text-xl font-bold text-slate-100">{item.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500">
              Este exame cobre todos os conceitos-chave do Módulo 2. Sem dicas disponíveis.
            </p>

            <button
              onClick={() => setPhase("question")}
              className="btn-primary w-full py-3 text-base"
            >
              Iniciar Exame →
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ── RESULT ─────────────────────────────────────────────────────
  if (phase === "result") {
    return (
      <div className="min-h-screen bg-[#0F172A]">
        <AppHeader />
        <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          {/* <ExamResultModal /> */}
          <div className="card p-8 space-y-6 animate-slide-up">
            {/* Score */}
            <div className="text-center space-y-2">
              <div
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 text-3xl font-bold
                            ${passed
                              ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                              : "border-orange-500 text-orange-400 bg-orange-500/10"
                            }`}
              >
                {scorePercent}%
              </div>

              <div>
                <h2 className={`text-xl font-bold ${passed ? "text-emerald-400" : "text-orange-400"}`}>
                  {passed ? "Parabéns! Módulo concluído." : "Quase lá! Continue praticando."}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  {passed
                    ? "Você pode avançar para o Módulo 3 — Sistema Hexadecimal."
                    : `Você acertou ${correctCount} de ${total}. São necessárias 70% de acerto para avançar.`}
                </p>
              </div>
            </div>

            {/* Question breakdown */}
            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-500 tracking-widest uppercase">
                Revisão das questões
              </p>
              {EXAM_QUESTIONS.map((q) => {
                const userAns = answers[q.id];
                const correct = userAns === q.answer;
                return (
                  <div
                    key={q.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${
                      correct
                        ? "bg-emerald-500/5 border-emerald-500/20"
                        : "bg-red-500/5 border-red-500/20"
                    }`}
                  >
                    <span className={`shrink-0 font-bold mt-0.5 ${correct ? "text-emerald-400" : "text-red-400"}`}>
                      {correct ? "✓" : "✕"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-300 leading-snug">{q.text}</p>
                      {!correct && (
                        <p className="text-xs text-slate-500 mt-1">
                          Sua resposta: <span className="text-red-400">{userAns}</span>
                          {" · "}Correta: <span className="text-emerald-400">{q.answer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {passed ? (
                <Link href="/dashboard" className="flex-1 btn-success text-center py-3 text-sm font-semibold">
                  Avançar para Módulo 3 →
                </Link>
              ) : (
                <>
                  <Link href="/tutoria" className="flex-1 btn-secondary text-center py-3 text-sm">
                    Revisar Módulo
                  </Link>
                  <button onClick={handleRestart} className="flex-1 btn-primary py-3 text-sm">
                    Tentar Novamente
                  </button>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── QUESTION ───────────────────────────────────────────────────
  const currentAnswer = answers[current.id];
  const isAnswered = !!currentAnswer;

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* <ExamHeader /> — Focused, no sidebar nav */}
      <header className="sticky top-0 z-50 border-b border-slate-700/60 bg-[#0F172A]/95 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500">Exame — Módulo 2</p>
              <p className="text-sm font-semibold text-slate-200">Sistema Binário</p>
            </div>

            {/* Progress counter */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 tabular-nums">
                {currentIndex + 1} / {total}
              </span>
              <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${((currentIndex + (confirmed ? 1 : 0)) / total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="space-y-5 animate-slide-up" key={current.id}>
          {/* <ExamQuestionCard /> */}
          <div className="card p-6">
            <p className="text-xs font-mono text-slate-500 mb-4">
              Questão {currentIndex + 1} de {total}
            </p>
            <p className="text-lg font-medium text-slate-100 leading-relaxed">
              {current.text}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {current.options.map((opt) => {
              const isSelected = selected === opt;
              const isCorrectOpt = opt === current.answer;
              const showResult = confirmed;

              let optClass = "card p-4 text-left font-mono text-base font-semibold transition-all duration-200 border-2 ";

              if (showResult) {
                if (isCorrectOpt) optClass += "border-emerald-500 bg-emerald-500/10 text-emerald-300";
                else if (isSelected && !isCorrectOpt) optClass += "border-red-500 bg-red-500/10 text-red-400";
                else optClass += "border-slate-700 text-slate-600";
              } else {
                optClass += isSelected
                  ? "border-violet-500 bg-violet-500/15 text-violet-200 glow-violet"
                  : "border-slate-700 text-slate-300 hover:border-violet-500/50 hover:text-slate-100 cursor-pointer";
              }

              return (
                <button
                  key={opt}
                  onClick={() => !confirmed && setSelected(opt)}
                  className={optClass}
                  disabled={confirmed}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {!confirmed ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={!selected}
                className="flex-1 btn-primary py-3 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 btn-primary py-3"
              >
                {isLast ? "Finalizar Exame →" : "Próxima Questão →"}
              </button>
            )}
          </div>

          {/* Inline feedback */}
          {confirmed && (
            <div
              className={`p-4 rounded-xl border text-sm animate-fade-in ${
                answers[current.id] === current.answer
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-red-500/10 border-red-500/30 text-red-300"
              }`}
            >
              {answers[current.id] === current.answer
                ? "✓ Correto!"
                : `✕ A resposta correta era: ${current.answer}`}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
