import React from "react";
import {Link } from 'react-router-dom';
import { useHistory} from "react-router-dom";
import "./Splash.css"
function Splash(){
    const history = useHistory();

    return (
        <div className="splash-container">

            <div className="splash-header-container">
                <div className="splash-slogan">
                    Need a Job? Lets Git you there!
                </div>
                <div className="splash-title">
                    Track your goals, organize your documents, and simplify your application workflow.
                </div>
                <div className="splash-buttons">
                    <button className="splash-go-to-signup" onClick={e=>history.push('/sign-up')}>Sign up for free</button>


                    <button className="splash-demo-btn">Check out a demo</button>

                    <div className="login-link-container">
                        <div>
                            Already have an account?
                        </div>
                        <Link to="/login" className="login-link" exact={true} >Go To Login</Link>
                    </div>
                </div>
            </div>
            <div className="splash-gif-container">

            </div>
        </div>
    )
}
export default Splash;
