import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import AppCard from "../AppCard"
import "./AppDisplayColumn.css"
function AppDisplayColumn({status, applications,user}){
    return(
        <div className="app-column-container">
            <div>Most Recent {status}</div>

            {applications.map((el,i)=>(
                <AppCard key={i} status={status} application={el} user={user}/>
            ))}

        </div>
    )
}
export default AppDisplayColumn;
