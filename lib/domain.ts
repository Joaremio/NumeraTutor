import { MODULE_CONTENT } from "./domain-content";

export type NodeStatus = "locked" | "in_progress" | "completed";

export interface DomainNode {
  id: string;
  label: string;
  content?: string;
  proficiency: number;
  status: NodeStatus;
}

export interface DomainModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  color: string;
  borderColor: string;
  nodes: DomainNode[];
}

export interface Question {
  id: string;
  moduleId?: string;
  nodeId: string;
  text: string;
  answer: string;
  hints: string[];
  explanation: string;
}

export interface ExamQuestion {
  id: string;
  moduleId: string;
  answer: string;
  options: string[];
}

// ============================
// MODULES
// ============================

export const MODULES: DomainModule[] = [
  {
    id: "module-1",
    number: 1,
    title: "Fundamentos Históricos e Teóricos",
    subtitle: "Pré-requisito geral",
    color: "from-indigo-500/20 to-indigo-600/10",
    borderColor: "border-indigo-500/40",
    nodes: [
      {
        id: "1.1",
        label: "História dos Sistemas de Numeração",
        content: MODULE_CONTENT["1.1"],
        proficiency: 100,
        status: "completed",
      },
      {
        id: "1.2",
        label: "Conceito de Base Numérica",
        content: MODULE_CONTENT["1.2"],
        proficiency: 100,
        status: "completed",
      },
      {
        id: "1.3",
        label: "Notação Posicional e Pesos Matemáticos",
        content: MODULE_CONTENT["1.3"],
        proficiency: 85,
        status: "completed",
      },
    ],
  },

  {
    id: "module-2",
    number: 2,
    title: "Sistema Binário",
    subtitle: "Depende do Módulo 1",
    color: "from-violet-500/20 to-violet-600/10",
    borderColor: "border-violet-500/40",
    nodes: [
      {
        id: "2.1",
        label: "Bit e Byte",
        content: MODULE_CONTENT["2.1"],
        proficiency: 80,
        status: "in_progress",
      },
      {
        id: "2.2",
        label: "Decimal → Binário",
        content: MODULE_CONTENT["2.2"],
        proficiency: 45,
        status: "in_progress",
      },
      {
        id: "2.3",
        label: "Binário → Decimal",
        content: MODULE_CONTENT["2.3"],
        proficiency: 10,
        status: "in_progress",
      },
    ],
  },

  {
    id: "module-3",
    number: 3,
    title: "Sistema Hexadecimal",
    subtitle: "Depende do Módulo 2",
    color: "from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/40",
    nodes: [
      {
        id: "3.1",
        label: "Mapeamento A–F",
        content: MODULE_CONTENT["3.1"],
        proficiency: 0,
        status: "locked",
      },
      {
        id: "3.2",
        label: "Decimal → Hexadecimal",
        content: MODULE_CONTENT["3.2"],
        proficiency: 0,
        status: "locked",
      },
      {
        id: "3.3",
        label: "Binário → Hexadecimal",
        content: MODULE_CONTENT["3.3"],
        proficiency: 0,
        status: "locked",
      },
    ],
  },

  {
    id: "module-4",
    number: 4,
    title: "Aplicações Práticas e Interdisciplinares",
    subtitle: "Contexto real",
    color: "from-emerald-500/20 to-emerald-600/10",
    borderColor: "border-emerald-500/40",
    nodes: [
      {
        id: "4.1",
        label: "Eletrônica e Física",
        content: MODULE_CONTENT["4.1"],
        proficiency: 0,
        status: "locked",
      },
      {
        id: "4.2",
        label: "Design Gráfico",
        content: MODULE_CONTENT["4.2"],
        proficiency: 0,
        status: "locked",
      },
      {
        id: "4.3",
        label: "Redes de Computadores",
        content: MODULE_CONTENT["4.3"],
        proficiency: 0,
        status: "locked",
      },
    ],
  },
];
