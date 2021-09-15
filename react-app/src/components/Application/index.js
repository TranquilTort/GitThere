import { useDispatch,useSelector } from 'react-redux';
import React, { useState, useEffect,useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import NotesForm from "../NotesForm"
import NoteDisplay from "../NoteDisplay"
import ReferenceForm from "../ReferenceForm"
import ReferenceDisplay from "../ReferenceDisplay"
import {get_one_application,moveStatus,deleteApp} from "../../store/application"
import {get_all_notes} from "../../store/note"
import {get_all_refs} from "../../store/reference"
import {authenticate} from "../../store/session.js"
import {ColorContext} from "../../context/ColorContext"
import "./Application.css"
function Application({appId, appDisplayStatus, setAppDisplayStatus,setShowAppModal,setShowEditModal, editStates}){
    const {colors} = useContext(ColorContext);

    const [newInfo, setNewInfo] = useState(1);
    const [coverLetter,setCoverLetter] = useState(null);
    const [cv,setCV] = useState(null);
    const [resume,setResume] = useState(null);
    const [fileLoading, setFileLoading] = useState(false);
    const [showNotesForm, setShowNotesForm] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [showRefDisplay, setShowRefDisplay] = useState(false);

    //references state
    const [refTitle,setRefTitle] = useState('');
    const [refBody, setRefBody] = useState('');

    const dispatch = useDispatch();
    let application = useSelector(state => state.application.one_application);
    let notes = useSelector(state => state.note.notes);
    let refs = useSelector(state => state.reference.references);
    let user = useSelector(state => state.session.user);

    console.log("ALL REFS REACT", refs)


    useEffect (async ()=>{
        await dispatch(get_one_application(appId))
        await dispatch(get_all_notes(appId))
        await dispatch(get_all_refs());
        await dispatch(authenticate());
    },[fileLoading,showNotesForm,newInfo,appDisplayStatus])

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
    const toggleForm=() =>{
        if (showNotesForm){
            setShowNotesForm(false);
        }else{
            setShowNotesForm(true);
        }
    }
    const handleDelete =async(e) => {
        const response = await dispatch(deleteApp(appId));
        setNewInfo(newInfo+1)
        setShowAppModal(false);
        console.log("DELETED RESPONSE",response);
    }
    const handleEdit = (e) =>{
        editStates.setEditUrl(application.url_link);
        editStates.setEditId(application.id);
        editStates.setEditCompany(application.company);
        editStates.setEditJobTitle(application.job_title);
        editStates.setEditDescription(application.description);
        editStates.setEditAddress(application.address);
        editStates.setEditStatus(appDisplayStatus)
        setShowAppModal(false);
        setShowEditModal(true)
    }

    return (
    <div className="app-page-container"  style={{backgroundColor:colors[appDisplayStatus].light, border:`3px solid${colors[appDisplayStatus].dark}`,boxShadow:`${colors[appDisplayStatus].dark} 0px 0px 8px`}}>
        <div className="app-info-container" >
            <a  className="app-job-link" href={`${application.url_link}`} target="_blank" alt="Job Application Link"
                style={{color:`${colors[0].mainFontColor}`}}
            >{application.company}</a>
            <div className="app-job-title"
            style={{color:`${colors[0].secondaryFontColor}`}}
            >

                {application.job_title}
            </div>
            <div className="app-edit-span"
                style={{color:`${colors[0].mainFontColor}`}}
            >
                Status: &nbsp; &nbsp;<select className="app-status-select"
                    onChange={e=>{
                        setAppDisplayStatus(e.target.value)
                        dispatch(moveStatus(e.target.value,application.id,user.id));
                        setNewInfo(newInfo+1)
                    }}
                    style={{backgroundColor:colors[appDisplayStatus].light,color:`${colors[0].mainFontColor}`}}
                    >
                    {application.status===1 ? <option selected value={1}>Staging</option>:<option  value={1}>Staging</option>}
                    {application.status===2 ? <option selected value={2}>Applied</option>:<option  value={2}>Applied</option>}
                    {application.status===3 ? <option selected value={3}>In Contact</option>:<option  value={3}>In Contact</option>}
                    {application.status===4 ? <option selected value={4}>Interviewing</option>:<option  value={4}>Interviewing</option>}
                </select>
                <button className="edit-app-btn" onClick={handleEdit}>Edit</button>
                <button className="delete-app-btn" onClick={handleDelete}>Delete</button>
            </div>
            <div className="app-updated-at"
                style={{color:`${colors[0].mainFontColor}`}}
            >
                Last updated: {application.updated_at}
            </div>
            <div className="app-decription-label"
                style={{color:`${colors[0].mainFontColor}`}}
            >
            Description:
            </div>
            <div className="app-description"
                style={{color:`${colors[0].mainFontColor}`}}
            >
                {application.job_description}
            </div>
            <div className="file-download-container">
            <div
                style={{color:`${colors[0].mainFontColor}`}}
            >
                Application Documents: {(fileLoading)&& <p>Loading...</p>}
            </div>
            <div className="file-download-component">
                {application.resume?
                <div style={{color:`${colors[0].mainFontColor}`}}>
                    Download Resume: &nbsp;
                                    <a href={application.resume}
                                        className="delete-app-btn"
                                        target="_blank">
                                            <i className="fa fa-download" aria-hidden="true">
                                            </i>
                                    </a>
                                    
                </div>:
                    <form className="file-upload-form" onSubmit={e =>{
                        e.preventDefault();
                        handleFileSubmit('resume')
                        }}>
                        <label style={{color:`${colors[0].mainFontColor}`}}>Upload Resume:</label>
                        <label className='input-file-button'>
                            <input
                            className = 'upload-selection'
                            type="file"
                            accept=".pdf,.docx"
                            onChange={e=>{setResume(e.target.files[0])}}
                            />
                            <i className="fas fa-plus"
                                style={{color:`${colors[0].mainFontColor}`}}
                            ></i>
                        </label>
                        {resume&&
                        <button className='upload-file-btn' type="submit">Upload {resume.name}</button>
                        }
                    </form>
                }
            </div>
            <div className="file-download-component">
                {application.cv ?
                <div style={{color:`${colors[0].mainFontColor}`}}>
                    Download CV:

                    <button
                                    className="delete-app-btn"
                                    onClick={e=>handleFileDownload(application.cv)}>
                                        <i className="fa fa-download" aria-hidden="true">
                                        </i>
                                </button>
                </div>:
                    <form className="file-upload-form" onSubmit={e =>{
                        e.preventDefault();
                        handleFileSubmit('cv')
                        }}>
                        <label style={{color:`${colors[0].mainFontColor}`}}>Upload CV:</label>
                        <label className='input-file-button'>
                            <input
                            className = 'upload-selection'
                            type="file"
                            accept=".pdf,.docx"
                            onChange={e=>{setCV(e.target.files[0])}}
                            />
                            <i className="fas fa-plus"
                                style={{color:`${colors[0].mainFontColor}`}}
                            ></i>
                        </label>
                        {cv&&
                        <button className='upload-file-btn' type="submit">Upload {cv.name}</button>
                        }
                    </form>
                 }
            </div>
            <div className="file-download-component">
                {application.cover_letter?<div style={{color:`${colors[0].mainFontColor}`}}>Download Cover Letter: <button className="delete-app-btn" onClick={e=>handleFileDownload(application.cover_letter)}><i className="fa fa-download" aria-hidden="true"></i></button> </div>:
                    <form className="file-upload-form" onSubmit={e =>{
                        e.preventDefault();
                        handleFileSubmit('cover_letter')
                        }}>
                        <label style={{color:`${colors[0].mainFontColor}`}} >Upload Cover Letter:</label>
                        <label className='input-file-button'>
                            <input

                            className = 'upload-selection'
                            type="file"
                            accept=".pdf,.docx"
                            onChange={e=>{setCoverLetter(e.target.files[0])}}
                            />
                            <i className="fas fa-plus"
                                style={{color:`${colors[0].mainFontColor}`}}
                            ></i>
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
                }}className="note-selection"
                style={{borderTop:`2px solid ${colors[appDisplayStatus].dark}`,
                        borderLeft:`2px solid ${colors[appDisplayStatus].dark}`,
                        borderRight:`2px solid ${colors[appDisplayStatus].dark}`,
                        backgroundColor: colors[appDisplayStatus].dark,
                        color:`${colors[0].mainFontColor}`,
                    }}
                >
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
                    {showNotesForm ?<button style={{backgroundColor:colors[appDisplayStatus].light}} onClick={toggleForm} className="toggle-notes-btn">Add a Reference</button> :<button style={{backgroundColor:"#ece7ea"}} onClick={toggleForm} className="toggle-notes-btn">Add a Reference</button> }
                    {showNotesForm && <ReferenceForm toggleForm={toggleForm} refTitle={refTitle} setRefTitle={setRefTitle} refBody={refBody} setRefBody={setRefBody} userId={user.id} />}
                    {refs &&refs.length>0&& refs[0]!=='none' && refs.map((reference,index)=>(
                    <ReferenceDisplay reference={reference} key={index} newInfo={newInfo} setNewInfo={setNewInfo} setRefTitle={setRefTitle} setRefBody={setRefBody} setShowNotesForm={setShowNotesForm}/>
                ))}
                </div>
                :
                <div className="note-selection-display"
                    style={{borderBottom:`2px solid ${colors[appDisplayStatus].dark}`,
                        borderLeft:`2px solid ${colors[appDisplayStatus].dark}`,
                        borderRight:`2px solid ${colors[appDisplayStatus].dark}`,
                        borderTop:`2px solid ${colors[appDisplayStatus].dark}`,
                    }}
                >
                {showNotesForm ?<button style={{backgroundColor:colors[appDisplayStatus].light}} onClick={toggleForm} className="toggle-notes-btn">Add a note</button> :<button style={{backgroundColor:"#ece7ea"}} onClick={toggleForm} className="toggle-notes-btn">Add a note</button> }
                {showNotesForm && <NotesForm toggleForm={toggleForm} title={title} setTitle={setTitle} body={body} setBody={setBody} appId={appId} />}
                {notes  && !notes.error && notes[0]!=='none' && notes.map((note,index)=>(
                    <NoteDisplay note={note} key={index} newInfo={newInfo} setNewInfo={setNewInfo} setTitle={setTitle} setBody={setBody} setShowNotesForm={setShowNotesForm} appDisplayStatus={appDisplayStatus}/>
                ))}
             </div>
             }

         </div>
    </div>)
}

export default Application;
