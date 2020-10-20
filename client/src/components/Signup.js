import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#e53935 red darken-1" });
        } else {
          M.toast({ html: data.message, classes: "#66bb6a green lighten-1" });
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">Instagram</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="btn waves-effect waves-light #64b5f6 blue lighten-2"
          >
            Sign Up
          </button>
        </form>
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
