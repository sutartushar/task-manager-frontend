import axios from "axios";
// import config from "./config";
import { useState, useEffect } from "react";

// const baseURL = config.baseURL;
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //fetch all task
  const fetchTasks = async () => {
    try {
      let response = await axios.get("https://task-manager-backend4-kpg4.onrender.com/task/alltask");
      setTasks(response.data);
    } catch (error) {
      console.log("error -> ", error);
    }
  };

  //handle add task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://task-manager-backend4-kpg4.onrender.com/task/addtask", {
        title,
        description,
        completed: false,
      });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  //handleToggleCompletion
  const handleToggleCompletion = async (id, completed) => {
    try {
      await axios.put(`https://task-manager-backend4-kpg4.onrender.com/task/updatetask/${id}`, {
        completed: !completed,
      });
      fetchTasks();
    } catch (error) {
      console.log("error in handleToggleCompletion : ", error);
    }
  };

  //delete task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://task-manager-backend4-kpg4.onrender.com/task/deletetask/${id}`);
      fetchTasks();
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <table className="task-list">
        <tr>
          <th>Check</th>
          <th>Title</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
        {tasks.map((task) => (
          <tr key={task._id}>
            <td>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  handleToggleCompletion(task._id, task.completed)
                }
              />
            </td>
            <td
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </td>
            <td
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.description}
            </td>
            <td>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
