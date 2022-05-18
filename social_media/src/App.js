import React from 'react'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Error from './pages/error/Error'
import Logout from './pages/logout/Logout'
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    
    <Router>
    <Switch>
      <Route exact path="/">
        {user ? <Home /> : <Register />}
      </Route>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
      <Route path="/register">
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route path="/profile/:username">
      {user ? <Profile /> : <Redirect to="/" />}
      </Route>
      <Route path="/logout">
      {user ? <Logout /> : <Redirect to="/login" />}
      </Route>
      <Route component={Error} />
    </Switch>
  </Router>
  );
}

export default App;
