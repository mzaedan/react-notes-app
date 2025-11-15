import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotes } from "../context/NoteContext";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNoteById } = useNotes();
  const note = getNoteById(id);

  const handleGoBack = () => {
    navigate("/");
  };

  if (!note) {
    return (
      <section className="detail-container">
        <h2 className="detail-title">Note Not Found</h2>
        <p className="detail-date">The requested note could not be found.</p>
        <button className="back-button" onClick={handleGoBack}>
          Kembali
        </button>
      </section>
    );
  }

  return (
    <section className="detail-container">
      <h2 className="detail-title">{note.title}</h2>
      <p className="detail-date">
        Created on: {new Date(note.createdAt).toLocaleDateString()}
      </p>

      <div className="detail-body">
        {note.body}
      </div>
      
      <button className="back-button" onClick={handleGoBack}>
        Kembali
      </button>
    </section>
  );
}

export default DetailPage;