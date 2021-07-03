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
                {application.job_title}
                <button onClick={(e)=>{moveUp(status,application.id)}}>Next Stage</button>
            </div>

        </div>
    )
}
export default AppCard;
