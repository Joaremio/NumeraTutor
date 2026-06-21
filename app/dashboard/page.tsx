import AppHeader from "@/components/layout/AppHeader";
import ModuleCard from "@/components/ui/ModuleCard";
import { MODULES } from "@/lib/domain";

// <DashboardPage /> — Knowledge map showing the full learning journey
export default function DashboardPage() {
  const totalNodes = MODULES.flatMap((m) => m.nodes).length;
  const completedNodes = MODULES.flatMap((m) => m.nodes).filter(
    (n) => n.status === "completed"
  ).length;
  const overallProgress = Math.round((completedNodes / totalNodes) * 100);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <AppHeader />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-1">
                Mapa de Conhecimento
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
                Sua Jornada de Aprendizado
              </h1>
              <p className="text-slate-400 text-sm mt-1.5 max-w-lg">
                Conclua cada módulo para desbloquear o próximo. Cada nó representa uma habilidade que
                você precisará dominar.
              </p>
            </div>

            {/* Overall stats */}
            <div className="flex gap-4">
              <div className="card px-4 py-3 text-center">
                <p className="text-2xl font-bold text-gradient">{overallProgress}%</p>
                <p className="text-xs text-slate-500 mt-0.5">Progresso</p>
              </div>
              <div className="card px-4 py-3 text-center">
                <p className="text-2xl font-bold text-emerald-400">{completedNodes}</p>
                <p className="text-xs text-slate-500 mt-0.5">Nós concluídos</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-slate-500">
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
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 shadow-sm shadow-violet-500/50" />
              Pronto para exame (≥80%)
            </div>
          </div>
        </div>

        {/* Module graph — vertical sequence */}
        <div className="flex flex-col items-center gap-0 animate-fade-in">
          {MODULES.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              isLast={index === MODULES.length - 1}
            />
          ))}
        </div>

        {/* Bottom info */}
        <p className="text-center text-xs text-slate-600 mt-8">
          Atinja 80% de proficiência em um nó para desbloquear o exame do módulo · 70% de acerto no exame para avançar
        </p>
      </main>
    </div>
  );
}
