import React from "react";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import { getInitialData } from "../utils";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      searchQuery: "",
      editingNote: null,
    };
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.archiveNote = this.archiveNote.bind(this);
    this.unarchiveNote = this.unarchiveNote.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  addNote({ title, body }) {
    const newNote = {
      id: +new Date(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.setState((prevState) => ({
      notes: [...prevState.notes, newNote],
    }));
  }

  deleteNote(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.filter(note => note.id !== id),
      editingNote: prevState.editingNote && prevState.editingNote.id === id ? null : prevState.editingNote,
    }));
  }

  editNote({ id, title, body }) {
    this.setState((prevState) => ({
      notes: prevState.notes.map(note => 
        note.id === id ? { ...note, title, body } : note
      ),
      editingNote: null,
    }));
  }

  archiveNote(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map(note => 
        note.id === id ? { ...note, archived: true } : note
      ),
    }));
  }

  unarchiveNote(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map(note => 
        note.id === id ? { ...note, archived: false } : note
      ),
    }));
  }

  startEditing(note) {
    this.setState({
      editingNote: note,
    });
  }

  cancelEditing() {
    this.setState({
      editingNote: null,
    });
  }

  handleSearch(query) {
    this.setState({
      searchQuery: query,
    });
  }

  render() {
    // Filter notes based on search query
    const filteredNotes = this.state.notes.filter(note => 
      note.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    // Separate active and archived notes
    const activeNotes = filteredNotes.filter(note => !note.archived);
    const archivedNotes = filteredNotes.filter(note => note.archived);

    return (
      <div>
        <Navbar />
        <NoteInput 
          onAddNote={this.addNote} 
          onEditNote ={this.editNote}
          editingNote={this.state.editingNote}
          onCancelEdit={this.cancelEditing}
        />
        <Searchbar onSearch={this.handleSearch} searchQuery={this.state.searchQuery} />
        
        <div className="note-section-container">
          <h2>Catatan Aktif</h2>
          <NoteList 
            notes={activeNotes} 
            onDelete={this.deleteNote} 
            onEdit={this.startEditing}
            onArchive={this.archiveNote}
          />
        </div>
        
        {archivedNotes.length > 0 && (
          <div className="note-section-container">
            <h2>Catatan Arsip</h2>
            <NoteList 
              notes={archivedNotes} 
              onDelete={this.deleteNote} 
              onEdit={this.startEditing}
              onArchive={this.unarchiveNote}
            />
          </div>
        )}
      </div>
    );
  }
}

export default NoteApp;