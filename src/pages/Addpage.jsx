import React from "react";
import NoteInput from "../components/NoteInput";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NoteContext";

function Addpage() {
  const navigate = useNavigate();
  const { addNote } = useNotes();
  
  const handleAddNote = (note) => {
    addNote(note);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <section>
      <NoteInput onAddNote={handleAddNote} onCancelEdit={handleCancel} />
    </section>
  )
}

export default Addpage;