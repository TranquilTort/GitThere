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
        <div style={{backgroundColor:`${colColor}`}} className="app-column-container">
            <div className="status-message">{statusMessage}</div>

            {applications.map((el,i)=>(
                <AppCard key={i} status={status} application={el} user={user}/>
            ))}

        </div>
    )
}
export default AppDisplayColumn;
