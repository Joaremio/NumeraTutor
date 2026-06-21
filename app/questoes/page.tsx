"use client";

import { useState, useCallback } from "react";
import AppHeader from "@/components/layout/AppHeader";
import HintPanel from "@/components/ui/HintPanel";
import FeedbackToast, { FeedbackType } from "@/components/ui/FeedbackToast";
import NodeProgressCircle from "@/components/ui/NodeProgressCircle";
import { QUESTIONS } from "@/lib/domain";

// <TutoringPage /> — Interactive problem-solving environment
export default function TutoringPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [proficiency, setProficiency] = useState(45);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [showSolutionWarning, setShowSolutionWarning] = useState(false);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());

  const question = QUESTIONS[currentQuestionIndex % QUESTIONS.length];
  const isSolved = solvedIds.has(question.id);

  const adjustProficiency = (delta: number) => {
    setProficiency((p) => Math.max(0, Math.min(100, p + delta)));
  };

  const handleSubmit = () => {
    if (!answer.trim()) return;
    const isCorrect =
      answer.trim().toLowerCase() === question.answer.toLowerCase();

    if (isCorrect) {
      setFeedback("correct");
      adjustProficiency(5);
      setSolvedIds((s) => new Set(s).add(question.id));
    } else {
      setFeedback("error");
      adjustProficiency(-5);
    }
    setAnswer("");
  };

  const handleHintUsed = useCallback(() => {
    setFeedback("hint");
    adjustProficiency(-5);
  }, []);

  const handleShowSolution = () => {
    setFeedback("error");
    adjustProficiency(-5);
    setShowSolutionWarning(false);
    setAnswer(question.answer);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((i) => i + 1);
    setAnswer("");
    setFeedback(null);
    setShowSolutionWarning(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const progressStatus =
    proficiency >= 80
      ? "completed"
      : proficiency > 0
        ? "in_progress"
        : "in_progress";

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <AppHeader />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Node context panel */}
          <aside className="lg:col-span-1 space-y-4 animate-slide-up">
            {/* Current node card */}
            <div className="card p-5">
              <p className="text-[10px] font-mono text-slate-500 tracking-widest uppercase mb-3">
                Nó atual
              </p>
              <div className="flex items-center gap-3 mb-4">
                <NodeProgressCircle
                  proficiency={proficiency}
                  status={progressStatus}
                  size={56}
                  strokeWidth={4}
                />
                <div>
                  <p className="text-xs text-violet-400 font-medium">
                    Módulo 2 › Nó 2.2
                  </p>
                  <p className="text-sm font-semibold text-slate-200 leading-snug mt-0.5">
                    Conversão Decimal para Binário
                  </p>
                </div>
              </div>

              {/* Proficiency bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Proficiência</span>
                  <span className="font-mono font-medium text-violet-400">
                    {proficiency}%
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${proficiency}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-600">
                  {proficiency >= 80
                    ? "✓ Pronto para o exame!"
                    : `${80 - proficiency}% até o exame do módulo`}
                </p>
              </div>

              {/* Exam ready CTA */}
              {proficiency >= 80 && (
                <a
                  href="/exame"
                  className="mt-4 block w-full text-center text-xs font-semibold btn-primary py-2.5"
                >
                  Realizar Exame do Módulo →
                </a>
              )}
            </div>

            {/* Rules reminder */}
            <div className="card p-4 space-y-2.5">
              <p className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
                Como funciona
              </p>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">+5%</span>
                  <span>por acerto direto</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">−5%</span>
                  <span>por erro ou dica usada</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400 font-bold">80%</span>
                  <span>para desbloquear o exame</span>
                </div>
              </div>
            </div>

            {/* Nav between questions */}
            <button
              onClick={handleNext}
              className="w-full btn-secondary text-sm"
            >
              Próxima questão →
            </button>
          </aside>

          {/* RIGHT: Question + Answer */}
          <section
            className="lg:col-span-2 space-y-4 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            {/* <QuestionCard /> */}
            <div className="card p-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
                <span>Módulo 2</span>
                <span>›</span>
                <span>Sistema Binário</span>
                <span>›</span>
                <span className="text-violet-400">
                  Nó 2.2 — Conversão Decimal → Binário
                </span>
              </div>

              {/* Question counter */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                  Questão {(currentQuestionIndex % QUESTIONS.length) + 1} de{" "}
                  {QUESTIONS.length}
                </span>
                {isSolved && (
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    ✓ Resolvida
                  </span>
                )}
              </div>

              {/* Question text */}
              <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/50 mb-5">
                <p className="text-lg font-medium text-slate-100 leading-relaxed">
                  {question.text}
                </p>
              </div>

              {/* <AnswerInput /> */}
              <div className="space-y-3">
                <label className="block text-xs font-medium text-slate-400">
                  Sua resposta
                </label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite aqui..."
                  className="input-field"
                  aria-label="Campo de resposta"
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={!answer.trim()}
                    className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Confirmar Resposta
                  </button>

                  {!showSolutionWarning ? (
                    <button
                      onClick={() => setShowSolutionWarning(true)}
                      className="btn-danger text-sm px-4"
                    >
                      Ver Solução
                    </button>
                  ) : (
                    <button
                      onClick={handleShowSolution}
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors"
                    >
                      Confirmar (−5%)
                    </button>
                  )}
                </div>

                {showSolutionWarning && (
                  <p className="text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2 animate-fade-in">
                    ⚠ Ver a solução subtrairá 5% da sua proficiência neste nó.
                  </p>
                )}
              </div>
            </div>

            {/* <HintPanel /> */}
            <div className="card p-5">
              <HintPanel hints={question.hints} onHintUsed={handleHintUsed} />
            </div>

            {/* Explanation (shown after solve) */}
            {isSolved && (
              <div className="card p-5 border-emerald-500/30 bg-emerald-500/5 animate-slide-up">
                <p className="text-xs font-medium text-emerald-400 mb-2">
                  💡 Explicação
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* <FeedbackToast /> */}
      <FeedbackToast type={feedback} onClose={() => setFeedback(null)} />
    </div>
  );
}
