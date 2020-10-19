import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={Profile} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
