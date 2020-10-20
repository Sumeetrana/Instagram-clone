import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Login = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          M.toast({
            html: "Signin successfully",
            classes: "#66bb6a green lighten-1",
          });
          history.push("/");
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
            Log In
          </button>
        </form>
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
