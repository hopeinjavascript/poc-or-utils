import { useRef, useState } from 'react';
import { useNotesStore } from '../../zustand/useNotesStore';

const Note = ({ note }) => {
  const [deleteNote, updateNote] = useNotesStore((state) => [
    state.deleteNote,
    state.updateNote,
  ]);

  const [isUpdating, setIsUpdating] = useState(false);

  const refInput = useRef(null);

  return (
    <div>
      {!isUpdating ? (
        <span>{note.text}</span>
      ) : (
        <>
          <input
            type="text"
            name="note"
            id="note"
            defaultValue={note.text}
            ref={refInput}
          />
          <button
            type="submit"
            onClick={() => {
              updateNote({ id: note.id, text: refInput.current.value });
              setIsUpdating(!isUpdating);
            }}
          >
            Save
          </button>
        </>
      )}

      <button
        type="submit"
        onClick={() => {
          setIsUpdating(!isUpdating);
          // refInput.current?.focus(); // not working => because "reference(ref)" to the input isn't getting created because input tag itself is rendering after this handler's invocation.
        }}
      >
        {!isUpdating ? 'Update' : 'Cancel'}
      </button>
      <button
        type="submit"
        onClick={() => deleteNote(note.id)}
        disabled={isUpdating}
      >
        Delete
      </button>
    </div>
  );
};

export default Note;
