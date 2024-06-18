import React from "react";

import TaskItem from "./TaskItem";

function TaskContainer({ clossForm, taskCompleted, task,removeTask,editTask }) {
  return (
    <main className="Task_container">
      <div className="tasks_list">
        {task && task.map((todo) => {
          return (
            <TaskItem
              taskCompleted={taskCompleted}
              todo={todo}
              key={todo.id}
              removeTask={removeTask}
              editTask={editTask}
            />
          );
        })}
      </div>
      <button className="popup_btn" onClick={clossForm}>
        {" "}
        + New Task
      </button>
    </main>
  );
}

export default TaskContainer;
