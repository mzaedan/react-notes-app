import React from "react";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";

function NoteItemBody({ title, body, createdAt, id }) {
  return (
    <div className="note-item-body">
      <h3 className="note-item-title">
        <Link to={`/detail/${id}`} className="note-title-link">
          {title}
        </Link>
      </h3>
      <span className="note-item-date">{showFormattedDate(createdAt)}</span>
      <p className="note-item-body-content">{body}</p>
    </div>
  );
}

export default NoteItemBody;