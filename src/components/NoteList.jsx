import React from "react";
import NoteItem from "./NoteItem";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../utils/translations";

function NoteList({ notes, onDelete, onArchive, isArchived, actionLoading, title }) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  const displayTitle = title || t('notes');
  
  if (notes.length === 0) {
    return (
      <div className="note-list-empty">
        <p>{t('noNotes')}</p>
      </div>
    );
  }

  return (
    <div className="note-list-container">
      {title !== undefined && <h2 className="title">{displayTitle}</h2>}
      <div className="note-list">
        {notes.map(note => (
          <NoteItem 
            key={note.id} 
            note={note} 
            onDelete={onDelete} 
            onArchive={onArchive} 
            isArchived={isArchived}
            actionLoading={actionLoading}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteList;