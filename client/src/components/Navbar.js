import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div class="nav-wrapper white">
        <Link to="/" class="brand-logo left">
          Logo
        </Link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <Link to="/signin">Singin</Link>
          </li>
          <li>
            <Link to="/signup">Singup</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
