import React, {
  useEffect,
  useState,
} from "react";

import {
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase";

import Sidebar from "./Sidebar";
import Analytics from "./Analytics";
import TaskCard from "./TaskCard";

function Board({ user }) {
  const [tasks, setTasks] =
    useState([]);

  const [input, setInput] =
    useState("");

  const [section, setSection] =
    useState("tasks");

  // =========================
  // LOAD TASKS FROM FIREBASE
  // =========================

  useEffect(() => {
    const loadTasks =
      async () => {
        if (!user) return;

        try {
          const docRef = doc(
            db,
            "tasks",
            user.uid
          );

          const docSnap =
            await getDoc(
              docRef
            );

          if (
            docSnap.exists()
          ) {
            setTasks(
              docSnap.data()
                .tasks || []
            );
          }
        } catch (error) {
          console.log(
            error
          );
        }
      };

    loadTasks();
  }, [user]);

  // =========================
  // SAVE TASKS TO FIREBASE
  // =========================

  useEffect(() => {
    const saveTasks =
      async () => {
        if (
          !user ||
          tasks.length === 0
        )
          return;

        try {
          await setDoc(
            doc(
              db,
              "tasks",
              user.uid
            ),
            {
              tasks,
            }
          );
        } catch (error) {
          console.log(
            error
          );
        }
      };

    saveTasks();
  }, [tasks, user]);

  // =========================
  // ADD TASK
  // =========================

  const addTask = () => {
    if (!input.trim())
      return;

    const today =
      new Date().toLocaleString(
        "en-IN"
      );

    const newTask = {
      text: input,
      completed: false,
      createdAt: today,
    };

    setTasks([
      ...tasks,
      newTask,
    ]);

    setInput("");
  };

  // =========================
  // TOGGLE TASK
  // =========================

  const toggleTask = (
    index
  ) => {
    const updated = [
      ...tasks,
    ];

    updated[
      index
    ].completed =
      !updated[index]
        .completed;

    setTasks(updated);
  };

  // =========================
  // DELETE TASK
  // =========================

  const deleteTask = (
    index
  ) => {
    const updated = [
      ...tasks,
    ];

    updated.splice(
      index,
      1
    );

    setTasks(updated);
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    signOut(auth);
  };

  // =========================
  // ANALYTICS
  // =========================

  const completed =
    tasks.filter(
      (task) =>
        task.completed
    ).length;

  const pending =
    tasks.length -
    completed;

  const percentage =
    tasks.length === 0
      ? 0
      : Math.round(
          (completed /
            tasks.length) *
            100
        );

  return (
    <div className="dashboard">
      <Sidebar
        setSection={
          setSection
        }
      />

      <div className="main-content">
        {/* NAVBAR */}

        <div className="navbar">
          <div>
            <h2>
              FocusFlow 🚀
            </h2>

   <p>
  Welcome,{" "}
  {user?.displayName
    ? user.displayName
        .split(" ")
        .slice(0, 2)
        .join(" ")
    : user?.email
        ?.split("@")[0]
        ?.split(".")
        .slice(0, 0)
        .join(" ")
        .replace(
          /\b\w/g,
          (c) =>
            c.toUpperCase()
        )}
</p>
          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        {/* TASKS */}

        {section ===
          "tasks" && (
          <>
            <div className="box">
              <h2>
                Add Task
              </h2>

              <div className="task-input">
                <input
                  type="text"
                  placeholder="Enter task..."
                  value={
                    input
                  }
                  onChange={(
                    e
                  ) =>
                    setInput(
                      e.target
                        .value
                    )
                  }
                />

                <button
                  onClick={
                    addTask
                  }
                >
                  Add
                </button>
              </div>
            </div>

            <div className="box">
              <h2>
                My Tasks
              </h2>

              {tasks.length ===
              0 ? (
                <p>
                  No tasks
                  added
                </p>
              ) : (
                tasks.map(
                  (
                    task,
                    index
                  ) => (
                    <TaskCard
                      key={
                        index
                      }
                      task={
                        task
                      }
                      index={
                        index
                      }
                      toggleTask={
                        toggleTask
                      }
                      deleteTask={
                        deleteTask
                      }
                    />
                  )
                )
              )}
            </div>
          </>
        )}

        {/* ANALYTICS */}

        {section ===
          "analytics" && (
          <Analytics
            completed={
              completed
            }
            pending={
              pending
            }
            percentage={
              percentage
            }
          />
        )}

        {/* COMPLETED */}

        {section ===
          "completed" && (
          <div className="box">
            <h2>
              Completed
              Tasks
            </h2>

            {tasks.filter(
              (
                task
              ) =>
                task.completed
            ).length ===
            0 ? (
              <p>
                No
                completed
                tasks
              </p>
            ) : (
              tasks
                .filter(
                  (
                    task
                  ) =>
                    task.completed
                )
                .map(
                  (
                    task,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      className="done-task"
                    >
                      ✅{" "}
                      {
                        task.text
                      }

                      <p>
                        {
                          task.createdAt
                        }
                      </p>
                    </div>
                  )
                )
            )}
          </div>
        )}

        {/* SETTINGS */}

        {section ===
          "settings" && (
          <div className="box">
            <h2>
              Settings
            </h2>

            <p>
              Future
              settings
              coming soon
              🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Board;