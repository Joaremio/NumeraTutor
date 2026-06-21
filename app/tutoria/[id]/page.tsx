import { useState, useCallback } from "react";
import AppHeader from "@/components/layout/AppHeader";
import { DomainModule, MODULES } from "@/lib/domain";
import Link from "next/link"; // Importado para navegação fluida entre nós

export default async function TutoringPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ node?: string }>; // Captura a query string da URL
}) {
  const { id } = await params;
  const { node: activeNodeId } = await searchParams;

  // Busca o módulo correspondente
  const module: DomainModule | undefined = MODULES.find((m) => m.id === id);

  if (!module) {
    return <div className="text-slate-400 p-8">Módulo não encontrado</div>;
  }

  // Define o nó ativo: se houver parâmetro na URL usa ele, caso contrário pega o primeiro nó do módulo
  const currentNode =
    module.nodes.find((n) => n.id === activeNodeId) || module.nodes[0];

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <AppHeader />
      <main>
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-80 min-h-[calc(100vh-64px)] border-r border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <div className="p-6 border-b border-slate-800">
              <p className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-1">
                Módulo {module.number}
              </p>
              <h2 className="text-lg font-bold text-slate-100">
                {module.title}
              </h2>
              <p className="text-sm text-slate-400 mt-2">{module.subtitle}</p>
            </div>

            <nav className="p-4">
              <ul className="flex flex-col gap-2">
                {module.nodes.map((node) => {
                  const isSelected = node.id === currentNode?.id;

                  return (
                    <li key={node.id}>
                      {/* Usando Link para atualizar a URL e re-renderizar o conteúdo no servidor */}
                      <Link
                        href={`?node=${node.id}`}
                        className={`
                          group
                          flex
                          cursor-pointer
                          rounded-xl
                          border
                          px-4
                          py-3
                          transition-all
                          duration-200
                          w-full
                          ${
                            isSelected
                              ? "border-violet-500/40 bg-violet-500/10"
                              : "border-slate-800 hover:border-violet-500/30 hover:bg-slate-800/70"
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`
                              h-2.5 w-2.5 rounded-full transition-colors
                              ${
                                isSelected
                                  ? "bg-violet-500"
                                  : "bg-slate-600 group-hover:bg-violet-400"
                              }
                            `}
                          />
                          <span
                            className={`
                              text-sm font-medium transition-colors
                              ${isSelected ? "text-violet-300" : "text-slate-300"}
                            `}
                          >
                            {node.label}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Área do Conteúdo Dinâmico */}
          <section className="flex-1 p-8 max-w-4xl min-h-[calc(100vh-64px)] overflow-y-auto">
            {currentNode?.content ? (
              // Injeta o HTML estruturado do JSON com segurança
              <div dangerouslySetInnerHTML={{ __html: currentNode.content }} />
            ) : (
              // Estado de fallback para nós que ainda não possuem conteúdo cadastrado
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
          </section>
        </div>
      </main>
    </div>
  );
}
