import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Footer from "./components/Footer"
import User from "./components/User";
import Home from "./components/Home"
import CreateApplication from "./components/CreateApplication"
import Splash from "./components/Splash"
import { authenticate } from "./services/auth";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>


      <Switch>

        <Route path="/login" exact={true}>
        <NavBar setAuthenticated={setAuthenticated} />
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/" exact={true}>
          <Splash authenticated={authenticated}
            setAuthenticated={setAuthenticated}/>
        </Route>
        <Route path="/sign-up" exact={true}>
        <NavBar setAuthenticated={setAuthenticated} />
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/home" exact={true} authenticated={authenticated}>
        <NavBar setAuthenticated={setAuthenticated} />
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/create_app' exact={true} authenticated={authenticated}>
          <CreateApplication />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
