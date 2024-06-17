import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdDeleteForever, MdEdit } from "react-icons/md";

function TaskItem({ taskCompleted,todo,removeTask,editTask}) {
  return (
    <article className={todo.completed ? "task completed" : "task"}>
      <div className="checkbox" onClick={()=>taskCompleted(todo.id)}>
        <IoCheckmarkCircle className="check_icon" />
      </div>
      <div className="text">{todo.task}</div>
      <div className="controls">
        <MdEdit className="edit_btn btn" onClick={()=>editTask(todo)}/>
        <MdDeleteForever className="del_btn btn" onClick={()=>removeTask(todo.id)}/>
      </div>
    </article>
  );
}

export default TaskItem;
