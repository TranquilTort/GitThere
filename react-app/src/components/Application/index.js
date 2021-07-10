import { useDispatch,useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import NotesForm from "../NotesForm"
import NoteDisplay from "../NoteDisplay"
import {get_one_application,moveStatus,deleteApp} from "../../store/application"
import {get_all_notes} from "../../store/note"
import {authenticate} from "../../store/session.js"
import "./Application.css"
function Application({appId}){
    // const { appId } = useParams();
    const history = useHistory();
    const [fileType, setFileType] = useState("resume");
    const [newInfo, setNewInfo] = useState(1);
    const [coverLetter,setCoverLetter] = useState(null);
    const [cv,setCV] = useState(null);
    const [resume,setResume] = useState(null);
    const [fileLoading, setFileLoading] = useState(false);
    const [showNotesForm, setShowNotesForm] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [showRefDisplay, setShowRefDisplay] = useState(false);


    const dispatch = useDispatch();
    let application = useSelector(state => state.application.one_application);
    let notes = useSelector(state => state.note.notes);
    let user = useSelector(state => state.session.user);
    useEffect (async ()=>{
        await dispatch(get_one_application(appId))
        await dispatch(get_all_notes(appId))
        dispatch(authenticate());
    },[fileLoading,showNotesForm,newInfo])
    console.log('THE CURRENT APPLICATION',application)

    console.log("ALL NOTES:", notes)
    async function handleFileSubmit(fileType){

        const formData = new FormData();
        if(fileType === 'resume'){
            formData.append(fileType,resume)
        }else if(fileType === 'cv'){
            formData.append(fileType,cv)
        }else{
            formData.append(fileType,coverLetter)
        }
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

    // const updateFile = (e) => {
    //     const file = e.target.files[0];
    //     setFile(file);
    // }
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
                <a  className="app-job-link" href={`${application.url_link}`} target="_blank">Go To Site</a>
            </div>
            <div className="app-edit-span">
                Status: <select className="app-status-select" onChange={e=>{
                    dispatch(moveStatus(e.target.value,application.id,user.id));
                    setNewInfo(newInfo+1)
                    }}>
                    {application.status===1 ? <option selected value={1}>Staging</option>:<option  value={1}>Staging</option>}
                    {application.status===2 ? <option selected value={2}>Applied</option>:<option  value={2}>Applied</option>}
                    {application.status===3 ? <option selected value={3}>In Contact</option>:<option  value={3}>In Contact</option>}
                    {application.status===4 ? <option selected value={4}>Interviewing</option>:<option  value={4}>Interviewing</option>}
                </select>
                <button className="edit-app-btn">Edit</button>
                <button className="delete-app-btn" onClick={handleDelete}>Delete</button>
            </div>
            <div className="app-updated-at">
                Last updated: {application.updated_at}
            </div>
            <div className="app-decription-label">
            Description:
            </div>
            <div className="app-description">
                {application.job_description}
            </div>
            <div className="file-download-container">
            <div>
                Your files here: {(fileLoading)&& <p>Loading...</p>}
            </div>
            <div>
                {application.resume? <div>Your resume has been uploaded: <button onClick={e=>handleFileDownload(application.resume)} >Download Resume</button> </div>:
                    <form className="file-upload-form" onSubmit={e =>{
                        e.preventDefault();
                        handleFileSubmit('resume')
                        }}>
                        <label>Upload Resume</label>
                        <label className='input-file-button'>
                            <input
                            className = 'upload-selection'
                            type="file"
                            accept=".pdf,.docx"
                            onChange={e=>{setResume(e.target.files[0])}}
                            />
                            <i class="fas fa-plus"></i>
                        </label>
                        {resume&&
                        <button className='upload-file-btn' type="submit">Upload {resume.name}</button>
                        }
                    </form>
                }
            </div>
            <div>
                {application.cover_letter? <div>Your CV Has been uploaded <button onClick={e=>handleFileDownload(application.cv)} >Download CV</button> </div>:
                    <form className="file-upload-form" onSubmit={e =>{
                        e.preventDefault();
                        handleFileSubmit('cv')
                        }}>
                        <label>Upload CV</label>
                        <label className='input-file-button'>
                            <input
                            className = 'upload-selection'
                            type="file"
                            accept=".pdf,.docx"
                            onChange={e=>{setCV(e.target.files[0])}}
                            />
                            <i class="fas fa-plus"></i>
                        </label>
                        {cv&&
                        <button className='upload-file-btn' type="submit">Upload {cv.name}</button>
                        }
                    </form>
                 }
            </div>
            <div>
                {application.cv?<div>Your Cover Letter has been uploaded <button onClick={e=>handleFileDownload(application.cover_letter)}>Download CV</button> </div>:
                    <form className="file-upload-form" onSubmit={e =>{
                        e.preventDefault();
                        handleFileSubmit('cover_letter')
                        }}>
                        <label>Upload Cover Letter</label>
                        <label className='input-file-button'>
                            <input
                            className = 'upload-selection'
                            type="file"
                            accept=".pdf,.docx"
                            onChange={e=>{setCoverLetter(e.target.files[0])}}
                            />
                            <i class="fas fa-plus"></i>
                        </label>
                        {coverLetter&&
                        <button className='upload-file-btn' type="submit">Upload {coverLetter.name}</button>
                        }
                    </form>
                 }
            </div>
        </div>
        </div>
        {/* reference: https://hackmd.io/@jpshafto/SyWY45KGu */}
         <div className="notes-ref-container">
             <div className="note-ref-selection">
                 <div onClick={e=>{
                     e.preventDefault();
                     setShowRefDisplay(false)
                }}className="note-selection">
                    Notes
                 </div>
                 <div onClick={e=>{
                     e.preventDefault();
                     setShowRefDisplay(true)
                }}className="ref-selection">
                    References
                 </div>
             </div>
             {showRefDisplay
                ?
                <div className="ref-selection-display">
                    ref display placeholder
                </div>
                :
                <div className="note-selection-display">
                {showNotesForm ?<button style={{backgroundColor:'#F6E0ED'}} onClick={toggleForm} className="toggle-notes-btn">Add a note</button> :<button style={{backgroundColor:'#d8d9db'}} onClick={toggleForm} className="toggle-notes-btn">Add a note</button> }
                {showNotesForm && <NotesForm toggleForm={toggleForm} title={title} setTitle={setTitle} body={body} setBody={setBody} appId={appId} />}
                {notes  && !notes.error && notes[0]!=='none' && notes.map((note,index)=>(
                    <NoteDisplay note={note} key={index} newInfo={newInfo} setNewInfo={setNewInfo} setTitle={setTitle} setBody={setBody} setShowNotesForm={setShowNotesForm}/>
                ))}
             </div>
             }

         </div>
    </div>)
}

export default Application;
