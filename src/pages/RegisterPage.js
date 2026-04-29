import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Register() {
  const nav = useNavigate();
  const register = useAuthStore((state) => state.register);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const ok = await register(form, nav);
    if (ok) {
      alert("Registered successfully");
      nav("/login");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-4">Register</h3>

        <div className="mb-3">
          <input
            name="name"
            className="form-control"
            placeholder="Name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            name="email"
            className="form-control"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Register
        </button>

        <p className="text-center mt-3 mb-0">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
