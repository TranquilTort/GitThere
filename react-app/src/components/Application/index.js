import { useDispatch,useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import NotesForm from "../NotesForm"
import NoteDisplay from "../NoteDisplay"
import {get_one_application,moveStatus,deleteApp} from "../../store/application"
import {get_all_notes} from "../../store/note"
import {authenticate} from "../../store/session.js"
import "./Application.css"
function Application(){
    const { appId } = useParams();
    const history = useHistory();
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
        dispatch(authenticate());
    },[])
    let application = useSelector(state => state.application.one_application);
    let notes = useSelector(state => state.note.notes);
    let user = useSelector(state => state.session.user);
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
    const handleDelete =async(e) => {
        const response = await dispatch(deleteApp(appId));
        console.log("DELETED RESPONSE",response);
        if(response.success == 'deleted'){
            history.push('/')
        }
    }
    return (
    <div className="app-page-container">
        <div className="app-info-container">
            <div className="app-job-name">
                {application.company}
            </div>
            <div className="app-job-title">
                {application.job_title}
            </div>
            <div className="app-status">
                Status: <select onChange={e=>dispatch(moveStatus(e.target.value,application.id,user.id))}>
                    {application.status===1 ? <option selected value={1}>Staging</option>:<option  value={1}>Staging</option>}
                    {application.status===2 ? <option selected value={2}>Applied</option>:<option  value={2}>Applied</option>}
                    {application.status===3 ? <option selected value={3}>In Contact</option>:<option  value={3}>In Contact</option>}
                    {application.status===4 ? <option selected value={4}>Interviewing</option>:<option  value={4}>Interviewing</option>}
                </select>
            </div>
            <div className="app-updated-at">
                Last updated: {application.updated_at}
            </div>
            <div className="app-edit-btns-container">
                <button >Edit Application Info</button>

                <button onClick={handleDelete}>Remove Application</button>
            </div>


            <div className="app-decription-label">
            Description:
            </div>

            <div className="app-description">

                {application.job_description}
            </div>

        </div>
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
        {showNotesForm ?<button style={{backgroundColor:'#233043'}} onClick={toggleForm} className="toggle-notes-btn">Add a note</button> :<button style={{backgroundColor:'#F6E0ED'}} onClick={toggleForm} className="toggle-notes-btn">Add a note</button> }
        {showNotesForm && <NotesForm toggleForm={toggleForm} appId={appId} />}
        {notes  && !notes.error==="none" && notes.map((note,index)=>(
            <NoteDisplay note={note} key={index} />
        ))}
    </div>)
}

export default Application;

//reference: https://hackmd.io/@jpshafto/SyWY45KGu
