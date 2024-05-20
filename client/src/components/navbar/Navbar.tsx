import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { CgMenuGridO } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import { GoGear } from "react-icons/go";
import { PiQuestionMarkLight } from "react-icons/pi";
import { TbSpeakerphone } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { GridMenuImgs } from "../../img/imges";
import { GridOptions } from "../../img/imges";
import { Link } from "react-router-dom";
import { useUser } from "../../context";

interface User {
  id: number;
  name: string;
  email: string;
}
interface Item {
  id: number;
  img: string;
  title: string;
}

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn,setIsLoggedIn }) => {
  const [showGridMenu, setShowGridMenu] = useState(false);
  const [isGridActive, setGridActive] = useState(false);
  const [GridImg, setGridImg] = useState<Item[]>([]);
  const [gridOptions, setGridOptions] = useState<Item[]>([]);
  const [userProfile, setUserProfile] = useState(false);
  const {user}=useUser()
  const gridRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setGridImg(GridMenuImgs);
    setGridOptions(GridOptions);

    const handleClickOutside = (event: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
        setShowGridMenu(false);
        setGridActive(false);
        setUserProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleGridMenu = () => {
    setShowGridMenu(!showGridMenu);
    setGridActive(!showGridMenu);
  };

  return (
    <div className="NavBar">
      <div className="LeftNav" ref={gridRef}>
        <div
          className={`Grid ${isGridActive ? "active" : ""}`}
          onClick={toggleGridMenu}
        >
          <CgMenuGridO />
        </div>
        {showGridMenu && (
          <div className="GridMenu">
            <div className="GridSearch">
              <IoIosSearch />
              <input type="search" />
            </div>
            <div className="GridIcons">
              {GridImg &&
                GridImg.map((item) => {
                  return (
                    <div className="GridI" key={item.id}>
                      <img src={item.img} alt="" />
                      <span>{item.title}</span>
                    </div>
                  );
                })}
            </div>
            <div className="GridOptions">
              {gridOptions &&
                gridOptions.map((item) => {
                  return (
                    <div className="Grido" key={item.id}>
                      <img src={item.img} alt="" />
                      <span>{item.title}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        <div className="title">
          <span>To Do</span>
        </div>
      </div>
      <div className="MiddleNav">
        <IoIosSearch />
        <input type="search" />
      </div>
      <div className="RightNav">
        <div className="RightIcons">
          <GoGear />
        </div>
        <div className="RightIcons">
          <PiQuestionMarkLight />
        </div>
        <div className="RightIcons">
          <TbSpeakerphone />
        </div>
        <div className="RightIcons">
          {isLoggedIn ? (
            <FaRegUserCircle onClick={() => setUserProfile(!userProfile)} />
          ) : (
            <Link to={"/signIn"}>
              <FaRegUserCircle />
            </Link>
          )}
          {userProfile && isLoggedIn && (
            <div className="UserProfile">
              {/* <span onClick={() => console.log("profile")}>  </span>
              <span onClick={() => { localStorage.removeItem("access_token"); setIsLoggedIn(false) }}>Logout</span> */}
              <div className="UserData">
                <span> {user.name} </span>
                <span> {user.email} </span>
              </div>
              <div className="UserLogOut">
                <button>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
