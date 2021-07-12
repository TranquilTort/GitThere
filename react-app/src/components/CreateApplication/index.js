import { useDispatch,useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";

import {Link,useHistory } from "react-router-dom"
import {add_one_application} from "../../store/application.js"
import {authenticate} from "../../store/session.js"
import "./CreateApplication.css"
function CreateApplication ({showModal, setShowModal,setShowAppModal,setAppId,setAppDisplayStatus}){
    const dispatch = useDispatch();
    let history = useHistory ();

    let sessionUser = useSelector(state => state.session.user);
    if(!sessionUser){
        console.log("user null")
        dispatch(authenticate());
    }
    sessionUser = useSelector(state => state.session.user);

    console.log('USERRRRRR',sessionUser)

    const [url , setUrl] = useState('');
    const [company , setCompany] = useState('');
    const[jobTitle , setJobTitle] = useState('');
    const [description , setDescription] = useState('');
    const[address , setAddress] = useState('');
    const [submitType, setSubmitType] = useState(1);
    const [priority, setPriority] = useState(false);
    const [showError, setShowError] = useState(false);
    const [status, setStatus] = useState(1);
    //submit types: 1 return to home page
    //2: go to new app's page and
    //3: add anouther application (new form)
    const priorityCheck = (e)=>{
        priority ? setPriority(false): setPriority(true);
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        setShowError(false);
        let applicant = sessionUser.id
        let url_link = url;
        let job_title = jobTitle;
        let job_description = description
        console.log(applicant, url_link,company,job_title,job_description,address,priority)
        const dataArr = await dispatch(add_one_application( status,applicant, url_link,company,job_title,job_description,address,priority))
        console.log("RETURNED APP ID",dataArr[0])
        const appId = dataArr[0]
        console.log("submitType",submitType)
        if(!appId){
            setShowError(true);
            return ;
        }
        if(submitType === 1){
            console.log("go home")
            setShowModal(false)
        }else if(submitType === 2){
            setShowModal(false);
            setAppId(dataArr[0])
            setAppDisplayStatus(dataArr[1])
            setShowAppModal(true)
        }else {
            setUrl('');
            setCompany('');
            setJobTitle('');
            setDescription('');
            setAddress('');
            setStatus(1);
            setShowModal(false);
            setShowModal(true);
        }
    }
    return(
        <div className='create-app-form-container'>
            <form
            className='create-app-form'
            onSubmit={handleSubmit}
            >
                <label >Link</label>
                <input
                    className='create-app-url'
                    type='text'
                    onChange={e=>setUrl(e.target.value)}
                    value = {url}
                    name="url_link"
                    required
                ></input>
                <label>Company Name</label>
                <input
                    className='create-app-company'
                    type='text'
                    onChange={e=>setCompany(e.target.value)}
                    value = {company}
                    name="company"
                    required
                ></input>
                <label>Job Title</label>
                <input
                    className='create-app-job-title'
                    type='text-box'
                    onChange={e=>setJobTitle(e.target.value)}
                    value = {jobTitle}
                    name="job_title"
                    required
                ></input>
                <label>Job Description</label>
                <textarea
                    className='create-app-job-description'
                    onChange={e=>setDescription(e.target.value)}
                    value = {description}
                    name="job_description"
                >
                </textarea>
                <label>Address</label>
                <input
                    className='create-app-address'
                    onChange={e=>setAddress(e.target.value)}
                    value = {address}
                    name='address'
                >
                </input>
                <label>Application Stage</label>
                <select onChange={e=>setStatus(e.target.value)}>
                    <option selected value={1}>Staging</option>
                    <option  value={2}>Applied</option>
                    <option  value={3}>In Contact</option>
                    <option  value={4}>Interviewing</option>
                </select>
                {/* <label>Is this application a priority?</label>
                <input type="checkbox" value={priority} onChange={priorityCheck}></input> */}
                <div className="submission-btn-group">
                    <button className="submission-app-btn" onClick={e=>setSubmitType(1)}type="submit" >Submit</button>
                    <button className="submission-app-btn" onClick={e=>setSubmitType(2)}type="submit" >Add More Info</button>
                    <button className="submission-app-btn" onClick={e=>setSubmitType(3)} type="submit" >Add Another App</button>
                </div>
                {showError && <div className="Error Message"> THERE WAS AN ERROR IN FORM SUBMISSION</div>}
            </form>
        </div>
    )
}
export default CreateApplication;
