import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Body from "./components/body/Body";
import Navbar from "./components/navbar/Navbar";
import SignIn from "./components/Signin/SignIn";
import "./styles.css";
import SignUp from "./components/register/SignUp";
import { UserProvider } from "./context";

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const access_token = localStorage.getItem("access_token");
      setIsLoggedIn(!!access_token);
    };

    window.addEventListener("storage", handleStorageChange);

    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <>
                  <Navbar
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                  <Body />
                </>
              ) : (
                <Navigate to="/signIn" replace />
              )
            }
          />
          <Route
            path="/signIn"
            element={
              <SignIn setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/signIn"} replace />}
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};
