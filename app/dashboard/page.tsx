"use client";

import Link from "next/link";
import AppHeader from "@/components/layout/AppHeader";
import ModuleCard from "@/components/ui/ModuleCard";
import { MODULES } from "@/lib/domain";
import type { StudyPlanAction } from "@/lib/domain";
import { useNodeProgress } from "@/hooks/useNodeProgress";
import { useProficiency } from "@/hooks/useProficiency";
import { useSpacedRepetition } from "@/hooks/useSpacedRepetition";
import { useStudyPlan } from "@/hooks/useStudyPlan";

function getNodeModule(nodeId: string) {
  for (const module of MODULES) {
    for (const node of module.nodes) {
      if (node.id === nodeId) return { module, node };
    }
  }
  return null;
}

export default function DashboardPage() {
  const { isCompleted, hydrated } = useNodeProgress();
  const { getWeakNodes, hydrated: profHydrated } = useProficiency();
  const { getDueReviews, hydrated: reviewHydrated } = useSpacedRepetition();
  const { getStudyPlan } = useStudyPlan();

  // 🔒 evita hydration mismatch
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">
        Carregando progresso...
      </div>
    );
  }

  const allNodes = MODULES.flatMap((m) => m.nodes);

  const completedNodes = allNodes.filter((n) => isCompleted(n.id)).length;

  const totalNodes = allNodes.length;

  const overallProgress = Math.round((completedNodes / totalNodes) * 100);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <AppHeader />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-mono text-violet-400 uppercase">
                Mapa de Conhecimento
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
                Sua Jornada de Aprendizado
              </h1>

              <p className="text-slate-400 text-sm mt-1.5 max-w-lg">
                Conclua cada módulo para desbloquear o próximo.
              </p>
            </div>

            {/* STATS */}
            <div className="flex gap-4">
              <div className="card px-4 py-3 text-center">
                <p className="text-2xl font-bold text-gradient">
                  {overallProgress}%
                </p>
                <p className="text-xs text-slate-500">Progresso</p>
              </div>

              <div className="card px-4 py-3 text-center">
                <p className="text-2xl font-bold text-emerald-400">
                  {completedNodes}
                </p>
                <p className="text-xs text-slate-500">Nós concluídos</p>
              </div>
            </div>
          </div>

          {/* LEGEND */}
          <div className="flex flex-wrap gap-4 mt-5 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Concluído
            </div>

            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
              Em andamento
            </div>

            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              Bloqueado
            </div>
          </div>
        </div>

        {/* ESTUDO PLANO — Ações Prioritárias */}
        {hydrated &&
          profHydrated &&
          reviewHydrated &&
          (() => {
            const plan = getStudyPlan();
            if (plan.length === 0) return null;
            const actionIcons: Record<StudyPlanAction, string> = {
              review: "🔄",
              practice: "✏️",
              study: "📖",
              exam: "🎯",
              next: "➡️",
            };
            const actionLabels: Record<StudyPlanAction, string> = {
              review: "Revisar",
              practice: "Praticar",
              study: "Estudar",
              exam: "Fazer Exame",
              next: "Avançar",
            };
            return (
              <section className="mt-8 animate-slide-up">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🎯</span>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-100">
                      Plano de Estudo
                    </h2>
                    <p className="text-xs text-slate-500">
                      Ações recomendadas com base no seu desempenho
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {plan.map((item) => {
                    const href =
                      item.action === "exam"
                        ? `/exame/${item.moduleId}`
                        : `/tutoria/${item.moduleId}?node=${item.nodeId}`;
                    return (
                      <Link
                        key={`${item.action}-${item.nodeId}`}
                        href={href}
                        className="card p-3 flex items-center gap-3 hover:border-violet-500/30 transition-all"
                      >
                        <span className="text-lg">
                          {actionIcons[item.action]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-500">
                            {actionLabels[item.action]} · Módulo{" "}
                            {item.moduleNumber}
                          </p>
                          <p className="text-sm font-medium text-slate-200 truncate">
                            {item.nodeLabel}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {item.reason}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })()}

        {/* REVISÕES PENDENTES (SM-2) */}
        {hydrated &&
          (() => {
            const dueReviews = getDueReviews();
            if (dueReviews.length === 0) return null;
            const allNodes = MODULES.flatMap((m) =>
              m.nodes.map((n) => ({
                nodeId: n.id,
                label: n.label,
                moduleNumber: m.number,
                moduleId: m.id,
              })),
            );
            return (
              <section className="mt-6 animate-slide-up mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-lg">📅</span>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-100">
                      Revisões Pendentes
                    </h2>
                    <p className="text-xs text-slate-500">
                      Conteúdos que precisam de revisão segundo o algoritmo SM-2
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dueReviews.slice(0, 4).map(({ nodeId, data }) => {
                    const nodeInfo = allNodes.find((n) => n.nodeId === nodeId);
                    if (!nodeInfo) return null;
                    const daysOverdue = Math.round(
                      (Date.now() - data.nextReview) / 86400000,
                    );
                    return (
                      <Link
                        key={nodeId}
                        href={`/tutoria/${nodeInfo.moduleId}?node=${nodeId}`}
                        className="card p-3 flex items-center gap-3 hover:border-orange-500/30 transition-all"
                      >
                        <span className="text-lg">🔄</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-orange-400">
                            {daysOverdue > 0
                              ? `Atrasado ${daysOverdue} dia${daysOverdue > 1 ? "s" : ""}`
                              : "Revisar hoje"}
                          </p>
                          <p className="text-sm font-medium text-slate-200 truncate">
                            Nó {nodeId} — {nodeInfo.label}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Módulo {nodeInfo.moduleNumber}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })()}

        {/* MODULES */}
        <div className="flex flex-col items-center gap-0 animate-fade-in">
          {MODULES.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              isLast={index === MODULES.length - 1}
            />
          ))}
        </div>

        {/* WEAK NODES */}
        {profHydrated &&
          (() => {
            const weakNodes = getWeakNodes(60).filter(
              (w) => !isCompleted(w.nodeId),
            );
            if (weakNodes.length === 0) return null;
            return (
              <section className="mt-12 animate-slide-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📖</span>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-100">
                      Nós para Revisar
                    </h2>
                    <p className="text-xs text-slate-500">
                      Com base no seu desempenho, estes tópicos precisam de
                      atenção
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {weakNodes.map((wn) => {
                    const info = getNodeModule(wn.nodeId);
                    if (!info) return null;
                    return (
                      <div
                        key={wn.nodeId}
                        className="card p-4 flex items-center gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-500 font-mono">
                            Nó {wn.nodeId}
                          </p>
                          <p className="text-sm font-medium text-slate-200 truncate">
                            {info.node.label}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-orange-500 transition-all duration-500"
                                style={{ width: `${wn.score}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-orange-400 tabular-nums">
                              {wn.score}%
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5 shrink-0">
                          <Link
                            href={`/tutoria/${info.module.id}?node=${wn.nodeId}`}
                            className="text-xs font-medium text-center text-violet-400 hover:text-violet-300 px-3 py-1.5 rounded-lg border border-violet-500/30 hover:border-violet-400 transition-all"
                          >
                            Estudar
                          </Link>
                          <Link
                            href="/questoes"
                            className="text-xs font-medium text-center text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/30 hover:border-emerald-400 transition-all"
                          >
                            Praticar
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })()}

        <p className="text-center text-xs text-slate-600 mt-8">
          Atinja 80% de proficiência para desbloquear exames
        </p>
      </main>
    </div>
  );
}
