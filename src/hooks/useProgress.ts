import { useCallback, useMemo } from "react";
import { getStorage, setStorage } from "@/utils/storage";

const PROGRESS_KEY = "learning_progress";

export interface LearningProgress {
  completedSteps: Record<string, number[]>;
  completedModules: string[];
  lastModule: string | null;
  lastStep: number;
}

const defaultProgress: LearningProgress = {
  completedSteps: {},
  completedModules: [],
  lastModule: null,
  lastStep: 0,
};

export function useProgress() {
  const progress: LearningProgress = getStorage(PROGRESS_KEY, defaultProgress);

  const saveProgress = useCallback((newProgress: LearningProgress) => {
    setStorage(PROGRESS_KEY, newProgress);
  }, []);

  const completeStep = useCallback(
    (module: string, step: number) => {
      const updated = { ...progress };
      if (!updated.completedSteps[module]) {
        updated.completedSteps[module] = [];
      }
      if (!updated.completedSteps[module].includes(step)) {
        updated.completedSteps[module] = [...updated.completedSteps[module], step];
      }
      updated.lastModule = module;
      updated.lastStep = step;
      saveProgress(updated);
      return updated;
    },
    [progress, saveProgress]
  );

  const markModuleComplete = useCallback(
    (module: string) => {
      const updated = { ...progress };
      if (!updated.completedModules.includes(module)) {
        updated.completedModules = [...updated.completedModules, module];
      }
      saveProgress(updated);
      return updated;
    },
    [progress, saveProgress]
  );

  const totalProgress = useMemo(() => {
    const totalModules = 9;
    // totalSteps across all modules (approximate)
    const totalSteps = 8 + 10 + 1 + 1 + 1 + 1 + 1 + 1 + 1; // WB 8, CB 10, others 1 each
    let completed = 0;
    Object.values(progress.completedSteps).forEach((steps) => {
      completed += steps.length;
    });
    return Math.min(Math.round((completed / totalSteps) * 100), 100);
  }, [progress]);

  const clearProgress = useCallback(() => {
    setStorage(PROGRESS_KEY, defaultProgress);
    return defaultProgress;
  }, []);

  return {
    progress,
    completeStep,
    markModuleComplete,
    totalProgress,
    clearProgress,
    saveProgress,
  };
}
