import { useDispatch,useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import {add_one_ref} from "../../store/reference"

function ReferenceForm({toggleForm, refTitle , setRefTitle, refBody, setRefBody,userId}) {

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        toggleForm()
        await dispatch(add_one_ref(refTitle,refBody,userId));
        setRefTitle('')
        setRefBody('')
    }
    return(
        <div >
            <form className="note-form-container"onSubmit={handleSubmit}>
                <input type="text"
                className="note-form-title"
                onChange={(e) => setRefTitle(e.target.value)}
                value={refTitle}
                placeholder='Title'
                name='title' />
                <textarea
                value={refBody}
                onChange={(e) => setRefBody(e.target.value)}
                className="note-form-body"
                name='body'
                placeholder='Add your reference here...'></textarea>
                <button className='submit-note' type='submit'>Add Note</button>
            </form>
        </div>
    )
}

export default ReferenceForm;
