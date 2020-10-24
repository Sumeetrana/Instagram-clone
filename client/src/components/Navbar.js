import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderLists = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/create">Create</Link>
        </li>,
        <li>
          <button
            class="btn btn-small waves-effect waves-light logoutButton"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/signin">Signin</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link
          to={state ? "/" : "/signin"}
          className="brand-logo left"
          style={{ paddingLeft: "15px" }}
        >
          Instagram
        </Link>
        <ul id="nav-mobile" className="right" style={{ paddingRight: "15px" }}>
          {renderLists()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
