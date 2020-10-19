import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">Instagram</h2>
        <input type="email" placeholder="Enter email..." />
        <input type="password" placeholder="Enter password..." />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">
          Log In
        </button>
        <h6>
          Don't have an account?
          <Link to="/signup" style={{ color: "#64b5f6" }}>
            <span style={{ color: "#64b5f6", paddingLeft: "5px" }}>
              Click here
            </span>
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default Login;
