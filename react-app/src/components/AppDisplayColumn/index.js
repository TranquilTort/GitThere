import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import AppCard from "../AppCard"
import "./AppDisplayColumn.css"
function AppDisplayColumn({status, applications,user,handleAppSelection,colors}){
    let statusMessage= "status";
    if(status === 1){
        statusMessage = "APPLICATION STAGING"
    }else if(status ===2 ){
        statusMessage = "APPLIED"
    }else if(status ===3){
        statusMessage = "IN CONTACT"
    }else {
        statusMessage = "INTERVIEWING"
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
        let count = 50;
        const interval= setInterval(function(){
            scrollCol.scrollTop += (5*direction);
            count --;
            if(count == 0){
                clearInterval(interval)
            }
        }, 20)
    }

    return(
        <div className="app-column-container">
        <div className="status-message">{statusMessage}</div>
        <div className="column-info">Total: {applications.length} Today:{lastDayCount}</div>
        <div
            id={`scroll-button-up-${status}`}
            style={{
                backgroundColor:colors[status].dark,
                boxShadow:'rgba(0, 0, 0, 0.66) 0px 0px 4px'
            }}
            onMouseEnter={e=>{
                e.target.style.backgroundColor = colors[status].light;
                e.target.style.boxShadow =`0px 0px 4px 4px ${colors[status].dark}`;
            }}
            onMouseLeave={e=>{
                e.target.style.backgroundColor = colors[status].dark;
                e.target.style.boxShadow ='rgba(0, 0, 0, 0.66) 0px 0px 4px'
            }}
            className={`scroll-up-btn`}
            onClick={(e)=>{
                let scrollCol = document.getElementById(`app-column-${status}`)
                scrollColumn(scrollCol,-1)
            }}
        ><i className="fas fa-angle-double-up chevy"></i></div>
        <div style={{backgroundColor:`${colors[status].dark}`}} className="app-column" id={`app-column-${status}`}>

            {applications.map((el,i)=>(
                <AppCard key={i} colors={colors} status={status} application={el} user={user} handleAppSelection={handleAppSelection}/>
            ))}
        </div>
            <div  className={`scroll-down-btn`}
            style={{
                backgroundColor:colors[status].dark,
                boxShadow:'rgba(0, 0, 0, 0.66) 0px 0px 4px'
            }}
            onMouseEnter={e=>{
                e.target.style.backgroundColor = colors[status].light;
                e.target.style.boxShadow =`0px 0px 4px 4px ${colors[status].dark}`;
            }}
            onMouseLeave={e=>{
                e.target.style.backgroundColor = colors[status].dark;
                e.target.style.boxShadow ='rgba(0, 0, 0, 0.66) 0px 0px 4px'
            }}
            onClick={(e)=>{
                let scrollCol = document.getElementById(`app-column-${status}`)
                scrollColumn(scrollCol,1)
            }}
            // add animation and smart hiding
            ><i className="fas fa-angle-double-down"></i></div>
        </div>
    )
}
export default AppDisplayColumn;
