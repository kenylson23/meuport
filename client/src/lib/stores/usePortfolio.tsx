import { create } from "zustand";

interface PortfolioState {
  currentSection: string;
  isLoading: boolean;
  menuOpen: boolean;
  
  // Actions
  setCurrentSection: (section: string) => void;
  setIsLoading: (loading: boolean) => void;
  toggleMenu: () => void;
}

export const usePortfolio = create<PortfolioState>((set) => ({
  currentSection: "hero",
  isLoading: true,
  menuOpen: false,
  
  setCurrentSection: (section) => set({ currentSection: section }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
}));
