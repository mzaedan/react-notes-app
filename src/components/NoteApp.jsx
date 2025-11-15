import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import NoteList from "./NoteList";
import { useNotes } from "../context/NoteContext";

function NoteApp() {
  const { notes, deleteNote, archiveNote } = useNotes();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");

  useEffect(() => {
    const search = searchParams.get('search') || "";
    setSearchTerm(search);
  }, [searchParams]);

  const activeNotes = notes.filter(note => !note.archived);
  const archivedNotes = notes.filter(note => note.archived);
  
  const filteredActiveNotes = activeNotes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredArchivedNotes = archivedNotes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    
    if (newSearchTerm) {
      setSearchParams({ search: newSearchTerm });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div>
      <Navbar />
      <Searchbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="note-section-container">
        <h2 className="title">Active Notes</h2>
        <NoteList 
          notes={filteredActiveNotes} 
          onDelete={deleteNote}
          onArchive={archiveNote}
        />
        
        {filteredArchivedNotes.length > 0 && (
          <div className="archived-notes-section">
            <h2 className="title">Archived Notes</h2>
            <NoteList 
              notes={filteredArchivedNotes} 
              onDelete={deleteNote}
              onArchive={archiveNote}
              isArchived={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteApp;