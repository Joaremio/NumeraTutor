"use client";

import Link from "next/link";
import NodeProgressCircle from "./NodeProgressCircle";
import type { DomainNode } from "@/lib/domain";

// <NodeCard /> — Individual knowledge node card with status and progress
interface NodeCardProps {
  node: DomainNode;
  moduleNumber: number;
}

export default function NodeCard({ node, moduleNumber }: NodeCardProps) {
  const isLocked = node.status === "locked";
  const isCompleted = node.status === "completed";
  const isExamReady = node.proficiency >= 80 && node.status === "in_progress";

  const cardClass = isLocked
    ? "node-locked"
    : isCompleted
      ? "node-completed"
      : isExamReady
        ? "node-exam-ready"
        : "node-progress";

  return (
    <div
      className={`card p-4 flex flex-col gap-3 transition-all duration-300 ${cardClass} ${
        !isLocked ? "hover:translate-y-[-2px] hover:shadow-lg" : ""
      }`}
    >
      {/* Node ID badge + status */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-md ${
            isLocked
              ? "bg-slate-700 text-slate-500"
              : isCompleted
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-violet-500/20 text-violet-400"
          }`}
        >
          Nó {node.id}
        </span>

        {isCompleted && (
          <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Concluído
          </span>
        )}
        {isLocked && (
          <span className="text-[10px] font-medium text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded-full">
            Bloqueado
          </span>
        )}
      </div>

      {/* Node label + progress circle */}
      <div className="flex items-start gap-3">
        <NodeProgressCircle
          proficiency={node.proficiency}
          status={node.status}
          size={44}
          strokeWidth={3.5}
        />
        <p
          className={`text-sm font-medium leading-snug flex-1 ${
            isLocked ? "text-slate-500" : "text-slate-200"
          }`}
        >
          {node.label}
        </p>
      </div>

      {/* Progress bar */}
      {!isLocked && (
        <div className="space-y-1">
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isCompleted
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                  : "bg-gradient-to-r from-violet-500 to-indigo-500"
              }`}
              style={{ width: `${node.proficiency}%` }}
            />
          </div>
        </div>
      )}

      {/* Exam CTA */}
      {isExamReady && (
        <Link
          href="/exame"
          className="mt-1 w-full text-center text-xs font-semibold bg-gradient-to-r from-violet-600 to-violet-500
                     hover:from-violet-500 hover:to-indigo-500 text-white py-2 px-3 rounded-lg
                     transition-all duration-200 active:scale-95 shadow-lg shadow-violet-500/25 glow-violet"
        >
          Realizar Exame do Módulo →
        </Link>
      )}

      {/* Practice button */}
      {!isLocked && !isCompleted && !isExamReady && (
        <Link
          href={`/tutoria/module-${moduleNumber}`}
          className="mt-1 w-full text-center text-xs font-medium text-slate-400 hover:text-violet-400
             py-1.5 px-3 rounded-lg border border-slate-700 hover:border-violet-500/50
             transition-all duration-200"
        >
          Iniciar
        </Link>
      )}
    </div>
  );
}
