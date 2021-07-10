import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import {moveStatus} from "../../store/application.js"
import "./AppCard.css"
function AppCard({application,status,user,handleAppSelection}){
    let dispatch = useDispatch();
    let style = '#E6FFFF'
    if(status == 1 ){
        style ='#DEA4A4'
    }else if(status == 2){
        style ='#E5AB7E'
    }else if(status == 3) {
        style ='#E9E9B4'
    }else{
        style ='#B5E3B7'
    }

    const moveUp = (e)=>{
        dispatch(moveStatus(status+1,application.id,user))
    }
    return(
        <div className="app-card-container" style={{backgroundColor:`${style}`}}>
            <div className="app-card-content">
                <div className="app-card-company-container">
                    <div onClick={e=>handleAppSelection(application.id,status)} className="app-card-link">{application.company}</div>
                    {/* <Link to={`/application/${application.id}`} className="app-card-link">{application.company}</Link> */}

                </div>
                <div className="app-card-ob-title">
                    {application.job_title}
                </div>
                <div className="app-card-date">
                    {(status===1)? "Added: ": "Updated: "} {application.updated_at? application.updated_at: application.created_at}
                </div>
                <div >
                    <a className="app-card-posting-link" href={`${application.url_link}`} target= "_blank">Go To Site</a>
                </div>
            </div>
            {(status<4)&&<button style={{backgroundColor:`${style}`}} className="scroll-button"onClick={(e)=>{moveUp(status,application.id)}}>
                        <div className="fas fa-angle-right chevron-right"></div>
                    </button>}

        </div>
    )
}
export default AppCard;
