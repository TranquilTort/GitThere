import React, { useState, useEffect } from "react";
import "./NoteDisplay.css"
function NoteDisplay({note}) {
    return(
        <div className="note-container">
            <div className="note-display-title">
                {note.title}
            </div>
            <div class>

            </div>


        </div>

    )
}

export default NoteDisplay;
