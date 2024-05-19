import React, { useState } from "react";
import "./Body.css";
import { FaBars } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { BsArrowDownUp } from "react-icons/bs";
import { CgToolbarLeft } from "react-icons/cg";
import AddTodo from "../addTodo/AddTodo";
import TodoContainer from "../todoContainer/TodoContainer";

const Body: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("list");

  const toggleActiveMenu = () => {
    setActiveMenu(activeMenu === "list" ? "grid" : "list");
  };

  return (
    <div className="Body">
      <div className="TopMenus">
        <div className="Left">
          <div className="TaskMenu ">
            <FaBars />
            <span className="task">Tasks</span>
          </div>
          <div className="GridTool" onClick={toggleActiveMenu}>
            <BsFillGridFill />
            <span className={activeMenu === "grid" ? "TopOptionActive" : ""}>
              Grid
            </span>
          </div>
          <div className="ListMenu" onClick={toggleActiveMenu}>
            <RiBarChartHorizontalLine />
            <span className={activeMenu === "list" ? "TopOptionActive" : ""}>
              list
            </span>
          </div>
        </div>
        <div className="Right">
          <div className="SortMenu">
            <BsArrowDownUp />
            <span>Sort</span>
          </div>
          <div className="GroupMenu">
            <CgToolbarLeft />
            <span>Group</span>
          </div>
        </div>
      </div>

      <div className="vr"></div>
      <TodoContainer/>
    </div>
  );
};

export default Body;
