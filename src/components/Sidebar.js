import React from "react";

function Sidebar({
  setSection,
}) {
  return (
    <div className="sidebar">
      <h3>Dashboard</h3>

      <ul>
        <li
          onClick={() =>
            setSection("tasks")
          }
        >
          📋 Tasks
        </li>

        <li
          onClick={() =>
            setSection(
              "analytics"
            )
          }
        >
          📊 Analytics
        </li>

        <li
          onClick={() =>
            setSection(
              "completed"
            )
          }
        >
          ✅ Completed
        </li>

        <li
          onClick={() =>
            setSection(
              "settings"
            )
          }
        >
          ⚙ Settings
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;