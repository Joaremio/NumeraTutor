"use client";

import { useNodeProgress } from "@/hooks/useNodeProgress";
import { useProficiency } from "@/hooks/useProficiency";
import type { DomainNode } from "@/lib/domain";

interface NodeCardProps {
  node: DomainNode;
}

export default function NodeCard({ node }: NodeCardProps) {
  const { isUnlocked, isCompleted } = useNodeProgress();
  const { getProficiency } = useProficiency();

  const completed = isCompleted(node.id);
  const unlocked = isUnlocked(node.id);

  const status = completed ? "completed" : unlocked ? "in_progress" : "locked";

  const isLocked = status === "locked";
  const isProgress = status === "in_progress";
  const isDone = status === "completed";

  const prof = getProficiency(node.id);
  const isExamReady = prof >= 80 && isProgress;

  return (
    <div
      className={`card p-4 flex flex-col gap-3 transition-all duration-300 ${
        isLocked
          ? "node-locked"
          : isDone
            ? "node-completed"
            : isExamReady
              ? "node-exam-ready"
              : "node-progress"
      }`}
    >
      {/* Status */}
      <div className="flex items-center justify-between">
        {isDone && (
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            Concluído
          </span>
        )}

        {isLocked && (
          <span className="text-[10px] text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded-full">
            Bloqueado
          </span>
        )}

        {isProgress && (
          <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
            Em andamento
          </span>
        )}
      </div>

      {/* Label */}
      <p
        className={`text-sm font-medium ${
          isLocked ? "text-slate-500" : "text-slate-200"
        }`}
      >
        {node.label}
      </p>
    </div>
  );
}
