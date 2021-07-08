import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import {moveStatus} from "../../store/application.js"
import "./AppCard.css"
function AppCard({application,status,user}){
    let dispatch = useDispatch();
    let style = '#E6FFFF'
    if(status == 1 ){
         style ='#13FFFD'
    }
    const moveUp = (e)=>{
        dispatch(moveStatus(status+1,application.id,user))
    }
    return(
        <div className="app-card-container" style={{backgroundColor:`${style}`}}>
            <div className="app-card-content">
                <div className="app-card-company-container">
                    <Link to={`/application/${application.id}`} className="app-card-link">{application.company}</Link>

                </div>
                <div className="app-card-ob-title">

                {application.job_title}
                </div>
                <div className="app-card-date">
                    {application.updated_at? application.updated_at: application.created_at}
                </div>
                <div >
                    <a className="app-card-posting-link" href={`${application.url_link}`} target= "_blank">Go To Site</a>
                </div>
            </div>
            <button style={{backgroundColor:`${style}`}} className="scroll-button"onClick={(e)=>{moveUp(status,application.id)}}>
                        <div className="fas fa-angle-right chevron-right"></div>
                    </button>

        </div>
    )
}
export default AppCard;
