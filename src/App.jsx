import { useState, React, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskContainer from "./components/TaskContainer";
import TaskAdd from "./components/TaskAdd";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [taskData, setTaskData] = useState({
    id: "",
    task: "",
    completed: false,
  });
  const [task, setTask] = useState(JSON.parse(oldTasks));
  const [isActive, setIsActive] = useState(false);
  const [btnName, setBtnName] = useState();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  // input change value store
  const handleChanges = (e) => {
    const { name, value } = e.target;
    const genId = !isEdit ? new Date().getTime().toString() : taskData.id;
    setTaskData(() => {
      return { ...taskData, id: genId, [name]: value };
    });
  };

  // close popup
  const clossForm = () => {
    setIsActive((prev) => !prev);
    setBtnName("Add");
  };

  // added task
  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskData.task !== "" && isEdit) {
      const updatedTask = task.map((value) => {
        return value.id === taskData.id
          ? { ...value, task: taskData.task }
          : value;
      });
      setTask(updatedTask);
      setIsEdit((prev) => !prev);
    } else if (taskData.task !== "" && !isEdit) {
      setTask(() => {
        return [...task, taskData];
      });
    }
    setTaskData({
      id: "",
      task: "",
      completed: false,
    });
    clossForm();
  };

  // delate task
  const removeTask = (id) => {
    const updatedTask = task.filter((value) => value.id !== id);
    setTask(updatedTask);
    setTaskData(() => ({ ...taskData, id: "", task: "" }));
  };

  //edit task
  const editTask = (value) => {
    clossForm();
    setIsEdit((prev) => !prev);
    setBtnName("Edit");
    setTaskData(() => ({ ...taskData, id: value.id, task: value.task }));
  };

  // task completed checked or unchecked
  const taskCompleted = (id) => {
    const updatedTask = task.map((value) => {
      return value.id === id
        ? { ...value, completed: !value.completed }
        : value;
    });
    setTask(updatedTask);
  };

  return (
    <div className="container">
      <TaskAdd
        btnName={btnName}
        isActive={isActive}
        clossForm={clossForm}
        handleSubmit={handleSubmit}
        handleChanges={handleChanges}
        taskData={taskData}
      />
      <Header />
      <TaskContainer
        clossForm={clossForm}
        taskCompleted={taskCompleted}
        task={task}
        removeTask={removeTask}
        editTask={editTask}
      />
    </div>
  );
};

export default App;
