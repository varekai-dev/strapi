import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Nav() {
  const { user } = useContext(UserContext);
  return (
    <div className="Nav">
      <h3> Nav</h3>
      <div className="Nav__Links">
        <NavLink to="/" exact>
          Home
        </NavLink>
        {user && (
          <NavLink to="/create" exact>
            Create
          </NavLink>
        )}
        {!user && (
          <>
            <NavLink to="/login" exact>
              Login
            </NavLink>
            <NavLink to="/signup" exact>
              Signup
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
