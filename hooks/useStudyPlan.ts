"use client";

import { useCallback } from "react";
import { MODULES } from "@/lib/domain";
import type {
  StudyPlanItem,
  StudyPlanAction,
  ErrorType,
  ConfusionStatus,
} from "@/lib/domain";
import { useProficiency } from "./useProficiency";
import { useNodeProgress } from "./useNodeProgress";
import { useSpacedRepetition } from "./useSpacedRepetition";

interface NodeLabelInfo {
  nodeId: string;
  nodeLabel: string;
  moduleId: string;
  moduleNumber: number;
}

function getAllNodeInfos(): NodeLabelInfo[] {
  const result: NodeLabelInfo[] = [];
  for (const module of MODULES) {
    for (const node of module.nodes) {
      result.push({
        nodeId: node.id,
        nodeLabel: node.label,
        moduleId: module.id,
        moduleNumber: module.number,
      });
    }
  }
  return result;
}

export function useStudyPlan() {
  const { getProficiency, getTheta, getNodeData } = useProficiency();
  const { isUnlocked, isCompleted, nodesInModuleReady } = useNodeProgress();
  const { getDueReviews, getNodeReviewData } = useSpacedRepetition();

  // Gera plano de estudo personalizado ordenado por prioridade
  const getStudyPlan = useCallback((): StudyPlanItem[] => {
    const items: StudyPlanItem[] = [];
    const allNodes = getAllNodeInfos();
    const now = Date.now();

    for (const info of allNodes) {
      const prof = getProficiency(info.nodeId);
      const theta = getTheta(info.nodeId);
      const reviewData = getNodeReviewData(info.nodeId);
      const unlocked = isUnlocked(info.nodeId);
      const completed = isCompleted(info.nodeId);

      if (!unlocked) continue;

      // Revisão vencida (SM-2)
      if (reviewData.nextReview > 0 && reviewData.nextReview <= now) {
        items.push({
          action: "review",
          nodeId: info.nodeId,
          moduleId: info.moduleId,
          nodeLabel: info.nodeLabel,
          moduleNumber: info.moduleNumber,
          priority: 100,
          reason: "Revisão pendente (SM-2)",
        });
        continue;
      }

      // Revisão próxima (até 2 dias)
      if (
        reviewData.nextReview > now &&
        reviewData.nextReview <= now + 2 * 86400000
      ) {
        items.push({
          action: "review",
          nodeId: info.nodeId,
          moduleId: info.moduleId,
          nodeLabel: info.nodeLabel,
          moduleNumber: info.moduleNumber,
          priority: 80,
          reason: "Revisão programada para breve",
        });
        continue;
      }

      // Nó fraco (proficiência < 60)
      if (prof < 60 && !completed) {
        items.push({
          action: "practice",
          nodeId: info.nodeId,
          moduleId: info.moduleId,
          nodeLabel: info.nodeLabel,
          moduleNumber: info.moduleNumber,
          priority: Math.round(80 - prof),
          reason: `Proficiência baixa (${prof}%)`,
        });
        continue;
      }

      // Theta negativo (IRT abaixo da média esperada)
      if (theta < -0.5 && !completed) {
        items.push({
          action: "study",
          nodeId: info.nodeId,
          moduleId: info.moduleId,
          nodeLabel: info.nodeLabel,
          moduleNumber: info.moduleNumber,
          priority: Math.round(60 + Math.abs(theta) * 10),
          reason: "Dificuldade acima do esperado",
        });
      }
    }

    // Módulo pronto para exame
    for (const module of MODULES) {
      if (nodesInModuleReady(module.id) && module.nodes.length > 0) {
        const firstNode = module.nodes[0];
        if (!items.some((i) => i.moduleId === module.id && i.action === "exam")) {
          items.push({
            action: "exam",
            nodeId: firstNode.id,
            moduleId: module.id,
            nodeLabel: module.title,
            moduleNumber: module.number,
            priority: 20,
            reason: "Módulo pronto para exame",
          });
        }
      }
    }

    // Nó desbloqueado não iniciado (sem tentativas)
    for (const info of allNodes) {
      if (
        isUnlocked(info.nodeId) &&
        !isCompleted(info.nodeId) &&
        getNodeData(info.nodeId).totalAttempts === 0 &&
        !items.some((i) => i.nodeId === info.nodeId)
      ) {
        items.push({
          action: "study",
          nodeId: info.nodeId,
          moduleId: info.moduleId,
          nodeLabel: info.nodeLabel,
          moduleNumber: info.moduleNumber,
          priority: 10,
          reason: "Conteúdo disponível para estudo",
        });
      }
    }

    return items.sort((a, b) => b.priority - a.priority).slice(0, 5);
  }, [getProficiency, getTheta, getNodeData, isUnlocked, isCompleted, nodesInModuleReady, getDueReviews, getNodeReviewData]);

  // Classifica o tipo de erro com base no contexto
  const classifyError = useCallback(
    (
      nodeId: string,
      selectedAnswer: string,
      correctAnswer: string,
      responseTimeMs: number,
      nodeHistory: { correct: boolean }[],
    ): ErrorType => {
      // Chute: resposta muito rápida
      if (responseTimeMs < 3000) return "chute";

      // Distração: resposta numericamente próxima da correta
      const numSelected = Number(selectedAnswer);
      const numCorrect = Number(correctAnswer);
      if (!isNaN(numSelected) && !isNaN(numCorrect)) {
        const diff = Math.abs(numSelected - numCorrect);
        if (diff > 0 && diff <= 2) return "distracao";
      }

      // Recorrente: erros consecutivos no mesmo nó
      const recentErrors = nodeHistory
        .slice(-3)
        .filter((a) => !a.correct).length;
      if (recentErrors >= 2) return "recorrente";

      // Conceitual: padrão não identificado
      return "conceitual";
    },
    [],
  );

  // Detecta sinais de confusão ou desengajamento
  const getConfusionStatus = useCallback(
    (nodeId: string, recentHistory: { correct: boolean; responseTimeMs?: number }[]): ConfusionStatus => {
      const last5 = recentHistory.slice(-5);
      const consecutiveErrors = (() => {
        let count = 0;
        for (let i = last5.length - 1; i >= 0; i--) {
          if (!last5[i].correct) count++;
          else break;
        }
        return count;
      })();

      const responseTimes = last5
        .filter((a) => a.responseTimeMs !== undefined)
        .map((a) => a.responseTimeMs as number);
      const avgResponseTime =
        responseTimes.length > 0
          ? responseTimes.reduce((s, t) => s + t, 0) / responseTimes.length
          : 0;

      let confused = false;
      let reason: string | null = null;

      if (consecutiveErrors >= 3) {
        confused = true;
        reason = "Você errou 3 questões seguidas. Que tal revisar o conteúdo antes de continuar?";
      } else if (avgResponseTime > 60000 && last5.length >= 2) {
        confused = true;
        reason = "Você está demorando muito para responder. Considere revisar o tópico.";
      } else if (
        responseTimes.some((t) => t < 2000) &&
        last5.filter((a) => !a.correct).length >= 2
      ) {
        confused = true;
        reason = "Parece que você está respondendo muito rápido sem ler com atenção.";
      }

      return {
        confused,
        reason,
        consecutiveErrors,
        avgResponseTime,
        hintDependency: false,
      };
    },
    [],
  );

  // Sugere o próximo nó para estudo
  const getNextRecommendedNode = useCallback(
    (currentNodeId: string): string | null => {
      const allNodes = getAllNodeInfos();
      const currentIndex = allNodes.findIndex((n) => n.nodeId === currentNodeId);

      // 1. Se há revisões vencidas, priorizar
      const dueReviews = getDueReviews();
      if (dueReviews.length > 0) {
        const reviewNode = allNodes.find(
          (n) => n.nodeId === dueReviews[0].nodeId && isUnlocked(n.nodeId),
        );
        if (reviewNode) return reviewNode.nodeId;
      }

      // 2. Próximo nó no fluxo normal
      if (currentIndex >= 0 && currentIndex < allNodes.length - 1) {
        const next = allNodes[currentIndex + 1];
        if (isUnlocked(next.nodeId)) return next.nodeId;
      }

      // 3. Primeiro nó desbloqueado não completado
      const firstUnlocked = allNodes.find(
        (n) => isUnlocked(n.nodeId) && !isCompleted(n.nodeId),
      );
      if (firstUnlocked) return firstUnlocked.nodeId;

      return null;
    },
    [getDueReviews, isUnlocked, isCompleted],
  );

  return {
    getStudyPlan,
    classifyError,
    getConfusionStatus,
    getNextRecommendedNode,
  };
}
