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
    const [fileType, setFileType] = useState("resume");
    const [file,setFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [showNotesForm, setShowNotesForm] = useState(false);
    const dispatch = useDispatch();
    useEffect (async ()=>{
        await dispatch(get_one_application(appId))
        await dispatch(get_all_notes(appId))
        dispatch(authenticate());
    },[fileLoading])
    let application = useSelector(state => state.application.one_application);
    let notes = useSelector(state => state.note.notes);
    let user = useSelector(state => state.session.user);
    console.log('THE CURRENT APPLICATION',application)
    useEffect (() => {

    },[notes,fileLoading])
    console.log("ALL NOTES:", notes)
    const handleFileSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(fileType,file)
        setFileLoading(true);

        const res = await fetch(`/api/application/document/add/${appId}/${fileType}`, {
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
    function handleFileDownload(awsUrl) {
        console.log('INSIDE HANDLE DOWNLOAD',awsUrl)
    }
    return (
    <div className="app-page-container">
        <div className="app-info-container">
            <div className="app-job-name">
                {application.company}
            </div>
            <div className="app-job-title">
                {application.job_title}
                <a  className="app-job-link" href={`${application.url_link}`} target="_blank">Go To Link</a>
            </div>
            <div className="app-status">
                Status: <select className="app-status-select" onChange={e=>dispatch(moveStatus(e.target.value,application.id,user.id))}>
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
                <button className="edit-app-btn">Edit Application Info</button>
                <button className="delete-app-btn" onClick={handleDelete}>Remove Application</button>
            </div>
            <div className="app-decription-label">
            Description:
            </div>
            <div className="app-description">
                {application.job_description}
            </div>

        </div>
        {/* reference: https://hackmd.io/@jpshafto/SyWY45KGu */}
        <div className="file-download-container">
            <div>
                Your files here:
            </div>
            <div>
                {application.resume? <div>Your resume has been uploaded: <button onClick={e=>handleFileDownload(application.resume)} >Download Resume</button> </div>: "No resume uploaded"}
            </div>
            <div>
                {application.cover_letter? <div>Your Cover Letter Has been uploaded <button onClick={e=>handleFileDownload(application.cover_letter)} >Download Cover Letter</button> </div>: "No cover letter uploaded"}
            </div>
            <div>
                {application.cv?<div>Your CV has been uploaded <button onClick={e=>handleFileDownload(application.cv)} >Download CV</button> </div>: "No cv uploaded"}
            </div>
        </div>
        <form className="file-upload-form" onSubmit={handleFileSubmit}>
            <label>Upload Documents</label>
            <select value={fileType}className="file-type-select" onChange={e=>{setFileType(e.target.value)}}>
                <option value='resume'>Resume</option>
                <option value='cv'>CV</option>
                <option value='cover_letter'>Cover Letter</option>
            </select>
            <input
              className = 'upload-selection'
              type="file"
              accept=".pdf,.docx"
              onChange={updateFile}
            />

            <button className='upload-file-btn' type="submit">Upload</button>
            {(fileLoading)&& <p>Loading...</p>}
        </form>
        {showNotesForm ?<button style={{backgroundColor:'#F6E0ED'}} onClick={toggleForm} className="toggle-notes-btn">Add a note</button> :<button style={{backgroundColor:'#d8d9db'}} onClick={toggleForm} className="toggle-notes-btn">Add a note</button> }
        {showNotesForm && <NotesForm toggleForm={toggleForm} appId={appId} />}
        {notes  && !notes.error && notes[0]!=='none' && notes.map((note,index)=>(
            <NoteDisplay note={note} key={index} />
        ))}
    </div>)
}

export default Application;
