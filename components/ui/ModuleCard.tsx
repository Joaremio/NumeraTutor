import Link from "next/link";
import NodeCard from "./NodeCard";
import type { DomainModule } from "@/lib/domain";

// <ModuleCard /> — Groups domain nodes into a visual module block
interface ModuleCardProps {
  module: DomainModule;
  isLast?: boolean;
}

export default function ModuleCard({ module, isLast }: ModuleCardProps) {
  const completedNodes = module.nodes.filter(
    (n) => n.status === "completed",
  ).length;
  const totalNodes = module.nodes.length;
  const moduleProgress = Math.round((completedNodes / totalNodes) * 100);
  const allLocked = module.nodes.every((n) => n.status === "locked");

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Module container */}
      <div
        className={`w-full max-w-3xl rounded-3xl border ${module.borderColor} bg-gradient-to-br ${module.color} p-6
                    transition-all duration-300 ${allLocked ? "opacity-60" : ""}`}
      >
        {/* Module header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold
                          border ${module.borderColor} ${allLocked ? "bg-slate-800 text-slate-500" : "bg-slate-900/50 text-slate-200"}`}
            >
              {module.number}
            </div>
            <div>
              <h2
                className={`font-semibold text-base ${allLocked ? "text-slate-500" : "text-slate-100"}`}
              >
                {module.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{module.subtitle}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/tutoria/module-${module.number}`}
              className="mt-1  text-center text-xs font-medium text-slate-400 hover:text-violet-400
             py-1.5 px-3 rounded-lg border border-slate-700 hover:border-violet-500/50
             transition-all duration-200"
            >
              Ir para módulo
            </Link>
            {completedNodes === 3 && (
              <Link
                href={`/exame/${module.id}`}
                className="mt-1  text-center text-xs font-medium text-slate-400 hover:text-violet-400
             py-1.5 px-3 rounded-lg border border-slate-700 hover:border-violet-500/50
             transition-all duration-200"
              >
                Realizar teste
              </Link>
            )}
          </div>
        </div>

        {/* Nodes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {module.nodes.map((node) => (
            <NodeCard key={node.id} node={node} moduleNumber={module.number} />
          ))}
        </div>
      </div>

      {/* Arrow connector between modules */}
      {!isLast && (
        <div className="flex flex-col items-center my-3 gap-1">
          <div className="w-0.5 h-5 bg-gradient-to-b from-slate-600 to-slate-700" />
          <div className="text-slate-600 text-lg leading-none">▼</div>
          <div className="w-0.5 h-5 bg-gradient-to-b from-slate-700 to-transparent" />
        </div>
      )}
    </div>
  );
}
