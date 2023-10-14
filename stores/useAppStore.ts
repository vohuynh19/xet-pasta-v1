import { create } from "zustand";

interface AppState {
  isHiddenNav: boolean;
  isHiddenFilterNav: boolean;
}

interface AppAction {
  toggleNav: () => void;
  toggleFilterNav: () => void;
}

const useAppStore = create<AppState & AppAction>((set) => ({
  isHiddenNav: true,
  isHiddenFilterNav: true,

  toggleNav: () => set((state) => ({ isHiddenNav: !state.isHiddenNav })),
  toggleFilterNav: () =>
    set((state) => ({ isHiddenFilterNav: !state.isHiddenFilterNav })),
}));

export default useAppStore;
