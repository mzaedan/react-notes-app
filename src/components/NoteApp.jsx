import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import NoteList from "./NoteList";
import LoadingIndicator from "./LoadingIndicator";
import { useNotes } from "../context/NoteContext";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../utils/translations";

function NoteApp({ onLogout }) {
  const { notes, loading, actionLoading, error, refreshNotes, deleteNote, archiveNote, unarchiveNote } = useNotes();
  const { language } = useLanguage();
  const t = useTranslation(language);
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

  if (loading && notes.length === 0) {
    return (
      <div className="note-app">
        <Navbar onLogout={onLogout} />
        <LoadingIndicator message="Loading your notes..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="note-app">
        <Navbar onLogout={onLogout} />
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={refreshNotes}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar onLogout={onLogout} />
      <Searchbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="note-section-container">
        <NoteList 
          notes={filteredActiveNotes} 
          onDelete={deleteNote}
          onArchive={archiveNote}
          actionLoading={actionLoading}
          title={t('activeNotes')}
        />
        
        {filteredArchivedNotes.length > 0 && (
          <div className="archived-notes-section">
            <NoteList 
              notes={filteredArchivedNotes} 
              onDelete={deleteNote}
              onArchive={unarchiveNote}
              actionLoading={actionLoading}
              isArchived={true}
              title={t('archivedNotes')}
            />
          </div>
        )}
      </div>
      {/* Global loading overlay for background operations */}
      {loading && notes.length > 0 && (
        <LoadingIndicator message="Refreshing notes..." />
      )}
    </div>
  );
}

export default NoteApp;