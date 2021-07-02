import { useDispatch,useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import {add_one_application} from "../../store/application.js"
import "./CreateApplication.css"
function CreateApplication (){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [url , setUrl] = useState('');
    const [company , setCompany] = useState('');
    const[jobTitle , setJobTitle] = useState('');
    const [description , setDescription] = useState('');
    const[address , setAddress] = useState('');
    const [submitType, setSubmitType] = useState(1);
    //submit types: 1 return to home page
    //2: go to new app's page and
    //3: add anouther application (new form)
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(add_one_application({ applicant:sessionUser.id, url_link:url,company,job_title:jobTitle,job_description:description,address}))
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
                <button onClick={e=>setSubmitType(1)}type="submit" >Submit and go Home</button>
                <button onClick={e=>setSubmitType(2)}type="submit" >Submit and go to App Info</button>
                <button onClick={e=>setSubmitType(3)} type="submit" >Submit and Add Anouther</button>
            </form>
        </div>
    )
}
export default CreateApplication;
