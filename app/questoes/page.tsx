"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import AppHeader from "@/components/layout/AppHeader";
import HintPanel from "@/components/ui/HintPanel";
import FeedbackToast, { FeedbackType } from "@/components/ui/FeedbackToast";
import NodeProgressCircle from "@/components/ui/NodeProgressCircle";
import { QUESTIONS } from "@/lib/domain-questions";
import { MODULES } from "@/lib/domain";
import type { Question, ErrorType } from "@/lib/domain";
import { useProficiency } from "@/hooks/useProficiency";
import { useNodeProgress } from "@/hooks/useNodeProgress";
import { useSpacedRepetition, computeQuality } from "@/hooks/useSpacedRepetition";
import { useStudyPlan } from "@/hooks/useStudyPlan";

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
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [questionCount, setQuestionCount] = useState(0);
  const [exhausted, setExhausted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [confused, setConfused] = useState(false);
  const [confusedReason, setConfusedReason] = useState<string | null>(null);

  const questionStartTimeRef = useRef<number>(0);

  const { getProficiency, recordAttempt, hydrated: profHydrated } = useProficiency();
  const { isUnlocked, hydrated: progressHydrated, nodesInModuleReady } = useNodeProgress();
  const { recordReview } = useSpacedRepetition();
  const { classifyError, getConfusionStatus, getStudyPlan } = useStudyPlan();

  const hydrated = profHydrated && progressHydrated;

  const availableQuestions = useMemo(
    () => QUESTIONS.filter((q) => isUnlocked(q.nodeId)),
    [isUnlocked],
  );

  useEffect(() => {
    if (hydrated && !currentQuestion && !exhausted) {
      const first = selectNextQuestion(
        new Set(),
        getProficiency,
        availableQuestions,
      );
      if (first) setCurrentQuestion(first);
      else setExhausted(true);
    }
  }, [hydrated, currentQuestion, getProficiency, availableQuestions, exhausted]);

  const question = currentQuestion;
  const isSolved = question ? solvedIds.has(question.id) : false;
  const nodeProficiency = question ? getProficiency(question.nodeId) : 0;
  const nodeInfo = question ? getNodeInfo(question.nodeId) : null;

  const advanceToNext = useCallback(() => {
    if (!question) return;
    const next = selectNextQuestion(
      solvedIds,
      getProficiency,
      availableQuestions,
      question.id,
    );
    if (next) {
      setCurrentQuestion(next);
      setSelected(null);
      setConfirmed(false);
      setFeedback(null);
      setErrorType(null);
      setConfused(false);
      setConfusedReason(null);
      setQuestionCount((c) => c + 1);
      questionStartTimeRef.current = performance.now();
    } else {
      setExhausted(true);
    }
  }, [question, solvedIds, getProficiency, availableQuestions]);

  const handleConfirmAnswer = () => {
    if (!question || !selected) return;
    const isCorrect = selected === question.answer;
    const responseTimeMs = Math.round(performance.now() - questionStartTimeRef.current);

    // Registra tentativa com tempo de resposta e dificuldade (IRT)
    recordAttempt(question.nodeId, question.id, isCorrect, responseTimeMs, question.difficulty);

    // SM-2: registra revisão com qualidade baseada em desempenho e tempo
    const quality = computeQuality(isCorrect, responseTimeMs, false);
    recordReview(question.nodeId, quality);

    setConfirmed(true);

    if (isCorrect) {
      setFeedback("correct");
      setSolvedIds((s) => new Set(s).add(question.id));
      setErrorType(null);
    } else {
      // Classifica o tipo de erro
      const history = solvedIds.size > 0
        ? [{ correct: false }]
        : [];
      const errType = classifyError(
        question.nodeId,
        selected,
        question.answer,
        responseTimeMs,
        history,
      );
      setErrorType(errType);
      setFeedback("error");

      // Detecta confusão/desengajamento
      const recentHistory = [{ correct: false, responseTimeMs }];
      const status = getConfusionStatus(question.nodeId, recentHistory);
      if (status.confused) {
        setConfused(true);
        setConfusedReason(status.reason);
      }
    }
  };

  useEffect(() => {
    setSelected(null);
    setConfirmed(false);
    setErrorType(null);
    setConfused(false);
    setConfusedReason(null);
    questionStartTimeRef.current = performance.now();
  }, [currentQuestion]);

  const handleHintUsed = useCallback(() => {
    setFeedback("hint");
  }, []);

  const progressStatus =
    nodeProficiency >= 80 ? "completed" : "in_progress";

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">
        Carregando questões...
      </div>
    );
  }

  if (exhausted || !question) {
    return (
      <div className="min-h-screen bg-[#0F172A]">
        <AppHeader />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center text-slate-400">
          <p className="text-lg">
            {availableQuestions.length === 0
              ? "Nenhuma questão disponível no momento."
              : "Você já respondeu todas as questões disponíveis."}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            {availableQuestions.length === 0
              ? "Complete os módulos anteriores para desbloquear mais conteúdo e questões."
              : "Volte mais tarde para novas questões ou revise o conteúdo."}
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-block text-sm font-medium text-violet-400 hover:text-violet-300"
          >
            Voltar ao Dashboard →
          </Link>
        </main>
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
              {nodeInfo && nodesInModuleReady(nodeInfo.module.id) && (
                <Link
                  href={`/exame/${nodeInfo.module.id}`}
                  className="mt-4 block w-full text-center text-xs font-semibold btn-primary py-2.5"
                >
                  Realizar Exame do Módulo →
                </Link>
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

            {/* Confusion warning */}
            {confused && (
              <div className="p-3 rounded-xl border border-orange-500/30 bg-orange-500/10 animate-fade-in">
                <p className="text-xs text-orange-300 leading-relaxed">
                  {confusedReason}
                </p>
              </div>
            )}

            {/* Nav between questions */}
            {confirmed && (
              <button
                onClick={advanceToNext}
                className="w-full btn-secondary text-sm"
              >
                Próxima questão →
              </button>
            )}
          </aside>

          {/* RIGHT: Question + Options */}
          <section
            className="lg:col-span-2 space-y-4 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
            key={question.id}
          >
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

              {/* Multiple choice options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {question.options.map((opt) => {
                  const isSelected = selected === opt;
                  const isCorrectOpt = opt === question.answer;
                  const showResult = confirmed;

                  let optClass =
                    "card p-4 text-left font-mono text-base font-semibold transition-all duration-200 border-2 ";

                  if (showResult) {
                    if (isCorrectOpt)
                      optClass +=
                        "border-emerald-500 bg-emerald-500/10 text-emerald-300";
                    else if (isSelected && !isCorrectOpt)
                      optClass += "border-red-500 bg-red-500/10 text-red-400";
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

              {/* Confirm / Next button */}
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
                    onClick={advanceToNext}
                    className="flex-1 btn-primary py-3"
                  >
                    {isSolved
                      ? "Próxima questão →"
                      : "Próxima questão →"}
                  </button>
                )}
              </div>

              {/* Result feedback */}
              {confirmed && (
                <div
                  className={`mt-4 p-4 rounded-xl border text-sm animate-fade-in ${
                    isSolved
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-red-500/10 border-red-500/30 text-red-300"
                  }`}
                >
                  {isSolved
                    ? "✓ Correto!"
                    : `✕ Resposta correta: ${question.answer}`}
                </div>
              )}
            </div>

            {/* Explanation (shown after correct solve) */}
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

            {/* <HintPanel /> */}
            <div className="card p-5">
              <HintPanel hints={question.hints} onHintUsed={handleHintUsed} />
            </div>
          </section>
        </div>
      </main>

      {/* <FeedbackToast /> */}
      <FeedbackToast
        type={feedback}
        onClose={() => { setFeedback(null); setConfused(false); }}
        proficiency={nodeProficiency}
        nodeId={question.nodeId}
        errorType={errorType}
      />
    </div>
  );
}
