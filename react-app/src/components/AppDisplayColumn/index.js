import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import AppCard from "../AppCard"
import "./AppDisplayColumn.css"
function AppDisplayColumn({status, applications,user}){
    let statusMessage= "status";
    let colColor = "#fff"
    if(status === 1){
        statusMessage = "APPLICATION STAGING"
        colColor="#BF4444"
    }else if(status ===2 ){
        statusMessage = "APPLIED"
        colColor="#E5853C"
    }else if(status ===3){
        statusMessage = "IN CONTACT"
        colColor="#E5E570"
    }else {
        statusMessage = "INTERVIEWING"
        colColor="#72B774"
    }
    return(
        <div className="app-column-container">
        <div className="status-message">{statusMessage}</div>
        <div
            id={`scroll-button-up-${status}`}
            style={{display:'none'}}
            className={`scroll-up-btn scroll-class-${status}`}
            onClick={(e)=>{

                console.log("hi from onClick")
            }}
        ><i class="fas fa-angle-double-up"></i></div>
        <div style={{backgroundColor:`${colColor}`}} className="app-column" id={`app-column-${status}`}>

            {applications.map((el,i)=>(
                <AppCard key={i} status={status} application={el} user={user}/>
            ))}
        </div>
            <div  className={`scroll-down-btn scroll-class-${status}`}
            onClick={(e)=>{
                console.log("hi from onClick")
                let scrollCol = document.getElementById(`app-column-${status}`)
                let scrollAmount = scrollCol.scrollTop -= 30;
                if (scrollAmount > 0) {
                    document.getElementById(`scroll-button-up-${status}`).style.display ="flex"
                }
            }}
            ><i class="fas fa-angle-double-down"></i></div>
        </div>
    )
}
export default AppDisplayColumn;
