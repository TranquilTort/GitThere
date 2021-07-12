import React from "react";
import {Link, Redirect } from 'react-router-dom';
import { useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {login} from "../../store/session.js"
import "./Splash.css"
function Splash({ authenticated, setAuthenticated }){
    const history = useHistory();
    const dispatch = useDispatch();
    if (authenticated) {
        return <Redirect to="/home" />;
      }
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
                    <button className="splash-go-to-signup" onClick={e=>history.push('/sign-up')}
                    onMouseEnter={e=>{
                        e.target.isthemouseover = true;
                        let count = 30;
                        const interval = setInterval(() =>{
                            count++
                            e.target.style.background= `linear-gradient(${count}deg, #BF4444 25%, #E5853C 50%,  #72B774 70%)`
                            if (count >= 3000 || !e.target.isthemouseover){
                                clearInterval(interval)
                            }
                        },3)
                    }}
                    onMouseLeave={e=>{
                        e.target.isthemouseover = false;
                    }}
                    >Sign up for free</button>
                    <button className="splash-demo-btn"
                    onMouseEnter={e=>{
                        e.target.isthemouseover = true;
                        let count = 3720;
                        const interval = setInterval(() =>{
                            count--
                            e.target.style.background= `linear-gradient(${count}deg, #DEA4A4 25%, #E9E9B4 50%, #B5E3B7 70%)`
                            if (count <= 0 || !e.target.isthemouseover){
                                clearInterval(interval)
                            }
                        },3)
                    }}
                    onMouseLeave={e=>{
                        e.target.isthemouseover = false;
                    }}
                    onClick={async(e)=> {
                        const user = await dispatch(login("DemoUser@email.com", "password"));
                        if (!user.errors) {
                            setAuthenticated(true);
                          } 
                    }}
                    >Checkout a demo</button>

                    <div className="login-link-container">
                        <div>
                            Already have an account?
                        </div>
                        <Link to="/login" className="login-link" exact={true} >Go To Login</Link>
                    </div>
                </div>
            </div>
                <div className="splash-gif">
                    <img className="splash-gif-container" src="https://i.imgur.com/II511kC.gif"></img>
                </div>
        </div>
    )
}
export default Splash;
