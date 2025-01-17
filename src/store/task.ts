import { create } from 'zustand';

import { EditedTask } from '@/types';

type State = {
  editedTask: EditedTask;
  updateEditedTask: (payload: EditedTask) => void;
  resetEditedTask: () => void;
};

export const useTaskStore = create<State>((set) => ({
  editedTask: { id: 0, title: '', description: '' },
  updateEditedTask: (payload) =>
    set({
      editedTask: {
        id: payload.id,
        title: payload.title,
        description: payload.description,
      },
    }),
  resetEditedTask: () => set({ editedTask: { id: 0, title: '', description: '' } }),
}));
