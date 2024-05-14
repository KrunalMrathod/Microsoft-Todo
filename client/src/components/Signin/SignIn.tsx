import React from "react";
import "./SignIn.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
const SignIn: React.FC = () => {
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
          <span> Create an account</span>
        </div>
      </div>
      <div className="SignInRight">
        <div className="SignInHead">
          <h1>SignIn</h1>
        </div>
        <div className="SignInForm">
          <div className="SignUpInput">
            <FaUser/>
            <input type="text" placeholder="UserName" />
          </div>
          <div className="SignUpInput">
            <FaLock/>
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <div className="LoginButton">
          <button>Log in</button>
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
