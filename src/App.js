import React, {
  useEffect,
  useState,
} from "react";

import "./App.css";
import Board from "./components/Board";
import Auth from "./components/Auth";
import { auth } from "./firebase";

import {
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  // loading screen
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "white",
          fontSize: "24px",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <>
      {user ? (
        <Board user={user} />
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;