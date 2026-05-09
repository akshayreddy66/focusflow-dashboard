import React from "react";

function TaskCard({
  task,
  index,
  toggleTask,
  deleteTask,
}) {
  return (
    <div className="task-card">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() =>
          toggleTask(index)
        }
      />

      <div className="task-info">
        <h3
          style={{
            textDecoration:
              task.completed
                ? "line-through"
                : "none",
          }}
        >
          {task.text}
        </h3>

        <p>
          📅 {task.createdAt}
        </p>
      </div>

      <button
        className="delete-btn"
        onClick={() =>
          deleteTask(index)
        }
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;