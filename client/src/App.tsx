import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/body/Body";
import Navbar from "./components/navbar/Navbar";
import SignIn from "./components/Signin/SignIn";
import "./styles.css";

export const App = () => {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </>
    </BrowserRouter>
  );
};
