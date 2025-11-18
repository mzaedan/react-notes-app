import React from "react";
import NoteList from "../components/NoteList";
import { useNotes } from "../context/NoteContext";
import { useTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";

function ArchivePage() {
  const { notes } = useNotes();
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  // Filter archived notes
  const archivedNotes = notes.filter(note => note.archived);

  return (
    <div className="page archive-page">
      <NoteList 
        notes={archivedNotes} 
        title={t('archivedNotes')} 
        isArchived={true}
      />
    </div>
  );
}

export default ArchivePage;
