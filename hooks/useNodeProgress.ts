"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MODULES } from "@/lib/domain";
import { useProficiency } from "./useProficiency";

export function useNodeProgress() {
  const [hydrated, setHydrated] = useState(false);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [unlockedNodes, setUnlockedNodes] = useState<string[]>([]);

  const { getProficiency } = useProficiency();

  const allNodeIds = useMemo(
    () => MODULES.flatMap((module) => module.nodes.map((node) => node.id)),
    [],
  );

  const nodeModuleMap = useMemo(() => {
    const map = new Map<string, { moduleId: string; nodeIndex: number }>();
    MODULES.forEach((module) => {
      module.nodes.forEach((node, nodeIndex) => {
        map.set(node.id, { moduleId: module.id, nodeIndex });
      });
    });
    return map;
  }, []);

  const save = useCallback((key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  const getNextNodeId = useCallback(
    (nodeId: string) => {
      const currentIndex = allNodeIds.findIndex((id) => id === nodeId);
      if (currentIndex === -1 || currentIndex === allNodeIds.length - 1) {
        return undefined;
      }
      return allNodeIds[currentIndex + 1];
    },
    [allNodeIds],
  );

  const shouldAutoUnlockNext = useCallback(
    (nodeId: string) => {
      const nextNodeId = getNextNodeId(nodeId);
      if (!nextNodeId) return false;

      const currentMeta = nodeModuleMap.get(nodeId);
      const nextMeta = nodeModuleMap.get(nextNodeId);

      return currentMeta?.moduleId === nextMeta?.moduleId;
    },
    [getNextNodeId, nodeModuleMap],
  );

  const nodesInModuleReady = useCallback(
    (moduleId: string): boolean => {
      const module = MODULES.find((m) => m.id === moduleId);
      if (!module) return false;
      return module.nodes.every((n) => getProficiency(n.id) >= 60);
    },
    [getProficiency],
  );

  // hydrate do localStorage
  useEffect(() => {
    const rawCompleted = localStorage.getItem("completedNodes") || "[]";
    const rawUnlocked = localStorage.getItem("unlockedNodes") || "[]";

    let completed: string[] = [];
    let unlocked: string[] = [];

    try {
      const parsedCompleted = JSON.parse(rawCompleted);
      if (Array.isArray(parsedCompleted)) completed = parsedCompleted;
    } catch {
      completed = [];
    }

    try {
      const parsedUnlocked = JSON.parse(rawUnlocked);
      if (Array.isArray(parsedUnlocked)) unlocked = parsedUnlocked;
    } catch {
      unlocked = [];
    }

    if (unlocked.length === 0 && allNodeIds[0]) {
      unlocked = [allNodeIds[0]];
    }

    if (completed.length > 0) {
      const lastCompleted = completed[completed.length - 1];
      const nextNodeId = getNextNodeId(lastCompleted);
      if (
        nextNodeId &&
        shouldAutoUnlockNext(lastCompleted) &&
        !completed.includes(nextNodeId) &&
        !unlocked.includes(nextNodeId)
      ) {
        unlocked = [...unlocked, nextNodeId];
      }
    }

    setCompletedNodes(completed);
    setUnlockedNodes(unlocked);
    save("completedNodes", completed);
    save("unlockedNodes", unlocked);
    setHydrated(true);
  }, [allNodeIds, getNextNodeId, save, shouldAutoUnlockNext]);

  const isCompleted = useCallback(
    (nodeId: string) => completedNodes.includes(nodeId),
    [completedNodes],
  );

  const isUnlocked = useCallback(
    (nodeId: string) => unlockedNodes.includes(nodeId),
    [unlockedNodes],
  );

  const completeNode = useCallback(
    (nodeId: string): boolean => {
      if (completedNodes.includes(nodeId)) return false;

      const prof = getProficiency(nodeId);
      if (prof < 80) return false;

      const nextCompleted = [...completedNodes, nodeId];
      save("completedNodes", nextCompleted);
      setCompletedNodes(nextCompleted);

      const nextNodeId = getNextNodeId(nodeId);
      if (
        nextNodeId &&
        shouldAutoUnlockNext(nodeId) &&
        !unlockedNodes.includes(nextNodeId)
      ) {
        const nextUnlocked = [...unlockedNodes, nextNodeId];
        save("unlockedNodes", nextUnlocked);
        setUnlockedNodes(nextUnlocked);
      }

      const currentMeta = nodeModuleMap.get(nodeId);
      if (currentMeta) {
        const currentModule = MODULES.find(
          (m) => m.id === currentMeta.moduleId,
        );
        if (currentModule) {
          const allComplete = currentModule.nodes.every((n) =>
            nextCompleted.includes(n.id),
          );
          if (allComplete) {
            const nextModule = MODULES.find(
              (m) => m.number === currentModule.number + 1,
            );
            if (nextModule) {
              const firstNodeId = nextModule.nodes[0]?.id;
              if (firstNodeId && !unlockedNodes.includes(firstNodeId)) {
                const nextUnlocked = [...unlockedNodes, firstNodeId];
                save("unlockedNodes", nextUnlocked);
                setUnlockedNodes(nextUnlocked);
              }
            }
          }
        }
      }

      return true;
    },
    [
      completedNodes,
      unlockedNodes,
      getProficiency,
      getNextNodeId,
      shouldAutoUnlockNext,
      save,
      nodeModuleMap,
    ],
  );

  const unlockNode = useCallback((nodeId: string) => {
    setUnlockedNodes((prev) => {
      if (prev.includes(nodeId)) return prev;
      const updated = [...prev, nodeId];
      save("unlockedNodes", updated);
      return updated;
    });
  }, []);

  const unlockFirstNode = useCallback(
    (nodeId: string) => {
      unlockNode(nodeId);
    },
    [unlockNode],
  );

  return {
    hydrated,
    isCompleted,
    isUnlocked,
    completeNode,
    unlockNode,
    unlockFirstNode,
    nodesInModuleReady,
  };
}
