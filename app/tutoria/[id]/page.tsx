import AppHeader from "@/components/layout/AppHeader";
import TutoringClient from "@/components/Tutoring";
import { DomainModule, MODULES } from "@/lib/domain";

export default async function TutoringPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ node?: string }>;
}) {
  const { id } = await params;
  const { node: activeNodeId } = await searchParams;

  const module: DomainModule | undefined = MODULES.find((m) => m.id === id);

  if (!module) {
    return <div className="text-slate-400 p-8">Módulo não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <AppHeader />
      {/* Passamos os dados para o componente que vai lidar com a interatividade */}
      <TutoringClient initialModule={module} activeNodeId={activeNodeId} />
    </div>
  );
}
