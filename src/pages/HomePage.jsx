import React from "react";
import NoteList from "../components/NoteList";
import { useNotes } from "../context/NoteContext";

function HomePage() {
  const { notes } = useNotes();
  
  // Filter out archived notes for the main view
  const activeNotes = notes.filter(note => !note.archived);

  return (
    <div className="page home-page">
      <NoteList notes={activeNotes} />
    </div>
  );
}

export default HomePage;