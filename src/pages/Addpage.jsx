import React, { useState } from "react";
import NoteInput from "../components/NoteInput";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NoteContext";

function Addpage() {
  const navigate = useNavigate();
  const { addNote } = useNotes();
  const [loading, setLoading] = useState(false);
  
  const handleAddNote = async (note) => {
    setLoading(true);
    try {
      const { error } = await addNote(note);
      
      if (!error) {
        navigate("/");
      } else {
        alert("Failed to add note");
      }
    } catch (err) {
      alert("Error adding note: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <section>
      <NoteInput onAddNote={handleAddNote} onCancelEdit={handleCancel} loading={loading} />
    </section>
  )
}

export default Addpage;