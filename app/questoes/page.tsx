"use client";

import { useState, useCallback, useEffect } from "react";
import AppHeader from "@/components/layout/AppHeader";
import HintPanel from "@/components/ui/HintPanel";
import FeedbackToast, { FeedbackType } from "@/components/ui/FeedbackToast";
import NodeProgressCircle from "@/components/ui/NodeProgressCircle";
import { QUESTIONS } from "@/lib/domain-questions";
import { MODULES } from "@/lib/domain";
import { useProficiency } from "@/hooks/useProficiency";
import type { Question } from "@/lib/domain";

function getNodeInfo(nodeId: string) {
  for (const module of MODULES) {
    for (const node of module.nodes) {
      if (node.id === nodeId) return { module, node };
    }
  }
  return null;
}

function selectNextQuestion(
  solvedIds: Set<string>,
  getProficiency: (nodeId: string) => number,
  questions: Question[],
  excludeId?: string,
): Question | null {
  const unsolved = questions.filter(
    (q) => !solvedIds.has(q.id) && q.id !== excludeId,
  );
  if (unsolved.length === 0) return null;

  const scored = unsolved.map((q) => {
    const nodeProf = getProficiency(q.nodeId);
    let difficultyScore = 0;
    if (nodeProf < 40 && q.difficulty === "easy") difficultyScore = 3;
    else if (nodeProf >= 40 && nodeProf <= 70 && q.difficulty === "medium")
      difficultyScore = 3;
    else if (nodeProf > 70 && q.difficulty === "hard") difficultyScore = 3;
    else difficultyScore = 1;
    const weakBonus = nodeProf < 60 ? 1 : 0;
    return { question: q, score: difficultyScore + weakBonus };
  });

  const maxScore = Math.max(...scored.map((s) => s.score));
  const topQuestions = scored
    .filter((s) => s.score === maxScore)
    .map((s) => s.question);
  return topQuestions[Math.floor(Math.random() * topQuestions.length)];
}

export default function TutoringPage() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [showSolutionWarning, setShowSolutionWarning] = useState(false);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [questionCount, setQuestionCount] = useState(0);

  const { getProficiency, recordAttempt, hydrated } = useProficiency();

  useEffect(() => {
    if (hydrated && !currentQuestion) {
      const first = selectNextQuestion(new Set(), getProficiency, QUESTIONS);
      if (first) setCurrentQuestion(first);
    }
  }, [hydrated, currentQuestion, getProficiency]);

  const question = currentQuestion;
  const isSolved = question ? solvedIds.has(question.id) : false;
  const nodeProficiency = question ? getProficiency(question.nodeId) : 0;
  const nodeInfo = question ? getNodeInfo(question.nodeId) : null;

  const handleSubmit = () => {
    if (!question || !answer.trim()) return;
    const isCorrect =
      answer.trim().toLowerCase() === question.answer.toLowerCase();

    recordAttempt(question.nodeId, question.id, isCorrect);

    if (isCorrect) {
      setFeedback("correct");
      setSolvedIds((s) => new Set(s).add(question.id));
    } else {
      setFeedback("error");
    }
    setAnswer("");
  };

  const handleHintUsed = useCallback(() => {
    setFeedback("hint");
  }, []);

  const handleShowSolution = () => {
    if (!question) return;
    recordAttempt(question.nodeId, question.id, false);
    setFeedback("error");
    setShowSolutionWarning(false);
    setAnswer(question.answer);
  };

  const handleNext = () => {
    if (!question) return;
    const next = selectNextQuestion(
      solvedIds,
      getProficiency,
      QUESTIONS,
      question.id,
    );
    if (next) {
      setCurrentQuestion(next);
      setAnswer("");
      setFeedback(null);
      setShowSolutionWarning(false);
      setQuestionCount((c) => c + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const progressStatus =
    nodeProficiency >= 80 ? "completed" : "in_progress";

  if (!hydrated || !question) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">
        Carregando questões...
      </div>
    );
  }

  const moduleName = nodeInfo?.module.title ?? "";
  const moduleNumber = nodeInfo?.module.number ?? 0;
  const nodeLabel = nodeInfo?.node.label ?? "";

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
                  proficiency={nodeProficiency}
                  status={progressStatus}
                  size={56}
                  strokeWidth={4}
                />
                <div>
                  <p className="text-xs text-violet-400 font-medium">
                    Módulo {moduleNumber} › Nó {question.nodeId}
                  </p>
                  <p className="text-sm font-semibold text-slate-200 leading-snug mt-0.5">
                    {nodeLabel}
                  </p>
                </div>
              </div>

              {/* Proficiency bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Proficiência</span>
                  <span className="font-mono font-medium text-violet-400">
                    {nodeProficiency}%
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${nodeProficiency}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-600">
                  {nodeProficiency >= 80
                    ? "✓ Pronto para o exame!"
                    : `${80 - nodeProficiency}% até o exame do módulo`}
                </p>
              </div>

              {/* Exam ready CTA */}
              {nodeProficiency >= 80 && (
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
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Acertos aumentam sua proficiência</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Erros reduzem sua proficiência</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400 font-bold">80%</span>
                  <span>para desbloquear o exame</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400 font-bold">🧠</span>
                  <span>Questões adaptadas ao seu nível</span>
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
            key={question.id}
          >
            {/* <QuestionCard /> */}
            <div className="card p-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
                <span>Módulo {moduleNumber}</span>
                <span>›</span>
                <span>{moduleName}</span>
                <span>›</span>
                <span className="text-violet-400">
                  Nó {question.nodeId} — {nodeLabel}
                </span>
              </div>

              {/* Question counter & difficulty badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                  Questão {questionCount + 1}
                </span>
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${
                    question.difficulty === "easy"
                      ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                      : question.difficulty === "medium"
                        ? "text-yellow-400 border-yellow-500/20 bg-yellow-500/10"
                        : "text-red-400 border-red-500/20 bg-red-500/10"
                  }`}
                >
                  {question.difficulty === "easy"
                    ? "Fácil"
                    : question.difficulty === "medium"
                      ? "Médio"
                      : "Difícil"}
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
                      Confirmar
                    </button>
                  )}
                </div>

                {showSolutionWarning && (
                  <p className="text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2 animate-fade-in">
                    ⚠ Ver a solução contará como erro na sua proficiência.
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
      <FeedbackToast
        type={feedback}
        onClose={() => setFeedback(null)}
        proficiency={nodeProficiency}
        nodeId={question.nodeId}
      />
    </div>
  );
}
