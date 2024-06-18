import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskContainer from "./components/TaskContainer";
import TaskAdd from "./components/TaskAdd";

const App = () => {
  const [taskData, setTaskData] = useState({
    id: "",
    task: "",
    completed: false,
  });
  const [task, setTask] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [btnName, setBtnName] = useState("Add");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const oldTasks = localStorage.getItem("tasks");
    const parsedTasks = oldTasks ? JSON.parse(oldTasks) : [];
    setTask(parsedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  // input change value store
  const handleChanges = (e) => {
    const { name, value } = e.target;
    const genId = !isEdit ? new Date().getTime().toString() : taskData.id;
    setTaskData({ ...taskData, id: genId, [name]: value });
  };

  // close popup
  const closeForm = () => {
    setIsActive((prev) => !prev);
    setBtnName("Add");
  };

  // added task
  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskData.task !== "" && isEdit) {
      const updatedTask = task.map((value) =>
        value.id === taskData.id ? { ...value, task: taskData.task } : value
      );
      setTask(updatedTask);
      setIsEdit(false);
    } else if (taskData.task !== "" && !isEdit) {
      setTask([...task, taskData]);
    }
    setTaskData({
      id: "",
      task: "",
      completed: false,
    });
    closeForm();
  };

  // delete task
  const removeTask = (id) => {
    const updatedTask = task.filter((value) => value.id !== id);
    setTask(updatedTask);
  };

  // edit task
  const editTask = (value) => {
    closeForm();
    setIsEdit(true);
    setBtnName("Edit");
    setTaskData({ id: value.id, task: value.task, completed: value.completed });
  };

  // task completed checked or unchecked
  const taskCompleted = (id) => {
    const updatedTask = task.map((value) =>
      value.id === id ? { ...value, completed: !value.completed } : value
    );
    setTask(updatedTask);
  };

  return (
    <div className="container">
      <TaskAdd
        btnName={btnName}
        isActive={isActive}
        closeForm={closeForm}
        handleSubmit={handleSubmit}
        handleChanges={handleChanges}
        taskData={taskData}
      />
      <Header />
      <TaskContainer
        closeForm={closeForm}
        taskCompleted={taskCompleted}
        task={task}
        removeTask={removeTask}
        editTask={editTask}
      />
    </div>
  );
};

export default App;
