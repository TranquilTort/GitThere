import { useDispatch,useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import NotesForm from "../NotesForm"
import NoteDisplay from "../NoteDisplay"
import {get_one_application} from "../../store/application"
import {get_all_notes} from "../../store/note"
function Application(){
    const { appId } = useParams();
    const [pageLoaded, setPageLoaded] = useState(false);

    const [file,setFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [useDefault, setUseDefault] = useState(false);
    const [showNotesForm, setShowNotesForm] = useState(false);
    const dispatch = useDispatch();
    useEffect (async ()=>{
        await dispatch(get_one_application(appId))
        await dispatch(get_all_notes(appId))
    },[])
    let application = useSelector(state => state.application.one_application);
    let notes = useSelector(state => state.note.notes);
    useEffect (() => {

    },[notes])
    console.log("ALL NOTES:", notes)
    const handleFileSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("resume",file)
        setFileLoading(true);

        const res = await fetch(`/api/application/resume/add/${appId}/resume`, {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setFileLoading(false);
        }
        else {
            setFileLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }



    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }
    const toggleForm=() =>{
        if (showNotesForm){
            setShowNotesForm(false);
        }else{
            setShowNotesForm(true);
        }
    }
    return (<div>
        {application.job_title}
        <form onSubmit={handleFileSubmit}>
            <label>Upload the Resume You applied with</label>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={updateFile}
            />
            {/* <input type='checkbox' value={useDefault} onChange={e=>setUseDefault(e.target.checked)}>Use your Default Resume</input> */}
            <button type="submit">Upload</button>
            {(fileLoading)&& <p>Loading...</p>}
        </form>

        <button onClick={toggleForm} className="toggle-notes-btn">Add a note</button>
        {showNotesForm && <NotesForm toggleForm={toggleForm} appId={appId} />}
        {notes && notes.length > 0 && notes.map((note,index)=>(
            <NoteDisplay note={note} key={index} />
        ))}
    </div>)
}

export default Application;

//reference: https://hackmd.io/@jpshafto/SyWY45KGu
