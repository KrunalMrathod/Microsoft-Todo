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
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState<string>("");

  console.log(editDescription)

  const fetchData = async () => {
    try {
      const accessToken = localStorage
        .getItem("access_token")
        ?.trim()
        .replace(/\"/g, "");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      const response = await fetch("http://localhost:3000/todos/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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

  const deleteTodo = async (id: number) => {
    try {
      const accessToken = localStorage
        .getItem("access_token")
        ?.trim()
        .replace(/\"/g, "");
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (id: number, updatedTodo: Partial<Data>) => {
    try {
      const accessToken = localStorage
        .getItem("access_token")
        ?.trim()
        .replace(/\"/g, "");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      const updateResponse = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!updateResponse.ok) {
        throw new Error("Failed to update todo");
      }
      fetchData();
      setEditTodoId(null); // Clear edit state after updating
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodoToState = (newTodo: Data) => {
    setData((prevData) => [...prevData, newTodo]);
  };

  return (
    <div className="TodoContainer">
      <AddTodo addTodoToState={addTodoToState} />

      {loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        <div className="cont">
          {data.map((item) => (
            <div className="TodoInput" key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => updateTodo(item.id, { completed: !item.completed })}
              />
              <div className="DivInFlex">
                {editTodoId === item.id ? (
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    onBlur={() => {
                      if (editDescription.trim()) {
                        updateTodo(item.id, { description: editDescription.trim() });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (editDescription.trim()) {
                          updateTodo(item.id, { description: editDescription.trim() });
                        }
                      }
                    }}
                  />
                ) : (
                  <span className={item.completed ? "completed" : ""}>{item.description}</span>
                )}
              </div>
              <div className="TodoActionsButtons">
                {editTodoId === item.id ? (
                  <button
                    onClick={() => {
                      if (editDescription.trim()) {
                        updateTodo(item.id, { description: editDescription.trim() });
                      }
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditTodoId(item.id);
                      setEditDescription(item.description);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button onClick={() => deleteTodo(item.id)}>Delete</button>
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
