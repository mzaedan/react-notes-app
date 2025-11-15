import React, { createContext, useContext, useState, useEffect } from "react";
import { getInitialData } from "../utils";

const NoteContext = createContext();

export function useNotes() {
  return useContext(NoteContext);
}

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(getInitialData());
  }, []);

  const addNote = (newNote) => {
    const note = {
      ...newNote,
      id: +new Date(),
      createdAt: new Date().toISOString(),
      archived: false,
    };
    setNotes(prevNotes => [...prevNotes, note]);
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const archiveNote = (id) => {
    setNotes(prevNotes => 
      prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, archived: !note.archived };
        }
        return note;
      })
    );
  };

  const editNote = (updatedNote) => {
    setNotes(prevNotes => 
      prevNotes.map(note => {
        if (note.id === updatedNote.id) {
          return updatedNote;
        }
        return note;
      })
    );
  };

  const getNoteById = (id) => {
    return notes.find(note => note.id === parseInt(id));
  };

  const value = {
    notes,
    addNote,
    deleteNote,
    archiveNote,
    editNote,
    getNoteById
  };

  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
}