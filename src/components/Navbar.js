import React from "react";

import {
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

function Navbar({ user }) {
  return (
    <div className="navbar">
      <h2>FocusFlow 🚀</h2>

      <div className="nav-right">
        <p>
          Welcome,
          {" "}
          {user?.displayName ||
            user?.email}
        </p>

        <button
          className="logout-btn"
          onClick={() =>
            signOut(auth)
          }
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;