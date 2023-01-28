import React, { useState, useEffect,useContext} from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import AppCard from "../AppCard"
import {ColorContext} from "../../context/ColorContext"
import "./AppDisplayColumn.css"
function AppDisplayColumn({status, applications,user,handleAppSelection}){
    const {colors} = useContext(ColorContext);
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
        let count = 50;
        const interval= setInterval(function(){
            scrollCol.scrollTop += (5*direction);
            count --;
            if(count == 0){
                clearInterval(interval)
            }
        }, 20)
    }

    //priority sorting
    let priorityIndexArray = [];
    let nonPriorityIndexArray = [];
    for(let i=0; i<applications.length;i++){
        if(applications[i].priority === true){
            priorityIndexArray.push(i);
        }
        else{
            nonPriorityIndexArray.push(i);
        }
    }
    let sortedApplicationArray = [];
    let priorityCount = 0;
    let nonPriorityCount = 0;
    const priorityArrLen = priorityIndexArray.length;
    const nonPriorityArrLen = nonPriorityIndexArray.length;
    while(priorityCount < priorityArrLen){
        sortedApplicationArray.push(applications[priorityIndexArray[priorityCount]]);
        priorityCount++;
    }
    while(nonPriorityCount < nonPriorityArrLen){
        sortedApplicationArray.push(applications[nonPriorityIndexArray[nonPriorityCount]]);
        nonPriorityCount++;
    }

    return(
        <div className="app-column-container">
        <div className="status-message"
            style={{color:`${colors[0].mainFontColor}`}}
        >{statusMessage}</div>
        <div className="column-info"
        style={{color:`${colors[0].secondaryFontColor}`}}>
            <div className="col-count">
                <div>
                    Today:
                </div>
                <div>
                    {lastDayCount}
                </div>

            </div>
            <div className="col-count">
                <div>
                    Total:
                </div>
                <div>
                    {applications.length}
                </div>
            </div>
        </div>
        {/* <div
            id={`scroll-button-up-${status}`}
            style={{
                backgroundColor:colors[status].dark,
                boxShadow:'rgba(0, 0, 0, 0.66) 0px 0px 4px',
                color:`${colors[0].mainFontColor}`
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
        ><i className="fas fa-angle-double-up chevy"></i></div> */}
        <div style={{backgroundColor:`${colors[status].dark}`}} className="app-column" id={`app-column-${status}`}>

            {sortedApplicationArray.map((el,i)=>(
                <AppCard key={i} colors={colors} status={status} application={el} user={user} handleAppSelection={handleAppSelection}/>
            ))}
        </div>
            {/* <div  className={`scroll-down-btn`}
            style={{
                backgroundColor:colors[status].dark,
                boxShadow:'rgba(0, 0, 0, 0.66) 0px 0px 4px',
                color:`${colors[0].mainFontColor}`
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
            ><i className="fas fa-angle-double-down"></i></div> */}
        </div>
    )
}
export default AppDisplayColumn;
