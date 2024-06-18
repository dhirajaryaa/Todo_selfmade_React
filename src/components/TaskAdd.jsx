import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function TaskAdd({ btnName, isActive, clossForm, handleChanges,taskData,handleSubmit }) {
 
  return (
    <div className={isActive ? "task_popup active" : "task_popup"}>
      <form onSubmit={handleSubmit}>
        <RxCross2 className="closs_btn" onClick={clossForm} />
        <input
          type="text"
          id="todo"
          className="input"
          name="task"
          value={taskData.task}
          placeholder="Enter Task ....."
          onChange={handleChanges}
        />
        <button type="submit" className="btn">
          {btnName} Task
        </button>
      </form>
    </div>
  );
}

export default TaskAdd;
