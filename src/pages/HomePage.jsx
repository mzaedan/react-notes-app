import React from "react";
import NoteList from "../components/NoteList";
import { useNotes } from "../context/NoteContext";
import { useTranslation } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";

function HomePage() {
  const { notes } = useNotes();
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  // Filter out archived notes for the main view
  const activeNotes = notes.filter(note => !note.archived);

  return (
    <div className="page home-page">
      <NoteList notes={activeNotes} title={t('activeNotes')} />
    </div>
  );
}

export default HomePage;