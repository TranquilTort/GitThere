import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';

import {Link} from "react-router-dom"

function Home(){
    const sessionUser = useSelector(state => state.session.user);
    console.log('USERRRRRR',sessionUser)

    return (
    <div>
        <Link to="/create_app"> Add Application</Link>
    </div>)
}
export default Home;
