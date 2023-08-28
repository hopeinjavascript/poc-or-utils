import { create } from 'zustand';

export const useNotesStore = create((set, get) => ({
  notes: [{ id: 1, text: 'note 1' }],
  isLoading: false,
  error: null,
  getNotes: () => {
    set((state) => state.notes);
  },
  getSingleNote: (noteId) => {
    console.log({ getSingleNote: { noteId } });
  },
  addNote: (note) => {
    console.log({ addNote: { note } });
    set((state) => ({ notes: [...state.notes, note] }));
  },
  deleteNote: (noteId) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== noteId),
    }));
  },
  updateNote: (n) => {
    console.log({ updateNote: { n } });
    set((state) => ({
      notes: state.notes.map((note) => {
        if (note.id === n.id) {
          return n;
        }
        return note;
      }),
    }));
  },
}));
