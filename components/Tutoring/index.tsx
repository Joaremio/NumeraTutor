"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { DomainModule } from "@/lib/domain";
import { useNodeProgress } from "@/hooks/useNodeProgress";

interface TutoringClientProps {
  initialModule: DomainModule;
  activeNodeId?: string;
}

export default function TutoringClient({
  initialModule,
  activeNodeId,
}: TutoringClientProps) {
  const router = useRouter();

  // Lógica nova através do seu Hook
  const { completeNode, isCompleted } = useNodeProgress();

  const nodes = initialModule.nodes;
  const currentIndex = nodes.findIndex((n) => n.id === activeNodeId);
  const activeIndex = currentIndex !== -1 ? currentIndex : 0;

  const currentNode = nodes[activeIndex];
  const nextNode = nodes[activeIndex + 1];

  // Verifica se todos os nós estão completados
  const isChallengeUnlocked = nodes.every((n) => isCompleted(n.id));

  const handleCompleteAndNext = () => {
    // Seta o nó atual como concluído no estado global/hook
    completeNode(currentNode.id);

    if (nextNode) {
      router.push(`?node=${nextNode.id}`);
    }
  };

  return (
    <main className="flex">
      {/* Sidebar com o estilo original restaurado */}
      <aside className="w-80 min-h-[calc(100vh-64px)] border-r border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="p-6 border-b border-slate-800">
          <p className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-1">
            Módulo {initialModule.number}
          </p>
          <h2 className="text-lg font-bold text-slate-100">
            {initialModule.title}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {initialModule.subtitle}
          </p>
        </div>

        <nav className="p-4">
          <ul className="flex flex-col gap-2">
            {nodes.map((node) => {
              const isSelected = node.id === currentNode.id;
              const completed = isCompleted(node.id);

              return (
                <li key={node.id}>
                  <Link
                    href={`?node=${node.id}`}
                    className={`
                      group flex cursor-pointer rounded-xl border px-4 py-3 transition-all duration-200 w-full
                      ${
                        isSelected
                          ? "border-violet-500/40 bg-violet-500/10"
                          : "border-slate-800 hover:border-violet-500/30 hover:bg-slate-800/70"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div
                        className={`
                          h-2.5 w-2.5 rounded-full transition-colors
                          ${
                            completed
                              ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                              : isSelected
                                ? "bg-violet-500"
                                : "bg-slate-600 group-hover:bg-violet-400"
                          }
                        `}
                      />
                      <span
                        className={`
                          text-sm font-medium transition-colors flex-1
                          ${isSelected ? "text-violet-300" : "text-slate-300"}
                        `}
                      >
                        {node.label}
                      </span>

                      {completed && (
                        <span className="text-emerald-500 text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}

            {/* Botão de Desafio restaurado */}
            {isChallengeUnlocked && (
              <li className="pt-2 mt-2 border-t border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300">
                <Link
                  href={`/exame/${initialModule.id}`}
                  className="
                    flex w-full items-center justify-center
                    rounded-xl px-4 py-3
                    text-sm font-semibold text-white
                    bg-gradient-to-r from-violet-600 to-indigo-600
                    hover:from-violet-500 hover:to-indigo-500
                    transition-all duration-200 shadow-lg shadow-violet-500/20 active:scale-95
                  "
                >
                  Realizar Teste
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </aside>

      {/* Área de conteúdo e o botão de avançar no rodapé */}
      <section className="flex-1 p-8 max-w-4xl min-h-[calc(100vh-64px)] overflow-y-auto flex flex-col justify-between">
        <div>
          {currentNode?.content ? (
            <div dangerouslySetInnerHTML={{ __html: currentNode.content }} />
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-slate-100">
                {currentNode?.label}
              </h1>
              <p className="mt-4 text-slate-500 italic">
                O conteúdo para este tópico está sendo preparado e estará
                disponível em breve.
              </p>
            </div>
          )}
        </div>

        {/* Botão Flutuante/Rodapé de Avançar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleCompleteAndNext}
            className={`
              px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95
              ${
                !nextNode && isCompleted(currentNode.id)
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed hidden"
                  : "bg-slate-100 text-slate-900 hover:bg-white shadow-lg hover:shadow-xl hover:shadow-slate-100/10"
              }
            `}
          >
            {nextNode
              ? "Marcar como concluído e avançar →"
              : "Finalizar Módulo ✓"}
          </button>
        </div>
      </section>
    </main>
  );
}
