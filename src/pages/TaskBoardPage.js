import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { socket } from "../sockets/socket"; // 🔥 IMPORTANT
function Column({ title, tasks, setSelectedTask, setStatus }) {
  return (
    <div className="col-md-4">
      <div className="bg-light p-2 rounded">
        <h5 className="text-center">{title}</h5>

        {tasks.map((task) => (
          <div
            key={task._id}
            className="card mb-2 shadow-sm"
            onClick={() => {
              setSelectedTask(task);
              setStatus(task.status);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex justify-content-between align-items-center p-3">
              <h6 className="mb-0">{task.title}</h6>

              <span className="badge bg-info">{task.assignedTo?.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [status, setStatus] = useState("");
  const { projectId } = useParams();
  // 📥 FETCH TASKS
  useEffect(() => {
    fetch(`https://real-time-backendxx.onrender.com/api/tasks/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data || []));
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;

    socket.emit("joinProject", projectId);

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("taskUpdated", (updated) => {
      console.log("Realtime update:", updated);

      setTasks((prev) => {
        const exists = prev.find((t) => t._id === updated._id);
        return exists
          ? prev.map((t) => (t._id === updated._id ? updated : t))
          : [...prev, updated];
      });
    });

    return () => {
      socket.off("taskUpdated");
    };
  }, [projectId]);

  // 🔄 UPDATE
  const updateTask = async () => {
    const res = await fetch(
      `https://real-time-backendxx.onrender.com/api/tasks/${selectedTask._id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      },
    );

    const updated = await res.json();

    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));

    setSelectedTask(null);
  };
  const getTasks = (s) => tasks.filter((t) => t.status === s);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("CONNECTED:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("CONNECT ERROR:", err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []);
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <Column
          title="Todo"
          tasks={getTasks("Todo")}
          setSelectedTask={setSelectedTask}
          setStatus={setStatus}
        />
        <Column
          title="InProgress"
          tasks={getTasks("InProgress")}
          setSelectedTask={setSelectedTask}
          setStatus={setStatus}
        />
        <Column
          title="Done"
          tasks={getTasks("Done")}
          setSelectedTask={setSelectedTask}
          setStatus={setStatus}
        />
      </div>

      {/* MODAL */}
      {selectedTask && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>Edit Task</h5>
              <p>
                <b>{selectedTask.title}</b>
              </p>

              <select
                className="form-select mb-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Todo">Todo</option>
                <option value="InProgress">InProgress</option>
                <option value="Done">Done</option>
              </select>

              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedTask(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={updateTask}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
