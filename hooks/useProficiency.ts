"use client";

import { useCallback, useEffect, useState } from "react";
import { MODULES, DIFFICULTY_VALUE } from "@/lib/domain";
import type { Difficulty } from "@/lib/domain";

interface AttemptRecord {
  questionId: string;
  correct: boolean;
  timestamp: number;
  responseTimeMs?: number;
}

interface NodeProficiencyData {
  score: number;
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  history: AttemptRecord[];
  lastPracticed: number;
  theta: number;            // IRT ability estimate
}

const STORAGE_KEY = "proficiencyData";

function calculateScore(data: NodeProficiencyData): number {
  if (data.totalAttempts === 0) return 0;

  // Bayesian estimate com prior Beta(1,1):
  // posterior_mean = (acertos + 1) / (tentativas + 2)
  const score =
    ((data.correctAttempts + 1) / (data.totalAttempts + 2)) * 100;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function updateTheta(
  theta: number,
  correct: boolean,
  difficulty: Difficulty,
): number {
  // 1PL (Rasch) IRT: P(correct) = 1 / (1 + e^-(theta - d))
  const d = DIFFICULTY_VALUE[difficulty];
  const expected = 1 / (1 + Math.exp(-(theta - d)));
  const actual = correct ? 1 : 0;
  const learningRate = 0.3;
  return theta + learningRate * (actual - expected);
}

function createDefaultData(): NodeProficiencyData {
  return {
    score: 0,
    totalAttempts: 0,
    correctAttempts: 0,
    incorrectAttempts: 0,
    history: [],
    lastPracticed: 0,
    theta: 0,
  };
}

export function useProficiency() {
  const [hydrated, setHydrated] = useState(false);
  const [data, setData] = useState<Record<string, NodeProficiencyData>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, NodeProficiencyData>;
        setData(parsed);
      }
    } catch {
      // corrupted data — start fresh
    }
    setHydrated(true);
  }, []);

  const save = useCallback(
    (newData: Record<string, NodeProficiencyData>) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    },
    [],
  );

  const getProficiency = useCallback(
    (nodeId: string): number => {
      return data[nodeId]?.score ?? 0;
    },
    [data],
  );

  const getNodeData = useCallback(
    (nodeId: string): NodeProficiencyData => {
      return data[nodeId] ?? createDefaultData();
    },
    [data],
  );

  const getTheta = useCallback(
    (nodeId: string): number => {
      return data[nodeId]?.theta ?? 0;
    },
    [data],
  );

  const recordAttempt = useCallback(
    (
      nodeId: string,
      questionId: string,
      correct: boolean,
      responseTimeMs?: number,
      difficulty?: Difficulty,
    ) => {
      setData((prev) => {
        const nodeData = prev[nodeId] ?? createDefaultData();
        const updated: NodeProficiencyData = {
          ...nodeData,
          totalAttempts: nodeData.totalAttempts + 1,
          correctAttempts: nodeData.correctAttempts + (correct ? 1 : 0),
          incorrectAttempts: nodeData.incorrectAttempts + (correct ? 0 : 1),
          history: [
            ...nodeData.history,
            { questionId, correct, timestamp: Date.now(), responseTimeMs },
          ],
          lastPracticed: Date.now(),
          theta: difficulty
            ? updateTheta(nodeData.theta, correct, difficulty)
            : nodeData.theta,
        };
        updated.score = calculateScore(updated);
        const newData = { ...prev, [nodeId]: updated };
        save(newData);
        return newData;
      });
    },
    [save],
  );

  const getWeakNodes = useCallback(
    (threshold = 60): Array<{ nodeId: string; score: number }> => {
      const allNodeIds = MODULES.flatMap((m) =>
        m.nodes.map((n) => n.id),
      );
      return allNodeIds
        .map((id) => ({ nodeId: id, score: getProficiency(id) }))
        .filter((n) => n.score < threshold)
        .sort((a, b) => a.score - b.score);
    },
    [getProficiency],
  );

  const resetNode = useCallback(
    (nodeId: string) => {
      setData((prev) => {
        const newData = { ...prev, [nodeId]: createDefaultData() };
        save(newData);
        return newData;
      });
    },
    [save],
  );

  return {
    hydrated,
    getProficiency,
    getNodeData,
    getTheta,
    recordAttempt,
    getWeakNodes,
    resetNode,
  };
}
