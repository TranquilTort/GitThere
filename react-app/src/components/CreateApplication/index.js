import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import "./CreateApplication.css"
function CreateApplication (){
    const [url , setUrl] = useState();
    const [company , setCompany] = useState();
    const[jobTitle , setJobTitle] = useState();
    const [description , setDescription] = useState();
    const[address , setAddress] = useState();
    return(
        <div className='create-app-form-container'>
            <form className='create-app-form'>
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
                onChange={e=>setCompanyName(e.target.value)}
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
                <button type="submit" >Submit and Add Anouther</button>
                <button type="submit" >Submit and Add Anouther</button>
            </form>
        </div>
    )
}
export default CreateApplication;
