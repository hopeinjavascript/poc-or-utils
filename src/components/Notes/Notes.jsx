import { useRef, useState, useEffect } from 'react';
import { useNotesStore } from '../../zustand/useNotesStore';
import Note from '../Note/Note';

const Notes = () => {
  const notes = useNotesStore((state) => state.notes);

  const [note, setNote] = useState('');

  const addNote = useNotesStore((state) => state.addNote);

  const refInput = useRef(null);

  useEffect(() => {
    refInput.current?.focus();

    return () => {};
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <input
        type="text"
        name="note"
        id="note"
        value={note}
        ref={refInput}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        type="submit"
        disabled={note ? false : true}
        onClick={() => {
          addNote({ id: notes.length + 1, text: note });
          setNote('');
          refInput.current?.focus();
        }}
      >
        Add a Note
      </button>
      {notes.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
    </div>
  );
};

export default Notes;
