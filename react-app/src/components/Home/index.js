import React, { useState, useEffect,useContext } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"

import {ColorContext} from "../../context/ColorContext"
import AppDisplayColumn from "../AppDisplayColumn"
import Application from "../Application"
import {authenticate, setGoal} from "../../store/session.js"
import {get_all_applications} from "../../store/application.js"
import { Modal } from '../Modal';
import CreateApplicationModal from"../CreateApplicationModal"
import EditApplicationModal from"../EditApplicationModal"
import "./Home.css"

function Home(){
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [appId, setAppId] = useState(null);
    const [noApps, setNoApps] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAppModal, setShowAppModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showGoalForm, setShowGoalForm] = useState(false);
    const [goalApps, setGoalApps] = useState();
    const [appDisplayStatus, setAppDisplayStatus] = useState(1);

    //edit application state variables
    const [editUrl, setEditUrl] = useState('');
    const [editCompany, setEditCompany] = useState('');
    const [editJobTitle, setEditJobTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editStatus, setEditStatus] = useState(1);
    const [editId, setEditId] = useState(null);
    const editStates = {editId, setEditId,editUrl,setEditUrl,editCompany,setEditCompany,editJobTitle,setEditJobTitle,editDescription,setEditDescription,editAddress,setEditAddress,editStatus,setEditStatus }
    //add in color state here
    //dark mode toggle can change the colors
    //need search functionality on the columns
    //colors arr needs to have background and font colors too
    const {colors} = useContext(ColorContext);

    console.log("ALLL THE COLORS:", colors)
    //colorPicker (offset by one so that status can still start at one)
    // const colors = [[],{light: '#DEA4A4',dark:"#BF4444"},{light: '#E5AB7E',dark:"#E5853C"},{light: '#E9E9B4',dark:"#E5E570"},{light: '#B5E3B7',dark:"#72B774"}]

    const sessionUser = useSelector(state => state.session.user);
    console.log("USER RIGHT HERE",sessionUser)
    if(!sessionUser){
        console.log("user null")
        dispatch(authenticate());
    }
    useEffect(async () => {
        if(sessionUser !=null){
            const areThereApps = await dispatch(get_all_applications(sessionUser.id))
            if(!areThereApps){
                setNoApps(true)
            }
            setLoaded(true)
        }
    },[sessionUser,showModal,showAppModal,showEditModal])

    const staging_apps = useSelector(state => state.application.staging_apps)
    const applied_apps = useSelector(state => state.application.applied_apps)
    const in_contact_apps = useSelector(state => state.application.in_contact_apps)
    const interviewing_apps = useSelector(state => state.application.interviewing_apps)
    let goalProgress=0;
    let appliedWeekly=0;
    let date = new Date();
    date.setDate(date.getDate()-7)
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    applied_apps.forEach(el=>{
        console.log("DATE CALCULATIONS")
        let month = el.updated_at.substring(0,2)
        let day = el.updated_at.substring(3,5)
        let year = el.updated_at.substring(6,10)
        if(!(year < yyyy)){
            if(year > yyyy){
                appliedWeekly ++;
            }else if(dd < day && mm == month){
                appliedWeekly ++;
            }else if(mm < month){
                appliedWeekly ++;
            }
        }
    })
    function handleAppSelection(appId,status){
        setAppId(appId)
        setAppDisplayStatus(status)
        setShowAppModal(true)
    }
    if(!loaded){
        return null;
    }
    console.log('ALL in contact',in_contact_apps)
    if(sessionUser === null){
        return (
            <div className="no-auth-home">
                There is no auth here
            </div>
        )
    }
    return (
    <div className="home-container"
        style={{backgroundColor:`${colors[0].background}`}}
    >
        {showAppModal && (
        <Modal onClose={() => setShowAppModal(false)}>
          <Application colors={colors} appId={appId} setShowAppModal={setShowAppModal} setShowEditModal={setShowEditModal} setAppDisplayStatus={setAppDisplayStatus} appDisplayStatus={appDisplayStatus}  editStates={editStates}/>
        </Modal>
        )}


        <div className="home-header">
            <div className="header-text"
                style={{color:`${colors[0].mainFontColor}`}}
            >
                APPLICATION DASHBOARD: <CreateApplicationModal colors={colors} showModal={showModal} setShowAppModal={setShowAppModal} setShowModal={setShowModal} setAppId={setAppId} setAppDisplayStatus={setAppDisplayStatus}/>
            </div>
        <EditApplicationModal setShowEditModal={setShowEditModal} showEditModal={showEditModal} editStates={editStates}/>
            {sessionUser.apply_weekly_goal? <div className="goal-message" style={{color:`${colors[0].secondaryFontColor}`}}>Applications this week: {appliedWeekly}/{sessionUser.apply_weekly_goal}</div>: <div className="goal-message">Click here to set a weekly Goal: </div>}
            <button
                onClick={e=>{showGoalForm?setShowGoalForm(false):setShowGoalForm(true)}}
                className="show-app-goal-form"
                style={{color:`${colors[0].background}`, backgroundColor:`${colors[0].mainFontColor}`}}

            >Set a Goal!</button>
            {showGoalForm &&
            <form className='app-goal-form'
            onSubmit={e=>{
                e.preventDefault();
                dispatch(setGoal(sessionUser.id,goalApps))
                setShowGoalForm(false)
                }}>
                <input type="number"
                className='goal-input'
                    value={goalApps}
                    onChange={e=>{
                        if(e.target.value > 0){
                            setGoalApps(e.target.value)
                        }}
                    }
                />
                <button type="submit"
            className='show-app-goal-form'
            style={{color:`${colors[0].background}`, backgroundColor:`${colors[0].mainFontColor}`}}
                >Add Goal</button>
            </form>}
        </div>
        <div className="app-display-container">
           <AppDisplayColumn key={1} colors={colors} status={1} handleAppSelection={handleAppSelection} applications={staging_apps} user={sessionUser.id}/>
           <AppDisplayColumn key={2} colors={colors} status={2} handleAppSelection={handleAppSelection} applications={applied_apps} user={sessionUser.id}/>
           <AppDisplayColumn key={3} colors={colors} status={3} handleAppSelection={handleAppSelection} applications={in_contact_apps} user={sessionUser.id}/>
           <AppDisplayColumn key={4} colors={colors} status={4} handleAppSelection={handleAppSelection} applications={interviewing_apps} user={sessionUser.id}/>
        </div>
    </div>)
}
export default Home;
