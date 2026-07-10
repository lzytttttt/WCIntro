import React, { createContext, useContext, useReducer, type Dispatch } from "react";
import type { AppState, AppAction } from "@/types";
import { useProgress, type LearningProgress } from "@/hooks/useProgress";
import { useToast } from "@/hooks/useToast";
import type { ToastState } from "@/types";

const initialState: AppState = {
  currentModule: null,
  currentStep: 0,
  completedSteps: {},
  selectedFile: null,
  selectedDepartment: null,
  promptForm: {
    goal: "",
    background: "",
    materials: "",
    outputFormat: "",
    constraints: "",
    executionMethod: "",
  },
  toast: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_MODULE":
      return { ...state, currentModule: action.payload, currentStep: 0 };
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "COMPLETE_STEP": {
      const module = action.payload.module;
      const step = action.payload.step;
      const existing = state.completedSteps[module] || [];
      if (existing.includes(step)) return state;
      return {
        ...state,
        completedSteps: {
          ...state.completedSteps,
          [module]: [...existing, step],
        },
      };
    }
    case "SET_SELECTED_FILE":
      return { ...state, selectedFile: action.payload };
    case "SET_DEPARTMENT":
      return { ...state, selectedDepartment: action.payload };
    case "SET_PROMPT_FORM":
      return {
        ...state,
        promptForm: { ...state.promptForm, ...action.payload },
      };
    case "SHOW_TOAST":
      return {
        ...state,
        toast: {
          id: String(Date.now()),
          message: action.payload.message,
          type: action.payload.type,
          visible: true,
        },
      };
    case "HIDE_TOAST":
      return { ...state, toast: null };
    case "CLEAR_PROGRESS":
      return {
        ...state,
        currentModule: null,
        currentStep: 0,
        completedSteps: {},
      };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: Dispatch<AppAction>;
  progress: LearningProgress;
  completeStep: (module: string, step: number) => LearningProgress;
  markModuleComplete: (module: string) => LearningProgress;
  totalProgress: number;
  clearProgress: () => LearningProgress;
  saveProgress: (p: LearningProgress) => void;
  showToast: (message: string, type?: "success" | "error" | "info", duration?: number) => void;
  hideToast: () => void;
  toast: ToastState | null;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { progress, completeStep, markModuleComplete, totalProgress, clearProgress, saveProgress } = useProgress();
  const { toast, showToast, hideToast } = useToast();

  const value: AppContextValue = {
    state,
    dispatch,
    progress,
    completeStep,
    markModuleComplete,
    totalProgress,
    clearProgress,
    saveProgress,
    showToast,
    hideToast,
    toast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
