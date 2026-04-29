import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔥 Remove auth data
    localStorage.removeItem("token");

    // (optional) clear other stored data
    localStorage.removeItem("user");

    // ✅ Redirect to login
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand mb-0 h5">Task Manager</span>

      <button className="btn btn-danger btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
