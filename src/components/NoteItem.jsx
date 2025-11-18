import React from "react";
import NoteItemBody from "./NoteItemBody";
import { Link } from "react-router-dom";
import { FaTrash, FaArchive, FaBoxOpen, FaEdit } from "react-icons/fa";

function NoteItem({ note, onDelete, onArchive, isArchived = false, actionLoading }) {
  const isLoading = actionLoading && (actionLoading[`delete-${note.id}`] || actionLoading[`archive-${note.id}`] || actionLoading[`unarchive-${note.id}`]);
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete(note.id);
    }
  };

  const handleArchive = () => {
    onArchive(note.id);
  };

  return (
    <div className="note-item">
      <NoteItemBody note={note} />
      
      <div className="note-item-action">
        <Link to={`/edit/${note.id}`} className="note-btn edit" disabled={isLoading}>
          <FaEdit /> Edit
        </Link>
        
        <button 
          className={`note-btn ${isArchived ? 'archive' : 'archive'}`}
          onClick={handleArchive}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-small"></span> Processing...
            </>
          ) : isArchived ? (
            <>
              <FaBoxOpen /> Unarchive
            </>
          ) : (
            <>
              <FaArchive /> Archive
            </>
          )}
        </button>
        
        <button 
          className="note-btn delete"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-small"></span> Deleting...
            </>
          ) : (
            <>
              <FaTrash /> Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default NoteItem;