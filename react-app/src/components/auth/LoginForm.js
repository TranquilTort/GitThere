import React, { useState } from "react";
import { Redirect,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store/session.js";
import "./LoginForm.css"
const LoginForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {

    e.preventDefault();
    const user = await dispatch(login(email, password));
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  if (authenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="login-container">
      <div className="signup-form">

      <div className="signup-welcome">
        WELCOME BACK!
      </div>
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div className="login-errors">{error}</div>
        ))}
      </div>
      <div className="signup-input-container">
      <div className="form-icon"><i className="far fa-envelope"></i></div>
        <input
          className="signup-input"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="signup-input-container">
      <div className="form-icon"><i className="fas fa-key"></i></div>
        <input
          className="signup-input"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </div>
      <button className="signup-form-submit-btn" type="submit">Login</button>
    </form>
    <div className="login-link-container">
        <div>
        Need to create an account?
        </div>
        <Link to="/sign-up" className="login-link" exact={true} >Go To SignUp</Link>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;
