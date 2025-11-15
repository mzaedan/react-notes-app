import React, { useEffect, useState } from "react";
import NoteInput from "../components/NoteInput";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../context/NoteContext";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, editNote } = useNotes();
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    // Find the note to edit
    const noteToEdit = notes.find(note => note.id === parseInt(id));
    if (noteToEdit) {
      setEditingNote(noteToEdit);
    } else {
      // If note not found, redirect to home
      navigate("/");
    }
  }, [id, notes, navigate]);

  const handleEditNote = (updatedNote) => {
    editNote({
      ...updatedNote,
      id: parseInt(id),
      createdAt: editingNote.createdAt,
      archived: editingNote.archived
    });
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (!editingNote) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <NoteInput 
        editingNote={editingNote}
        onEditNote={handleEditNote}
        onCancelEdit={handleCancel}
      />
    </section>
  );
}

export default EditPage;