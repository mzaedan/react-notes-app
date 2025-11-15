import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes = [], onDelete, onArchive, isArchived = false }) {
  if (!notes.length) {
    return (
      <div className="note-list-empty">
        <p>{isArchived ? "Tidak ada catatan yang diarsipkan !" : "Tidak ada catatan tersedia !"}</p>
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
          />
        ))}
      </div>
    );
  }
}

export default NoteList;