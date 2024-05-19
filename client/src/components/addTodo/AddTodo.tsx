import React, { useState } from "react";
import "./AddTodo.css";
import { SlCalender } from "react-icons/sl";
import { BsBell } from "react-icons/bs";
import { CiRepeat } from "react-icons/ci";

interface AddTodoProps {
  addTodoToState: (newTodo: Data) => void;
}

interface Data {
  id: number;
  todoTitle: string;
  description: string;
  completed: boolean;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodoToState }) => {
  const [todo, setTodo] = useState("");
  const [completed, setCompleted] = useState(false);

  const addTodo = async () => {
    try {
      const accessToken = localStorage.getItem('access_token')?.trim().replace(/\"/g, '');
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await fetch("http://localhost:3000/todos/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          description: todo,
          completed: completed
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const result: Data = await response.json();
      console.log("Todo added:", result);
      addTodoToState(result); 
      setTodo(""); 
      setCompleted(false);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="AddTodo">
      <div className="TodoInput">
        <input type="radio" checked={completed} onChange={() => setCompleted(!completed)} />
        <input type="text" className="InputValue" placeholder="Add a task..." value={todo} onChange={(e) => setTodo(e.target.value)} />
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
          <button onClick={addTodo}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
