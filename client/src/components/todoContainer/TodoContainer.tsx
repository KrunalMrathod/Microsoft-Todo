import React, { useEffect, useState } from "react";
import "./TodoContainer.css";

interface Data {
  id: number;
  todoTitle: string;
  description: string;
  completed: boolean;
}

const TodoContainer: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJOYW1lIjoiRmlyc3QiLCJpYXQiOjE3MTM1OTUxNzd9.2PRNttJRrRErMaPQd7GD-sEIg7UaWeKVKj2a-MOrZrU";
        const response = await fetch("http://localhost:3000/todos/", {
          headers: {
            Authorization: `Bearer ${token}`,
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

    fetchData();
  }, []);


  return (
    <div className="TodoContainer">
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          {data.map((item) => {
            return <span > {item.id} </span>;
          })}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default TodoContainer;
