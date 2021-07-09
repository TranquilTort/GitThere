import React, { useState, useEffect } from "react";
import "./NoteDisplay.css"
function NoteDisplay({note}) {
    return(
        <div className="note-container">
            <div className="note-display-title">
                {note.title}
            </div>
            <div className="note-display-body">
            {note.body}
            </div>
            <div className="note-display-date">
                Created: {note.created_at}
            </div>
            <div className="note-display-buttons">
                <button className="edit-app-btn"> Edit</button>
                <button className="delete-app-btn"> Delete</button>
            </div>

        </div>

    )
}

export default NoteDisplay;
