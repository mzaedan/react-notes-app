import React, { createContext, useContext, useState, useEffect } from "react";
import { getActiveNotes, getArchivedNotes, addNote as apiAddNote, deleteNote as apiDeleteNote, archiveNote as apiArchiveNote, unarchiveNote as apiUnarchiveNote, editNote as apiEditNote } from "../utils/api";

const NoteContext = createContext();

export function useNotes() {
  return useContext(NoteContext);
}

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({}); // For tracking specific actions
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch active notes
      const { error: activeError, data: activeNotes } = await getActiveNotes();
      
      if (activeError) {
        throw new Error("Failed to fetch active notes");
      }
      
      // Fetch archived notes
      const { error: archivedError, data: archivedNotes } = await getArchivedNotes();
      
      if (archivedError) {
        throw new Error("Failed to fetch archived notes");
      }
      
      // Combine active and archived notes
      const allNotes = [...activeNotes, ...archivedNotes];
      setNotes(allNotes);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const setActionLoadingState = (actionId, isLoading) => {
    setActionLoading(prev => ({
      ...prev,
      [actionId]: isLoading
    }));
  };

  const addNote = async (newNote) => {
    const actionId = `add-${Date.now()}`;
    setActionLoadingState(actionId, true);
    try {
      const { error, data } = await apiAddNote({
        title: newNote.title,
        body: newNote.body
      });

      if (!error) {
        // Refresh notes after adding
        await fetchNotes();
        return { error: false, data };
      } else {
        return { error: true, data: null };
      }
    } catch (err) {
      console.error("Error adding note:", err);
      return { error: true, data: null };
    } finally {
      setActionLoadingState(actionId, false);
    }
  };

  const deleteNote = async (id) => {
    const actionId = `delete-${id}`;
    setActionLoadingState(actionId, true);
    try {
      const { error, data } = await apiDeleteNote(id);

      if (!error) {
        // Refresh notes after deleting
        await fetchNotes();
        return { error: false, data };
      } else {
        return { error: true, data: null };
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      return { error: true, data: null };
    } finally {
      setActionLoadingState(actionId, false);
    }
  };

  const archiveNote = async (id) => {
    const actionId = `archive-${id}`;
    setActionLoadingState(actionId, true);
    try {
      const { error, data } = await apiArchiveNote(id);

      if (!error) {
        // Refresh notes after archiving
        await fetchNotes();
        return { error: false, data };
      } else {
        return { error: true, data: null };
      }
    } catch (err) {
      console.error("Error archiving note:", err);
      return { error: true, data: null };
    } finally {
      setActionLoadingState(actionId, false);
    }
  };

  const unarchiveNote = async (id) => {
    const actionId = `unarchive-${id}`;
    setActionLoadingState(actionId, true);
    try {
      const { error, data } = await apiUnarchiveNote(id);

      if (!error) {
        // Refresh notes after unarchiving
        await fetchNotes();
        return { error: false, data };
      } else {
        return { error: true, data: null };
      }
    } catch (err) {
      console.error("Error unarchiving note:", err);
      return { error: true, data: null };
    } finally {
      setActionLoadingState(actionId, false);
    }
  };

  const editNote = async (updatedNote) => {
    const actionId = `edit-${updatedNote.id}`;
    setActionLoadingState(actionId, true);
    try {
      const { error, data } = await apiEditNote({
        id: updatedNote.id,
        title: updatedNote.title,
        body: updatedNote.body
      });

      if (!error) {
        // Refresh notes after editing
        await fetchNotes();
        return { error: false, data };
      } else {
        return { error: true, data: null };
      }
    } catch (err) {
      console.error("Error editing note:", err);
      return { error: true, data: null };
    } finally {
      setActionLoadingState(actionId, false);
    }
  };

  const getNoteById = (id) => {
    return notes.find(note => note.id === id);
  };

  const value = {
    notes,
    loading,
    actionLoading,
    error,
    addNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    editNote,
    getNoteById,
    refreshNotes: fetchNotes
  };

  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
}