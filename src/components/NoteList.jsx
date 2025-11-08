import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes = [], onDelete, onArchive, onEdit }) {
  if (!notes.length) {
    return (
      <div className="note-list-empty">
        <p>Tidak ada catatan yang diarsipkan !</p>
      </div>
    );
  } else {
    return (
      <div className="note-list">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={onDelete}
            onArchive={onArchive}
            onEdit={onEdit}
          />
        ))}
      </div>
    );
  }
}

export default NoteList;