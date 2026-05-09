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

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
        }
      );

    return () => unsubscribe();
  }, []);

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