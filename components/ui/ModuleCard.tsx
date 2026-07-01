"use client";

import Link from "next/link";
import type { DomainModule } from "@/lib/domain";
import { useNodeProgress } from "@/hooks/useNodeProgress";
import { useProficiency } from "@/hooks/useProficiency";
import NodeCard from "./NodeCard";

interface ModuleCardProps {
  module: DomainModule;
  isLast?: boolean;
}

export default function ModuleCard({ module, isLast }: ModuleCardProps) {
  const { isUnlocked, isCompleted, nodesInModuleReady } = useNodeProgress();
  const { getProficiency } = useProficiency();

  const completedNodes = module.nodes.filter((n) => isCompleted(n.id)).length;

  const totalNodes = module.nodes.length;

  const allLocked = module.nodes.every(
    (node) => !isUnlocked(node.id) && !isCompleted(node.id),
  );

  const moduleCompleted = completedNodes === totalNodes;
  const moduleReady = nodesInModuleReady(module.id);

  return (
    <div className="relative flex flex-col items-center w-full ">
      {/* MODULE CARD */}
      <div
        className={`w-full max-w-3xl rounded-3xl border ${module.borderColor}
        bg-gradient-to-br ${module.color} p-6 transition-all duration-300
        ${allLocked ? "opacity-60" : ""}`}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold border
              ${module.borderColor}
              ${
                allLocked
                  ? "bg-slate-800 text-slate-500"
                  : "bg-slate-900/50 text-slate-200"
              }`}
            >
              {module.number}
            </div>

            <div>
              <h2
                className={`font-semibold text-base ${
                  allLocked ? "text-slate-500" : "text-slate-100"
                }`}
              >
                {module.title}
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">{module.subtitle}</p>

              <p className="text-xs text-slate-400 mt-1">
                {completedNodes}/{totalNodes} concluídos
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <Link
              href={`/tutoria/${module.id}`}
              className="text-xs font-medium text-slate-400 hover:text-violet-400
              py-1.5 px-3 rounded-lg border border-slate-700
              hover:border-violet-500/50 transition-all"
            >
              Ir para módulo
            </Link>

            {moduleReady && (
              <Link
                href={`/exame/${module.id}`}
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300
                py-1.5 px-3 rounded-lg border border-emerald-500/30
                hover:border-emerald-400 transition-all"
              >
                Realizar teste
              </Link>
            )}
          </div>
        </div>

        {/* NODES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {module.nodes.map((node) => (
            <NodeCard key={node.id} node={node} />
          ))}
        </div>
      </div>

      {/* CONNECTOR */}
      {!isLast && (
        <div className="flex flex-col items-center my-3 gap-1">
          <div className="w-0.5 h-5 bg-slate-700" />
          <div className="text-slate-600 text-lg leading-none">▼</div>
          <div className="w-0.5 h-5 bg-slate-800" />
        </div>
      )}
    </div>
  );
}
