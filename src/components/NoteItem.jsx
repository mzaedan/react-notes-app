import React from "react";
import NoteItemBody from "./NoteItemBody";

function NoteItem({ note, onDelete, onArchive, onEdit }) {
  const handleDelete = () => {
    onDelete(note.id);
  };

  const handleEdit = () => {
    onEdit(note);
  };

  const handleArchive = () => {
    onArchive(note.id);
  };

  return (
    <div className="note-item">
      <NoteItemBody {...note} />
      <div className="note-item-action">
        <button className="note-btn edit" onClick={handleEdit}>Edit</button>
        <button className="note-btn archive" onClick={handleArchive}>
          {note.archived ? "Unarchive" : "Archive"}
        </button>
        <button className="note-btn delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default NoteItem;