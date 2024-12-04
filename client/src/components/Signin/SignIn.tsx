import React, { useEffect, useState } from "react";
import { useUser } from "../../context";
import "./SignIn.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import axios from "axios";

import { useNavigate } from "react-router-dom";
interface SignInProps {
  setIsLoggedIn: (value: boolean) => void;
  isLoggedIn: boolean;
}

const SignIn: React.FC<SignInProps> = ({ setIsLoggedIn, isLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        password,
        userName,
      });

      localStorage.setItem(
        "access_token",
        JSON.stringify(response.data.access_token)
      );

      setTimeout(() => {
        navigate("/");
        setUser(response.data.user);
        setIsLoggedIn(true);
      }, 5000);
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || "Unknown error occurred";
      setError(` ${errorMessage}`);
      setTimeout(() => {
        setError("");
        console.log(error);
      }, 10000);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="signin_wrapper">
      <div className="signin_background_img">
        <div className="formWrap">
          <h1>Get Started</h1>
          <p>
            Dont Have Account? <a href="/signUp">Create a account</a>
          </p>

          <div className="fromfill_Wrap">
            <div className="forminputs">
              <label htmlFor="1"> UserName </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required={true}
              />
            </div>
            <div className="forminputs">
              <label htmlFor="1"> Password </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            <button onClick={handleRegister}>Login</button>
            <div className="signupwith_wrap">
              <div className="vr"></div>
              <span>or sign up with</span>
              <div className="vr"></div>
            </div>
            <div className="signinicons">
              <a href="https://www.facebook.com/?_rdr">
                <FaFacebookSquare />
              </a>
              <a href="https://accounts.google.com/InteractiveLogin/signinchooser?elo=1&ifkv=AcMMx-dBjI91Jo1Y9Pg-1Tgie_WiirOx3YJKeY-mXi2BzXxGRtWFzq-b-twX6G5yUx03MNCGBDHk-g&ddm=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
                <FaGooglePlusG />
              </a>
              <a href="https://www.instagram.com/accounts/login/?hl=en">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        {error ? <div className="errorBox" > {error} </div> : null}
      </div>
    </div>
  );
};

export default SignIn;
