import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"

function Home(){
    return (
    <div>
        <Link to="/create_app"> Add Application</Link>
    </div>)
}
export default Home;
