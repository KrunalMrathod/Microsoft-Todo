import React from "react";
import "./AddTodo.css";
import { SlCalender } from "react-icons/sl";
import { BsBell } from "react-icons/bs";
import { CiRepeat } from "react-icons/ci";
const AddTodo: React.FC = () => {
  return (
    <div className="AddTodo">
      <div className="TodoInput">
        <input type="radio" />
        <input type="text" className="InputValue" placeholder="Add a task..." />
      </div>
      <div className="TodoSubmit">
        <div className="SubLeft">
          <div className="SubIcons">
            <SlCalender />
          </div>
          <div className="SubIcons">
            <BsBell />
          </div>
          <div className="SubIcons">
            <CiRepeat />
          </div>
        </div>
        <div className="SubRight">
          <button>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
