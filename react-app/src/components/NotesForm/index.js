import { useDispatch,useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import {add_one_note} from "../../store/note"
import "./NotesForm.css"
function NotesForm({toggleForm,appId, title , setTitle, body, setBody}) {

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        toggleForm()
        await dispatch(add_one_note(appId,title,body));
        setBody('')
        setTitle('')
    }
    return(
        <div >
            <form className="note-form-container"onSubmit={handleSubmit}>
                <input type="text"
                className="note-form-title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder='Title'
                name='title' />
                <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="note-form-body"
                name='body'
                placeholder='Leave your note here...'></textarea>
                <button className='submit-note' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default NotesForm;
