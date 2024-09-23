import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../firebase";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-6 min-h-screen">
      {!user ? (
        <div className="flex flex-col justify-center w-72 space-y-4 mx-auto my-auto bg-cyan-500 p-4 rounded-xl">
          <h2 className="text-center font-bold text-black">
            {user ? `Welcome, ${user.email}` : "Prattle Login"}
          </h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          />
          <button onClick={handleLogin} className="btn btn-active btn-primary">
            Login
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center w-72 space-y-4 mx-auto my-auto bg-cyan-500 p-4 rounded-xl">
          <h2 className="text-center font-bold text-black">
            {user ? `Welcome, ${user.email}` : "Prattle Login"}
          </h2>
          <button onClick={handleLogout} className="btn btn-active btn-primary">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
