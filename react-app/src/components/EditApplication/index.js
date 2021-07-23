import { useDispatch,useSelector } from 'react-redux';
import React, { useState, useEffect,useContext } from "react";

import {Link,useHistory } from "react-router-dom"
import {edit_application} from "../../store/application.js"
import {authenticate} from "../../store/session.js"
import {ColorContext} from "../../context/ColorContext"
function EditApplication ({ setShowEditModal,editStates,setShowAppModal,setAppId,setAppDisplayStatus}){
    const dispatch = useDispatch();
    let history = useHistory ();
    const {colors} =useContext(ColorContext);

    let sessionUser = useSelector(state => state.session.user);
    if(!sessionUser){
        console.log("user null")
        dispatch(authenticate());
    }
    sessionUser = useSelector(state => state.session.user);
    console.log('USERRRRRR',sessionUser)
    const [submitType, setSubmitType] = useState(1);
    const [priority, setPriority] = useState(false);
    const [showError, setShowError] = useState(false);
    //submit types: 1 return to home page
    //2: go to new app's page and
    //3: add anouther application (new form)
    const priorityCheck = (e)=>{
        priority ? setPriority(false): setPriority(true);
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        setShowError(false);
        const dataArr = await dispatch(edit_application(editStates.editId, editStates.editStatus,sessionUser.id, editStates.editUrl,editStates.editCompany,editStates.editJobTitle,editStates.editDescription,editStates.editAddress,priority))
        console.log("RETURNED APP ID",dataArr[0])
        const appId = dataArr[0]
        console.log("submitType",submitType)
        if(!appId){
            setShowError(true);
            return ;
        }
        if(submitType === 1){
            console.log("go home")
            setShowEditModal(false)
        }else{
            setShowEditModal(false);
            setAppId(dataArr[0])
            setAppDisplayStatus(dataArr[1])
            setShowAppModal(true)
        }
    }
    return(
        <div className='create-app-form-container'>
            <form
            className='create-app-form'
            onSubmit={handleSubmit}
            >
                <div className='create-app-form-line'>
                    <label
                    style={{color:`${colors[0].mainFontColor}`}}
                    >Job Title:</label>
                    <input
                        className='create-app-ele'
                        type='text-box'
                        onChange={e=>editStates.setEditJobTitle(e.target.value)}
                        value = {editStates.editJobTitle}
                        name="job_title"
                        required
                        autocomplete= "off"
                    ></input>

                </div>
                <div className='create-app-form-line'>
                    <label
                    style={{color:`${colors[0].mainFontColor}`}}
                    >Company Name:</label>
                    <input
                        className='create-app-ele'
                        type='text'
                        onChange={e=>editStates.setEditCompany(e.target.value)}
                        value = {editStates.editCompany}
                        name="company"
                        required
                        autocomplete= "off"
                    ></input>
                </div>
                <div className='create-app-form-line'>
                    <label
                    style={{color:`${colors[0].mainFontColor}`}}
                    >Link: </label>
                    <input
                        className='create-app-ele'
                        type='text'
                        onChange={e=>editStates.setEditUrl(e.target.value)}
                        value = {editStates.editUrl}
                        name="url_link"
                        autocomplete= "off"
                        required
                    ></input>
                </div>
                <div className='create-app-form-line'>
                    <label style={{color:`${colors[0].mainFontColor}`}}>Job Description:</label>
                    <textarea
                        className='create-app-ele'
                        onChange={e=>editStates.setEditDescription(e.target.value)}
                        value = {editStates.editDescription}
                        name="job_description"
                        autocomplete= "off"
                    >
                    </textarea>

                </div>
                <div className='create-app-form-line'>
                    <label style={{color:`${colors[0].mainFontColor}`}}>Address:</label>
                    <input
                        className='create-app-ele'
                        onChange={e=>editStates.setEditAddress(e.target.value)}
                        value = {editStates.editAddress}
                        name='address'
                        autocomplete= "off"
                    >
                    </input>
                </div>
                <div className='create-app-form-line'>
                    <label style={{color:`${colors[0].mainFontColor}`}} >Application Stage:</label>
                    <select className="app-status-select create-app-ele"
                        onChange={e=>editStates.setEditStatus(e.target.value)}
                        value={editStates.editStatus}
                    >
                        {editStates.editStatus===1 ? <option selected value={1}>Staging</option>:<option  value={1}>Staging</option>}
                        {editStates.editStatus===2 ? <option selected value={2}>Applied</option>:<option  value={2}>Applied</option>}
                        {editStates.editStatus===3 ? <option selected value={3}>In Contact</option>:<option  value={3}>In Contact</option>}
                        {editStates.editStatus===4 ? <option selected value={4}>Interviewing</option>:<option  value={4}>Interviewing</option>}
                    </select>

                </div>
                {/* <label>Is this application a priority?</label>
                <input type="checkbox" value={priority} onChange={priorityCheck}></input> */}
                <div className="submission-btn-group">
                    <button className="submission-app-btn" onClick={e=>setSubmitType(1)} type="submit" >Submit</button>
                    <button className="submission-app-btn" onClick={e=>setSubmitType(2)} type="submit" >Go Back to App</button>
                </div>
                {showError && <div className="Error Message"> THERE WAS AN ERROR IN FORM SUBMISSION</div>}
            </form>
        </div>
    )
}
export default EditApplication;
