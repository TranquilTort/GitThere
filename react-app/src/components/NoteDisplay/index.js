import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {delete_note} from "../../store/note"
import "./NoteDisplay.css"
function NoteDisplay({note,setShowNotesForm,setTitle,setBody, newInfo, setNewInfo}) {
    const dispatch = useDispatch();
    function handleDeleteNote(){
        dispatch(delete_note(note.id));
        setNewInfo(newInfo+1)
    }
    function handleEditNote (){
        setTitle(note.title);
        setBody(note.body);
        handleDeleteNote();
        setShowNotesForm(true);
    }
    return(
        <div className="note-container">
            <div className="note-display-title">
                {note.title}
            </div>
            <div className="note-display-body">
            {note.body}
            </div>
            <div className="note-display-date">
                {note.created_at}
            <div className="note-display-buttons">
                <button onClick={handleEditNote} className="edit-app-btn"> Edit</button>
                <button onClick={handleDeleteNote} className="delete-app-btn"> Delete</button>
            </div>
            </div>

        </div>

    )
}

export default NoteDisplay;
