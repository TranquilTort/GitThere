import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import AppDisplayColumn from "../AppDisplayColumn"
import {authenticate} from "../../store/session.js"
import {get_all_applications} from "../../store/application.js"
import CreateApplicationModal from"../CreateApplicationModal"
import "./Home.css"

function Home(){
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [noApps, setNoApps] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    console.log('USERRRRRR',sessionUser)
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
    },[sessionUser,showModal])

    const staging_apps = useSelector(state => state.application.staging_apps)
    const applied_apps = useSelector(state => state.application.applied_apps)
    const in_contact_apps = useSelector(state => state.application.in_contact_apps)
    const interviewing_apps = useSelector(state => state.application.interviewing_apps)

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
        <div className="home-header">
            <div className="header-text">APPLICATION DASHBOARD: <CreateApplicationModal showModal={showModal} setShowModal={setShowModal}/></div>
        </div>
        {noApps && <Link to="/create_app"> Add Application</Link>}
        <div className="app-display-container">
           <AppDisplayColumn key={1} status={1} applications={staging_apps} user={sessionUser.id}/>
           <AppDisplayColumn key={2} status={2} applications={applied_apps} user={sessionUser.id}/>
           <AppDisplayColumn key={3} status={3} applications={in_contact_apps} user={sessionUser.id}/>
           <AppDisplayColumn key={4} status={4} applications={interviewing_apps} user={sessionUser.id}/>
        </div>
    </div>)
}
export default Home;
