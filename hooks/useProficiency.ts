"use client";

import { useCallback, useEffect, useState } from "react";
import { MODULES } from "@/lib/domain";

interface AttemptRecord {
  questionId: string;
  correct: boolean;
  timestamp: number;
}

interface NodeProficiencyData {
  score: number;
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  history: AttemptRecord[];
  lastPracticed: number;
}

const STORAGE_KEY = "proficiencyData";

function calculateScore(data: NodeProficiencyData): number {
  if (data.totalAttempts === 0) return 0;

  const overallRate = data.correctAttempts / data.totalAttempts;

  const recent = data.history.slice(-5);
  const recentCorrect = recent.filter((a) => a.correct).length;
  const recentTotal = recent.length;
  const recentRate = recentTotal > 0 ? recentCorrect / recentTotal : 0;

  const weighted =
    recentTotal > 0
      ? recentRate * 0.6 + overallRate * 0.4
      : overallRate;

  return Math.max(0, Math.min(100, Math.round(weighted * 100)));
}

function createDefaultData(): NodeProficiencyData {
  return {
    score: 0,
    totalAttempts: 0,
    correctAttempts: 0,
    incorrectAttempts: 0,
    history: [],
    lastPracticed: 0,
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

  const recordAttempt = useCallback(
    (nodeId: string, questionId: string, correct: boolean) => {
      setData((prev) => {
        const nodeData = prev[nodeId] ?? createDefaultData();
        const updated: NodeProficiencyData = {
          ...nodeData,
          totalAttempts: nodeData.totalAttempts + 1,
          correctAttempts: nodeData.correctAttempts + (correct ? 1 : 0),
          incorrectAttempts: nodeData.incorrectAttempts + (correct ? 0 : 1),
          history: [
            ...nodeData.history,
            { questionId, correct, timestamp: Date.now() },
          ],
          lastPracticed: Date.now(),
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
    recordAttempt,
    getWeakNodes,
    resetNode,
  };
}
