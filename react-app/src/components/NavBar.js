import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import CreateApplicationModal from './CreateApplicationModal'
import "./NavBar.css"
const NavBar = ({ setAuthenticated }) => {
  const user = useSelector(state => state.session.user);

  console.log("NAV BAR USER PRINT",user)
  return (
    <div className="nav-bar-container">

        <div className="nav-left">
          <div className="nav-home">
            <NavLink to="/" exact={true} activeClassName="active">
            <i className="fas fa-home home-icon"></i>
            </NavLink>
          </div>
        </div>
        <div className="nav-center">
            GIT THERE
        </div>
        <div className="nav-right">

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
