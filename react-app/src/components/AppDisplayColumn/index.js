import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import AppCard from "../AppCard"
import "./AppDisplayColumn.css"
function AppDisplayColumn({status, applications,user,handleAppSelection}){
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
    let lastDayCount = 0;
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    console.log(today)
    applications.forEach(el=>{
        if(el.updated_at.substring(0,10) === today ){
            lastDayCount ++;
        }
    })

    function scrollColumn(scrollCol, direction){
        console.log("hi from onClick")
        scrollCol.scrollTop += (60*direction);
    }

    return(
        <div className="app-column-container">
        <div className="status-message">{statusMessage}</div>
        <div className="column-info">Total: {applications.length} Today:{lastDayCount}</div>
        <div
            id={`scroll-button-up-${status}`}
            // style={{display:'none'}}
            className={`scroll-up-btn scroll-class-${status}`}
            onClick={(e)=>{
                let scrollCol = document.getElementById(`app-column-${status}`)
                scrollColumn(scrollCol,-1)
            }}
        ><i class="fas fa-angle-double-up"></i></div>
        <div style={{backgroundColor:`${colColor}`}} className="app-column" id={`app-column-${status}`}>

            {applications.map((el,i)=>(
                <AppCard key={i} status={status} application={el} user={user} handleAppSelection={handleAppSelection}/>
            ))}
        </div>
            <div  className={`scroll-down-btn scroll-class-${status}`}
            onClick={(e)=>{
                let scrollCol = document.getElementById(`app-column-${status}`)
                scrollColumn(scrollCol,1)
            }}
            // add animation and smart hiding
            ><i class="fas fa-angle-double-down"></i></div>
        </div>
    )
}
export default AppDisplayColumn;
