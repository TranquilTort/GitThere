import { useDispatch,useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import {get_one_application} from "../../store/application"
function Application(){
    const { appId } = useParams();

    const dispatch = useDispatch();
    useEffect (()=>{
        dispatch(get_one_application(appId))
    },[])
    let application = useSelector(state => state.application.one_application);

    return (<div>
        {application.job_title}
    </div>)
}

export default Application;
