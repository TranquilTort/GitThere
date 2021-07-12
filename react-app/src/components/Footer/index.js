import React, { useState, useEffect } from "react";
import "./Footer.css"
function Footer() {
    return(
        <div className="footer-container">
               <div className="footer-title"> Git There Was Developed By:</div>
               <div className="dev-container">
                    <a href="https://github.com/TranquilTort" target="_blank" title="Chris Regan GitHub" className="dev-info" >
                         Chris Regan
                    </a>

               </div>
        </div>
    )
}
export default Footer;
