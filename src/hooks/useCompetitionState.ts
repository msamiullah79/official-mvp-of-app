import { useState, useEffect } from "react";
import { CompetitionUserState } from "@/data/mockData";

const STORAGE_KEY = "acadrank_competition_state";

export const useCompetitionState = () => {
  const [states, setStates] = useState<CompetitionUserState[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
  }, [states]);

  const getState = (competitionId: string): CompetitionUserState | undefined => {
    return states.find(s => s.competitionId === competitionId);
  };

  const register = (competitionId: string) => {
    setStates(prev => {
      if (prev.find(s => s.competitionId === competitionId)) return prev;
      return [...prev, { competitionId, status: "registered" }];
    });
  };

  const complete = (
    competitionId: string, 
    results: { score: number; accuracy: number; timeTaken: number; rank: number }
  ) => {
    setStates(prev => {
      const existing = prev.find(s => s.competitionId === competitionId);
      if (existing?.status === "completed") return prev; // Can't complete twice
      
      const newState: CompetitionUserState = {
        competitionId,
        status: "completed",
        ...results,
        completedAt: new Date().toISOString(),
      };
      
      return [...prev.filter(s => s.competitionId !== competitionId), newState];
    });
  };

  const canJoin = (competitionId: string): boolean => {
    const state = getState(competitionId);
    return !state || state.status === "registered";
  };

  const isCompleted = (competitionId: string): boolean => {
    return getState(competitionId)?.status === "completed";
  };

  const isRegistered = (competitionId: string): boolean => {
    return getState(competitionId)?.status === "registered";
  };

  return {
    getState,
    register,
    complete,
    canJoin,
    isCompleted,
    isRegistered,
  };
};
