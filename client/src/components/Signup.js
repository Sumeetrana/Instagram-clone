import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">Instagram</h2>
        <input type="text" placeholder="Enter name..." />
        <input type="email" placeholder="Enter email..." />
        <input type="password" placeholder="Enter password..." />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">
          Sign Up
        </button>
        <h6>
          Already have an account?
          <Link to="/signin">
            <span style={{ color: "#64b5f6", paddingLeft: "5px" }}>
              Click here
            </span>
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
