import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session.js";

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    await dispatch(logout());
    setAuthenticated(false);
  };

  return <button className="nav-logout-btn" onClick={onLogout}><i class="fas fa-sign-out-alt"></i></button>;
};

export default LogoutButton;
