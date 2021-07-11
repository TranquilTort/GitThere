import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import AppDisplayColumn from "../AppDisplayColumn"
import Application from "../Application"
import {authenticate} from "../../store/session.js"
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

    //colorPicker (offset by one so that status can still start at one)
    const colors = [[],{light: '#DEA4A4',dark:"#BF4444"},{light: '#E5AB7E',dark:"#E5853C"},{light: '#E9E9B4',dark:"#E5E570"},{light: '#B5E3B7',dark:"#72B774"}]

    const sessionUser = useSelector(state => state.session.user);
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
    <div className="home-container">
        {showAppModal && (
        <Modal onClose={() => setShowAppModal(false)}>
          <Application colors={colors} appId={appId} setShowAppModal={setShowAppModal} setShowEditModal={setShowEditModal} setAppDisplayStatus={setAppDisplayStatus} appDisplayStatus={appDisplayStatus}  editStates={editStates}/>
        </Modal>
        )}


        <div className="home-header">
            <div className="header-text">APPLICATION DASHBOARD: <CreateApplicationModal showModal={showModal} setShowAppModal={setShowAppModal} setShowModal={setShowModal} setAppId={setAppId} setAppDisplayStatus={setAppDisplayStatus}/></div>
        <EditApplicationModal setShowEditModal={setShowEditModal} showEditModal={showEditModal} editStates={editStates}/>
        </div>
        {noApps && <Link to="/create_app"> Add Application</Link>}
        <div className="app-display-container">
           <AppDisplayColumn key={1} colors={colors} status={1} handleAppSelection={handleAppSelection} applications={staging_apps} user={sessionUser.id}/>
           <AppDisplayColumn key={2} colors={colors} status={2} handleAppSelection={handleAppSelection} applications={applied_apps} user={sessionUser.id}/>
           <AppDisplayColumn key={3} colors={colors} status={3} handleAppSelection={handleAppSelection} applications={in_contact_apps} user={sessionUser.id}/>
           <AppDisplayColumn key={4} colors={colors} status={4} handleAppSelection={handleAppSelection} applications={interviewing_apps} user={sessionUser.id}/>
        </div>
    </div>)
}
export default Home;
