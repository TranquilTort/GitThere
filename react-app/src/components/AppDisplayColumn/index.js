import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import AppCard from "../AppCard"
import "./AppDisplayColumn.css"
function AppDisplayColumn(){
    return(
        <div className="app-column-container">
            eyo app display column
            <AppCard />
        </div>
    )
}
export default AppDisplayColumn;
