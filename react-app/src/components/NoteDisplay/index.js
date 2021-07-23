import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from 'react-redux';
import {delete_note} from "../../store/note"
import {ColorContext} from "../../context/ColorContext"
import "./NoteDisplay.css"
function NoteDisplay({note,setShowNotesForm,setTitle,setBody, newInfo, setNewInfo,appDisplayStatus}) {
    const {colors} = useContext(ColorContext);
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
        <div className="note-container"
            style={{border:`1px solid ${colors[appDisplayStatus].dark}`}}
        >
            <div className="note-display-title"
                style={{color:`${colors[0].mainFontColor}`,borderBottom:`2px solid ${colors[appDisplayStatus].dark}`}}
            >
                {note.title}
            </div>
            <div title="Copy to Clipboard"
                onClick={e=>{navigator.clipboard.writeText(e.target.innerText)}}
                style={{color:`${colors[0].mainFontColor}`}}
                className="note-display-body"
            >
                {note.body}
            </div>
            <div className="note-display-date"
                style={{color:`${colors[0].mainFontColor}`}}
            >
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
