import React, { useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useDispatch,useSelector } from 'react-redux';
import "./SignUpForm.css"

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  console.log("SIGN UP FORM DISPLAY")
  const dispatch = useDispatch()
  const onSignUp = async (e) => {
    console.log("SIGNB UP FORM SUBMIT")
    e.preventDefault();
    if (password === repeatPassword) {
      console.log("SIGNB UP FORM password correct")

      const user = await dispatch(signUp(username, email, password));
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-container">
      <div className="signup-form">

      <div className="signup-welcome">
        Welcome!
      </div>
      <form onSubmit={onSignUp}>
        <div className="signup-input-container">
          <div className="form-icon"><i class="fas fa-user"></i></div>
          <input
            className="signup-input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="signup-input-container">
        <div className="form-icon"><i class="far fa-envelope"></i></div>
          <input
          className="signup-input"
            type="text"
            placeholder="Email"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="signup-input-container">
          <div className="form-icon"><i class="fas fa-key"></i></div>
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="signup-input-container">
          <div className="form-icon"><i class="fas fa-lock"></i></div>
          <input
            className="signup-input"
            placeholder="Repeat Password"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className="signup-form-submit-btn" type="submit">Sign Up</button>
      </form>
      <div className="login-link-container">
        <div>
        Already have an account?
        </div>
        <Link to="/login" className="login-link" exact={true} >Go To Login</Link></div>

      </div>

    </div>
  );
};

export default SignUpForm;
