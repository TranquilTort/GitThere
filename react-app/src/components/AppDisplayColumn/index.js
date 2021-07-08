import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import AppCard from "../AppCard"
import "./AppDisplayColumn.css"
function AppDisplayColumn({status, applications,user}){
    let statusMessage= "status";
    if(status === 1){
        statusMessage = "Application Staging"
    }else if(status ===2 ){
        statusMessage = "Applied"
    }else if(status ===3){
        statusMessage = "Heard Back"
    }else {
        statusMessage = "Interviewing"
    }
    return(
        <div className="app-column-container">
            <div className="status-message">{statusMessage}</div>

            {applications.map((el,i)=>(
                <AppCard key={i} status={status} application={el} user={user}/>
            ))}

        </div>
    )
}
export default AppDisplayColumn;
