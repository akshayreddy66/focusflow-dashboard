import React, {
  useState,
} from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

function Auth() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isLogin, setIsLogin] =
    useState(true);

  // =====================
  // GOOGLE LOGIN
  // =====================

  const googleLogin =
    async () => {
      try {
        const provider =
          new GoogleAuthProvider();

        await signInWithPopup(
          auth,
          provider
        );
      } catch (error) {
        alert(error.message);
      }
    };

  // =====================
  // EMAIL LOGIN / SIGNUP
  // =====================

  const handleAuth =
    async () => {
      try {
        if (isLogin) {
          // LOGIN

          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          alert(
            "Login Successful ✅"
          );
        } else {
          // SIGNUP

          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          alert(
            "Account Created ✅"
          );
        }
      } catch (error) {
        console.log(error);

        alert(error.message);
      }
    };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>FocusFlow</h1>

        <p>
          Organize your work
          beautifully 🚀
        </p>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        {/* LOGIN / SIGNUP */}

        <button
          onClick={handleAuth}
        >
          {isLogin
            ? "Login"
            : "Create Account"}
        </button>

        {/* GOOGLE */}

        <button
          className="google-btn"
          onClick={googleLogin}
        >
          Continue with Google
        </button>

        {/* SWITCH */}

        <p
          className="switch-auth"
          onClick={() =>
            setIsLogin(
              !isLogin
            )
          }
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Auth;