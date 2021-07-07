import React, { useState, useEffect } from "react";

function NoteDisplay({note}) {
    return(
        <div className="note-container">
            {note.title}
        </div>
    )
}

export default NoteDisplay;
