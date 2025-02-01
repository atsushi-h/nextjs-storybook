import { create } from 'zustand';

type State = {
  editTaskId: number;
  updateEditTaskId: (id: number) => void;
  resetEditTaskId: () => void;
};

export const useTaskStore = create<State>((set) => ({
  editTaskId: 0,
  updateEditTaskId: (id) =>
    set({
      editTaskId: id,
    }),
  resetEditTaskId: () => set({ editTaskId: 0 }),
}));
