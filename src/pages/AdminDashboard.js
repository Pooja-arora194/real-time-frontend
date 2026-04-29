import { useEffect, useState } from "react";
import { useAdminStore } from "../store/adminStore";
import { useAuthStore } from "../store/authStore";
import Select from "react-select";
export default function AdminDashboard() {
  const {
    projects,
    tasks,
    createProject,
    deleteProject,
    createTask,
    deleteTask,
    loading,
  } = useAdminStore();
  const fetchUser = useAuthStore((state) => state.fetchUsers);
  const fetchProject = useAuthStore((state) => state.fetchProjects);

  const userList = useAuthStore((state) => state.userList);
  const projectList = useAuthStore((state) => state.projectList);
  console.log(projectList, "sbngndfgfdnngdf");
  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
  fetchProject();
  fetchUser();
}, [fetchProject, fetchUser]);
  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

      {loading && <p>Loading...</p>}

      {/* Project Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5>Create Project</h5>

          <div className="d-flex gap-2 mb-3">
            <input
              className="form-control"
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <Select
              isMulti
              options={userList?.map((u) => ({
                value: u._id,
                label: `${u.name} (${u.email})`,
              }))}
              value={selectedUsers}
              onChange={(selected) => {
                setSelectedUsers(selected);
              }}
              placeholder="Select Users"
            />

            <button
              className="btn btn-primary"
              disabled={!projectName.trim()}
              onClick={() => {
                createProject(projectName, selectedUsers);
                setProjectName("");
                setSelectedUsers([]);
              }}
            >
              Add
            </button>
          </div>

          <ul className="list-group">
            {projects.map((p) => (
              <li
                key={p._id}
                className="list-group-item d-flex justify-content-between"
              >
                {p.name}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteProject(p._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Task Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5>Create Task</h5>

          <div className="row g-2 mb-3">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <Select
                options={projectList?.map((p) => ({
                  value: p._id,
                  label: p.name,
                }))}
                placeholder="Select Project"
                onChange={(selected) => setProjectId(selected?.value)}
              />
            </div>

            <div className="col-md-3">
              <Select
                options={userList?.map((u) => ({
                  value: u._id,
                  label: `${u.name} (${u.email})`,
                }))}
                placeholder="Assign User"
                onChange={(selected) => setUserId(selected?.value)}
              />
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-success w-100"
                disabled={!taskTitle.trim() || !projectId || !userId}
                onClick={() => {
                  if (!taskTitle.trim() || !projectId || !userId) return;
                  createTask({
                    title: taskTitle,
                    projectId,
                    assignedTo: userId,
                  });
                  setTaskTitle("");
                  setProjectId(null);
                  setUserId(null);
                }}
              >
                Add
              </button>
            </div>
          </div>

          <ul className="list-group">
            {tasks.map((t) => (
              <li
                key={t._id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {t.title}{" "}
                  <span className="badge bg-secondary">{t.status}</span>
                </span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTask(t._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
