import React, { useEffect, useState } from "react";
import { useUser } from "../../context";
import "./SignIn.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
interface SignInProps {
  setIsLoggedIn: (value: boolean) => void;
  isLoggedIn: boolean;
}

const SignIn: React.FC<SignInProps> = ({ setIsLoggedIn, isLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const {setUser}=useUser()
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        password,
        userName,
      });
      alert("Login successful!");
      localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
      setUser(response.data.user)
      setIsLoggedIn(true);
      navigate("/")
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message || "Unknown error occurred";
      alert(`Login failed: ${errorMessage}`);
    }
  };

useEffect(()=>{
  if(isLoggedIn){
    navigate("/")
  }
},[isLoggedIn])


  return (
   
    <div className="SignIn">
      <div className="SignInLeft">
        <div className="LeftImg">
          <img
            src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
            alt=""
          />
        </div>
        <div className="SignInRedirect">
          <Link to="/signUp">
            <span> Create an account</span>
          </Link>
        </div>
      </div>
      <div className="SignInRight">
        <div className="SignInHead">
          <h1>SignIn</h1>
        </div>
        <div className="SignInForm">
          <div className="SignUpInput">
            <FaUser/>
            <input type="text" placeholder="UserName"   value={userName}
              onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="SignUpInput">
            <FaLock/>
            <input type="password" placeholder="Password"    value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="LoginButton">
          <button onClick={handleRegister}>Log in</button>
        </div>
        <div className="LoginIcons">
          <span>or login with</span>
          <div className="Icons">
            <FaFacebookSquare />
            <FaInstagram />
            <FaGooglePlusG />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
