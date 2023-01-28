import React, { useState, useEffect,useContext } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import {moveStatus , changePriority} from "../../store/application.js"
import {ColorContext} from "../../context/ColorContext"
import "./AppCard.css"
function AppCard({application,status,user,handleAppSelection}){
    const {colors} = useContext(ColorContext);
    let dispatch = useDispatch();
    console.log("APP FROM CARD", application)

    const moveUp = (e)=>{
        dispatch(moveStatus(status+1,application.id,user))
    }

    const handlePriorityClick= (e)=>{
        dispatch(changePriority(application.id, user));
    }
    return(
        <div className="app-card-container" style={{backgroundColor:`${colors[status].light}`}}>

            <div className="app-card-content">
                {application.priority === true
                ?
                <div
                    onClick={handlePriorityClick}
                    className='fa fa-star card-priority'
                    style={{color:`${colors[0].mainFontColor}`}}
                >

                </div>
                :
                <div
                    onClick={handlePriorityClick}
                    className='far fa-star card-priority'
                    style={{color:`${colors[0].mainFontColor}`}}
                ></div>
                }

                <div className="app-card-company-container"
                    style={{color:`${colors[0].mainFontColor}`}}
                >
                    <div onClick={e=>handleAppSelection(application.id,status)} className="app-card-link">{application.company}</div>

                </div>
                <div className="app-card-job-title"
                    style={{color:`${colors[0].secondaryFontColor}`}}
                >
                    {application.job_title}
                </div>
                <div className="app-card-date"
                    style={{color:`${colors[0].secondaryFontColor}`}}
                >
                    {(status===1)? "Added: ": "Updated: "} {application.updated_at? application.updated_at: application.created_at}
                </div>
                <div >
                    <a className="app-card-posting-link" href={`${application.url_link}`} target= "_blank"
                    style={{color:`${colors[0].mainFontColor}`}}
                    >Go To Site</a>
                </div>
            </div>

            {(status<4)&&<button style={{backgroundColor:`${colors[status].light}`}} className="scroll-button"
                onClick={(e)=>{moveUp(status,application.id)}}
                onMouseEnter= {e=>{
                    e.target.style.background = colors[status].dark;
                    // e.target.firstElementChild.style.background = colors[status].dark;
                }}
                onMouseLeave = {e=>{
                    e.target.style.background = colors[status].light
                    // e.target.firstElementChild.style.background = colors[status].light;
                }}
                >
                    <div aria-hidden={false} className="fas fa-angle-right chevron-right"

                        onMouseEnter= {e=>{
                            e.target.style.background = "inherit"
                        }}
                        onMouseLeave = {e=>{
                            e.target.style.background = "inherit"
                        }}
                    ></div>
                </button>
            }

        </div>
    )
}
export default AppCard;
