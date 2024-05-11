import "./Signup.css";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPen } from "react-icons/fa";


const SignUp: React.FC = () => {
  return (
    <div className="Signup">
      <div className="LeftSignUp">
        <div className="SignHead">
          <h1>Sign up</h1>
        </div>
        <div className="SignUpForm">
          <div className="SignUpInput">
            <FaUser />
            <input type="text" placeholder="Your Name" />
          </div>
          <div className="SignUpInput">
            <MdEmail />
            <input type="text" placeholder="Your Email" />
          </div>
          <div className="SignUpInput">
            <FaLock />
            <input type="password" placeholder="Password" />
          </div>
          <div className="SignUpInput">
            <FaPen />
            <input type="text" placeholder="UserName" />
          </div>
        </div>
        <div className="SignUpButton">
          <button>Register</button>
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
