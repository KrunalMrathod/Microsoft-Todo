import React, { useEffect, useState } from "react";
import "./TodoContainer.css";
import AddTodo from "../addTodo/AddTodo";

interface Data {
  id: number;
  todoTitle: string;
  description: string;
  completed: boolean;
}

const TodoContainer: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const accessToken = localStorage
        .getItem("access_token")
        ?.trim()
        .replace(/\"/g, "");
      console.log(accessToken);
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      const response = await fetch("http://localhost:3000/todos/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData: Data[] = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodoToState = (newTodo: Data) => {
    setData((prevData) => [...prevData, newTodo]);
  };

  console.log(data);

  return (
    <div className="TodoContainer">
      <AddTodo addTodoToState={addTodoToState} />

      {loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        <div className="cont">
          {data.map((item) => (
            <div className="TodoInput " key={item.id}>
              <input type="radio" checked={item.completed} readOnly />
              <div className="DivInFlex">
                <span>{item.description}</span>
              </div>
             <div className="TodoActionsButtons">
             <button> Edit</button>
              <button> Delete</button>
             </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default TodoContainer;
