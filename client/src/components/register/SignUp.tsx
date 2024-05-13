import "./Signup.css";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users", {
        name,
        email,
        password,
        userName,
      });
      alert("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setUserName("");
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message || "Unknown error occurred";
      alert(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <div className="Signup">
      <div className="LeftSignUp">
        <div className="SignHead">
          <h1>Sign up</h1>
        </div>
        <div className="SignUpForm">
          <div className="SignUpInput">
            <FaUser />
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="SignUpInput">
            <MdEmail />
            <input
              type="text"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="SignUpInput">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="SignUpInput">
            <FaPen />
            <input
              type="text"
              placeholder="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div className="SignUpButton">
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
      <div className="RightSignUp">
        <div className="RightImg">
          <img
            src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
            alt=""
          />
        </div>
        <div className="SignUpRedirect">
          <span>i am already member</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
