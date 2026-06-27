"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReviewData } from "@/lib/domain";

const STORAGE_KEY = "reviewSchedule";

function createDefaultReviewData(): ReviewData {
  return {
    interval: 0,
    ease: 2.5,
    repetitions: 0,
    nextReview: 0,
    lastReview: 0,
  };
}

// Algoritmo SM-2 (SuperMemo):
// quality varia de 0 (pior) a 5 (melhor)
function applySM2(data: ReviewData, quality: number): ReviewData {
  const newData = { ...data, lastReview: Date.now() };

  if (quality < 3) {
    // Falha: reset
    newData.interval = 1;
    newData.repetitions = 0;
  } else {
    // Sucesso
    if (newData.repetitions === 0) {
      newData.interval = 1;
    } else if (newData.repetitions === 1) {
      newData.interval = 6;
    } else {
      newData.interval = Math.round(newData.interval * newData.ease);
    }
    newData.repetitions += 1;
  }

  // Atualiza ease factor
  newData.ease = Math.max(
    1.3,
    newData.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
  );

  newData.nextReview = Date.now() + newData.interval * 86400000;
  return newData;
}

// Mapeia performance da tentativa para qualidade SM-2 (0-5)
export function computeQuality(
  correct: boolean,
  responseTimeMs?: number,
  hintUsed?: boolean,
): number {
  if (hintUsed && !correct) return 0;
  if (!correct) return 1;
  if (responseTimeMs === undefined) return 4;
  if (responseTimeMs < 10000) return 5;  // rápido
  if (responseTimeMs < 30000) return 4;  // médio
  return 3;                              // lento
}

export function useSpacedRepetition() {
  const [hydrated, setHydrated] = useState(false);
  const [data, setData] = useState<Record<string, ReviewData>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, ReviewData>;
        setData(parsed);
      }
    } catch {
      // corrupted data
    }
    setHydrated(true);
  }, []);

  const save = useCallback(
    (newData: Record<string, ReviewData>) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    },
    [],
  );

  // Registra uma revisão para o nó com a qualidade observada
  const recordReview = useCallback(
    (nodeId: string, quality: number) => {
      setData((prev) => {
        const nodeData = prev[nodeId] ?? createDefaultReviewData();
        const updated = applySM2(nodeData, quality);
        const newData = { ...prev, [nodeId]: updated };
        save(newData);
        return newData;
      });
    },
    [save],
  );

  // Retorna nós com revisão vencida ou próxima (dentro de N dias)
  const getDueReviews = useCallback(
    (daysAhead = 1): Array<{ nodeId: string; data: ReviewData }> => {
      const cutoff = Date.now() + daysAhead * 86400000;
      return Object.entries(data)
        .filter(([, rd]) => rd.nextReview > 0 && rd.nextReview <= cutoff)
        .map(([nodeId, rd]) => ({ nodeId, data: rd }))
        .sort((a, b) => a.data.nextReview - b.data.nextReview);
    },
    [data],
  );

  const getNodeReviewData = useCallback(
    (nodeId: string): ReviewData => {
      return data[nodeId] ?? createDefaultReviewData();
    },
    [data],
  );

  return {
    hydrated,
    recordReview,
    getDueReviews,
    getNodeReviewData,
  };
}
