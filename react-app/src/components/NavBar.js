import React, { useEffect , useContext} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import CreateApplicationModal from './CreateApplicationModal'
import {ColorContext} from "../context/ColorContext"
import "./NavBar.css"
const NavBar = ({ setAuthenticated }) => {
  const user = useSelector(state => state.session.user);
  const {colors, setColors} = useContext(ColorContext);
  console.log("NAV BAR USER PRINT",user)

  function handleColorChange(){
    if(colors[0].isDark){
      setColors([{isDark:false,mainFontColor:"rgb(19, 24, 36)",secondaryFontColor:"rgba(45, 51, 63, 0.82)",background:"rgb(233, 233, 233)"},{light: '#DEA4A4',dark:"#BF4444"},{light: '#E5AB7E',dark:"#E5853C"},{light: '#E9E9B4',dark:"#E5E570"},{light: '#B5E3B7',dark:"#72B774"}])
    }else{
      setColors([{isDark:true,mainFontColor:"rgb(216, 217, 219)",secondaryFontColor:"rgba(216, 217, 219, 0.82)",background:"#2d333f"},{light: '#6A3333',dark:"#5B0000"},{light: '#75421B',dark:"#8B3C00"},{light: '#676745',dark:"#6D6D18"},{light: '#366038',dark:"#003002"}])
    }
  }
  return (
    <div className="nav-bar-container">

        <div className="nav-left">
          <div className="nav-home">
            <NavLink to="/home" exact={true} activeClassName="active">
            <i className="fas fa-home home-icon"></i>
            </NavLink>
          </div>
        </div>
        <div className="nav-center">
            <img src={'https://i.imgur.com/F8tCf5u.png'} className='logo'/>
        </div>
        <div className="nav-right">
          <div className="dark-mode-btn"
            onClick={e=>handleColorChange()}
          >
            {colors[0].isDark ?"light mode button":"dark mode button"}

          </div>
          {(user!==null)&&<div className="nav-profile">
            <NavLink to="/users" exact={true} className="no-decoration">
              {user.username} Profile
            </NavLink>

          </div>}
          {(user!==null)&& <div className="nav-logout">
            <LogoutButton setAuthenticated={setAuthenticated} />
          </div>}

        </div>





    </div>

  );
}

export default NavBar;
