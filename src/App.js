import "./App.css";
import { React, useState, Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import LoginForm from "./Components/Login";

function App() {
  const getQueryParam = (paramName) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(paramName);
  };

  const [userId, setUserId] = useState(getQueryParam("user_id"));
  const [username, setUsername] = useState(getQueryParam("username"));

  const logout = () => {
    setUserId(null);
    setUsername(null);
  };
  return (
    <Router>
      <Switch>
        
        <Route exact path="/">
          {!userId ? <LoginForm /> : <Redirect to='/home'/>}
        </Route>
        <Route path='/home'>
          {userId ? <Home userId={userId} username={username} logout={logout}/> : <LoginForm/>}
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
