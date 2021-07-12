import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {delete_ref} from "../../store/reference"
function ReferenceDisplay({reference,setShowNotesForm,setRefTitle,setRefBody, newInfo, setNewInfo}) {
    const dispatch = useDispatch();
    function handleDeleteRef(){
        dispatch(delete_ref(reference.id));
        setNewInfo(newInfo+1)
    }
    function handleEditRef (){
        setRefTitle(reference.title);
        setRefBody(reference.body);
        handleDeleteRef();
        setShowNotesForm(true);
    }
    return(
        <div className="note-container">
            <div className="note-display-title">
                {reference.title}
            </div>
            <div title="Copy to Clipboard" onClick={e=>{navigator.clipboard.writeText(e.target.innerText)}} className="note-display-body">
            {reference.body}
            </div>
            <div className="note-display-date">
                {reference.created_at}
            <div className="note-display-buttons">
                <button onClick={handleEditRef} className="edit-app-btn"> Edit</button>
                <button onClick={handleDeleteRef} className="delete-app-btn"> Delete</button>
            </div>
            </div>

        </div>

    )
}

export default ReferenceDisplay;
